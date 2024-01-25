"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

type NotificationData = {
  title: string;
  message: string;
  status: string;
};
type NotificationStateModel = {
  notification: NotificationData | null;
  showNotification: (data: NotificationData) => void;
  hideNotification: () => void;
};

const initialState: NotificationStateModel = {
  notification: null, // {title, message, status}
  showNotification: function () {},
  hideNotification: function () {},
};

const NotificationContext = createContext(initialState);

export function NotificationContextProvider(props: { children: ReactNode }) {
  const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    if (activeNotification && activeNotification.status !== "pending") {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(data: NotificationData) {
    setActiveNotification(data);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context: NotificationStateModel = {
    notification: activeNotification,
    hideNotification: hideNotificationHandler,
    showNotification: showNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>
  );
}

export default NotificationContext;
