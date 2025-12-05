import EventCard from './EventCard';
function EventsList() {
  return (
    <div>
      <p>Hello from the Events List</p>
      {/* We should get as a prop a list of all the events and use 
      the map method to create a card for each event */}
      <EventCard />
    </div>
  );
}

export default EventsList;
