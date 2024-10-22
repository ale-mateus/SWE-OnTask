import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useEventsContext } from '../hooks/useEventsContext'; // Import the events context
import CalendarNav from '../components/CalendarNav';
import Calendar from '../components/Calendar';
import EventForm from '../components/CalendarForm';

const Home = () => {
    const { user } = useAuthContext();
    const { events, dispatch: eventDispatch } = useEventsContext(); // Get events and dispatch
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
    const [startDate, setStartDate] = useState(currentDate);
    
    const fetchEvents = async () => {
        const response = await fetch('/api/events', {
            headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();
        
        if (response.ok) {
            const mappedEvents = json.map(event => ({
                id: event._id,
                text: event.text,
                start: event.start,
                end: event.end,
                backColor: event.backColor || "#ffffff",
                participants: event.participants || 0,
            }));
            console.log("Mapped events:", mappedEvents); // Log mapped events for debugging
            eventDispatch({ type: 'SET_EVENTS', payload: mappedEvents });
        } else {
            console.error("Error fetching events:", json);
        }
    };

    useEffect(() => {
        if (user) {
            fetchEvents(); // Fetch events when user is present
        }
    }, [eventDispatch, user]);

    return (
        <div className="home">
            <div>
                <CalendarNav setStartDate={setStartDate} />
            </div>
            <div className='calendar'>
                <Calendar startDate={startDate} events={events} /> {/* Pass events to Calendar */}
            </div>
            <EventForm fetchEvents={fetchEvents} /> {/* Pass fetchEvents to EventForm */}
        </div>
    );
}

export default Home;
