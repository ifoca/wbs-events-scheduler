import EventCard from './EventCard';

function EventsList({ events }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventsList;
