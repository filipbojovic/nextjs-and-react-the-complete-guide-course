import { Fragment } from "react";
import EventContent from "./event-content";
import EventLogistics from "./event-logistics";
import EventSummary from "./event-summary";
import { EventModel } from "../events/event-container";
import Comments from "../input/comments";

export default function EventDetailContainer({ event }: { event: EventModel }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}
