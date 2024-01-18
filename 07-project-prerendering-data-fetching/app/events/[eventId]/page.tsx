import EventDetailContainer from "@/components/event-detail/event-detail-container";
import { EventModel } from "@/components/events/event-container";
import { getFeaturedEvents, getEventById } from "@/helpers/api-util";

type EventDetailPageProps = {
  params: {
    eventId: string;
  };
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
