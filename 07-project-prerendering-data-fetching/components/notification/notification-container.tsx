"use client";
import { useContext } from "react";
import Notification from "./notification";
import NotificationContext from "@/store/notification-context";

export default function NotificationContainer() {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      {activeNotification && (
        <Notification
          message={activeNotification.message}
          status={activeNotification.status}
          title={activeNotification.title}
        />
      )}
    </>
  );
  //
}
