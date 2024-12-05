import { React, useState } from 'react';
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const Calendar = ({ startDate, events, onDeleteEvent, onEditEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {

    setSelectedEvent(event);  // Store the selected event
    setIsModalOpen(true);     // Open the modal
  };
  const closeModal = () => setIsModalOpen(false);  // Close the modal

  const formattedEvents = events.map(event => ({
    id: event.id,
    text: event.text,
    start: new Date(event.start).toISOString(),
    end: new Date(event.end).toISOString(),
    backColor: event.backColor,
    participants: event.participants || 0,
    type: event.type
  }));

  const config = {
    viewType: "Week",
    durationBarVisible: false,
    startDate: startDate,
    events: formattedEvents,
    
    onBeforeEventRender: args => {
      args.data.backColor = args.data.backColor || "#ffffff"; // Fallback to white if no color
      args.data.html = `
        <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <div>${args.data.text}</div>
          <div style="display: flex; justify-content: center; gap: 10px; margin-top: 5px;">
            ${onEditEvent ? '<span class="edit-icon" style="cursor: pointer;">✏️</span>' : ''}
            ${onDeleteEvent ? '<span class="delete-icon" style="cursor: pointer;">🗑️</span>' : ''}
          </div>
        </div>`;
    },

    // Conditionally handle event clicks only if edit/delete is allowed
    onEventClick: args => {
      if (onDeleteEvent || onEditEvent) {
        const eventId = args.e.id();
        const target = args.originalEvent.target;

        if (onDeleteEvent && target.classList.contains("delete-icon")) {
          onDeleteEvent(eventId);
        } else if (onEditEvent && target.classList.contains("edit-icon")) {
          const event = formattedEvents.find(event => event.id === eventId);
          onEditEvent(eventId, event);
        } else {
          const event = formattedEvents.find(event => event.id === eventId);
          openModal(event); // Open modal with event details
        }
      }
    }
  };

  return (
    <div>
      <DayPilotCalendar {...config} />
      
      {/* Conditionally render the modal */}
      {isModalOpen && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Event Info</h1>
            {console.log(selectedEvent)}

            <h3>Event Title:</h3>
            <p>{selectedEvent.text}</p>

            <h3>Event Type:</h3>
            <p>{selectedEvent.type}</p>

            <h3>Event Color:</h3>
            <p>{selectedEvent.backColor}</p>

            <h3>Date/Time:</h3>
            <p>Start: {new Date(selectedEvent.start).toLocaleString()}</p>
            <p>End: {new Date(selectedEvent.end).toLocaleString()}</p>

            <button type="button" onClick={closeModal} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
