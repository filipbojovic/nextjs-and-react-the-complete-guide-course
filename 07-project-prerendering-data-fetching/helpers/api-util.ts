import { EventModel } from "@/components/events/event-container";

export async function getAllEvents(): Promise<EventModel[]> {
  const response = await fetch(
    "https://nextjs-8bb7d-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    { next: { revalidate: 60 } }
  );
  const data = await response.json();
  const events: EventModel[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents: EventModel[] = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string): Promise<EventModel> {
  const allEvents: EventModel[] = await getAllEvents();

  return allEvents.find((event) => event.id === id)!;
}

export async function getFilteredEvents(dateFilter: { year: number; month: number }) {
  const { year, month } = dateFilter;
  const allEvents: EventModel[] = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}
