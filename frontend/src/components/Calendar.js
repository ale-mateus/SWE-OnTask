import React from 'react';
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";


const Calendar = ({ startDate, events, onDeleteEvent, onEditEvent }) => {


  const formattedEvents = events.map(event => ({
    id: event.id,
    text: event.text,  // Text displayed in the event
    type: event.type,
    color: event.color,
    start: new Date(event.start).toISOString(),
    end: new Date(event.end).toISOString(),
    backColor: event.color,
    participants: event.participants || 0,
  }));


  const config = {
    viewType: "Week",
    durationBarVisible: true,
    startDate: startDate,
    events: formattedEvents,
   
    // Custom render event
    onBeforeEventRender: args => {
        args.data.html = `
          <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; backgroundColor: ${args.data.color};">
            <div>${args.data.text}</div>
            <div>${args.data.type}</div>
            <div style="display: flex; justify-content: center; gap: 10px; margin-top: 5px;">
              <span class="edit-icon" style="cursor: pointer;">✏️</span>
              <span class="delete-icon" style="cursor: pointer;">🗑️</span>
            </div>
          </div>`;
      },


    // Handle clicking on event icons
    onEventClick: args => {
      const eventId = args.e.id();
      const target = args.originalEvent.target;


      if (target.classList.contains("delete-icon")) {
        onDeleteEvent(eventId);
      } else if (target.classList.contains("edit-icon")) {
        const event = formattedEvents.find(event => event.id === eventId);
        onEditEvent(eventId, event);
      }
    }
  };


  return (
    <div>
      <DayPilotCalendar {...config} />
    </div>
  );
};


export default Calendar;


