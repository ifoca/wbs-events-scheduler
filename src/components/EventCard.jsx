import EventDetails from '../pages/EventDetails';

function EventCard() {
  return (
    <div>
      <p>Hello from the EventCard</p>
      {/* Here we should have an entry point to navigate to the event details */}
      <EventDetails />
    </div>
  );
}

export default EventCard;
