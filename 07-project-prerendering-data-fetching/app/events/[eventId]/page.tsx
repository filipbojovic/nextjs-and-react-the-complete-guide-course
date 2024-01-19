import EventDetailContainer from "@/components/event-detail/event-detail-container";
import { EventModel } from "@/components/events/event-container";
import { getFeaturedEvents, getEventById } from "@/helpers/api-util";
import { Metadata } from "next";

type EventDetailPageProps = {
  params: {
    eventId: string;
  };
};

export const metadata: Metadata = {
  title: "All events",
  description: "Find a lot of great events that allow you to evolve...",
};

async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  return <EventDetailContainer event={event} />;
}

export async function generateStaticParams() {
  const events: EventModel[] = await getFeaturedEvents();
  const paths = events.map((event) => ({ eventId: event.id }));

  return paths;
}

export const dynamicParams = true;

export default EventDetailPage;
