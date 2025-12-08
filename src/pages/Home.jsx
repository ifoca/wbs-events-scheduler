import { useState, useEffect } from "react";
import EventsList from '../components/EventsList';
import EventCard from "../components/EventCard";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((response) => response.json())
      .then((data) => {
        // Extract the events array from data.results
        const sortedEvents = data.results.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setEvents(sortedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default Home;
