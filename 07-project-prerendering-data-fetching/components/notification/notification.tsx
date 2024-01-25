"use client";
import { useContext } from "react";
import NotificationContext from "@/store/notification-context";
import classes from "./notification.module.css";
// import NotificationContext from "../../store/notification-context";

type NotificationProps = {
  title: string;
  message: string;
  status: string;
};
function Notification(props: NotificationProps) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
