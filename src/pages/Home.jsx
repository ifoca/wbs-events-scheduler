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

  console.log("EVENT OBJECT:", events[0]);
  

  return (
    <div className="p-8">
      <EventsList events={events} />
    </div>
  );
}

export default Home;
