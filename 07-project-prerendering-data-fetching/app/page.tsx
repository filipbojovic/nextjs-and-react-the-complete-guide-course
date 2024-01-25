import EventContainer, { EventModel } from "@/components/events/event-container";
import { getAllEvents } from "@/helpers/api-util";

async function AllEventsPage() {
  const events: EventModel[] = await getAllEvents();
  console.log("AllEventsPage server side!");

  return <EventContainer events={events} />;
}

export default AllEventsPage;
