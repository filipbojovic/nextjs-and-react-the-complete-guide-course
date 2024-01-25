"use client";
import { FormEvent, useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event: FormEvent) {
    event.preventDefault();
    const enteredEmail = emailRef.current!.value;
    const body = { email: enteredEmail };

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    const promise = await fetch("api/newsletter", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: { message: string } = await promise.json();

    if (!promise.ok) {
      notificationCtx.showNotification({
        title: "Error!",
        message: data.message,
        status: "error",
      });

      return;
    }

    notificationCtx.showNotification({
      title: "Success!",
      message: "Successfully registered for newsletter!",
      status: "success",
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
