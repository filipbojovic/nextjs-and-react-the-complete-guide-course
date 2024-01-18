"use client";
// WITH CLIENT SIDE RENDERING => client fetching inside EventFilterContainer
import { Fragment, useEffect, useState } from "react";
import Button from "../../../components/ui/button";
import ErrorAlert from "../../../components/ui/error-alert";
import { EventModel } from "@/components/events/event-container";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";

const URL = "https://nextjs-8bb7d-default-rtdb.europe-west1.firebasedatabase.app/events.json";

function FilteredEventsPage({ params }: { params: { slug: string } }) {
  const [loadedEvents, setLoadedEvents] = useState<EventModel[]>([]);
  const filterDataArray = params.slug;

  const filteredYear = filterDataArray[0];
  const filteredMonth = filterDataArray[1];
  const numYear: number = +filteredYear;
  const numMonth: number = +filteredMonth;

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const data = await fetch(URL).then((res) => res.json());

      const events: EventModel[] = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
    fetchData();
  }, []);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents: EventModel[] = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  const date = new Date(numYear, numMonth - 1);

  if (filteredEvents.length == 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
