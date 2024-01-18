// DYNAMIC SERVER SIDE RENDERING
import { Fragment } from "react";

import { getFilteredEvents } from "../../../dummy-data";
import EventList from "../../../components/events/event-list";
import ResultsTitle from "../../../components/events/results-title";
import Button from "../../../components/ui/button";
import ErrorAlert from "../../../components/ui/error-alert";
import { EventModel } from "@/components/events/event-container";

type FilterEventsDto = { hasError: boolean; events: EventModel[] };

async function FilteredEventsPage({ params }: { params: { slug: string } }) {
  const filterDataArray = params.slug;

  if (!filterDataArray) {
    return <p className="center">Loading...</p>;
  }

  const response: FilterEventsDto = await filterEvents(filterDataArray);

  if (response.hasError) {
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
  const numYear: number = +filterDataArray[0];
  const numMonth: number = +filterDataArray[1];
  const date = new Date(numYear, numMonth - 1);

  const filteredEvents: EventModel[] = response.events;

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

async function filterEvents(filterData: string): Promise<FilterEventsDto> {
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      hasError: true,
      events: [],
    };
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    hasError: false,
    events: filteredEvents,
  };
}

export default FilteredEventsPage;
