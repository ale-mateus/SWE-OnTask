import React from 'react';
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const Calendar = ({ startDate, events }) => {
  console.log("Events in Calendar:", events); // Log events to check if they're received

  const formattedEvents = events.map(event => ({
      id: event.id,
      text: event.text,
      start: new Date(event.start).toISOString(),
      end: new Date(event.end).toISOString(),
      backColor: event.backColor || "#ffffff",
      participants: event.participants || 0,
  }));

  const config = {
      viewType: "Week",
      durationBarVisible: false,
      startDate: startDate,
      events: formattedEvents,
  };

  return (
      <div>
          <DayPilotCalendar {...config} />
      </div>
  );
}

export default Calendar;
