"use client";

import { Fragment } from "react";
import EventsSearch from "./events-search";
import EventList from "./event-list";
import { useRouter } from "next/navigation";
import NewsletterRegistration from "../input/newsletter-registration";

export type EventModel = {
  id: string;
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
};

export default function EventContainer({ events }: { events: EventModel[] }) {
  const router = useRouter();
  //   const events = getAllEvents();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <NewsletterRegistration />
      <EventList items={events} />
    </Fragment>
  );
}
