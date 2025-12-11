import { useNavigate } from 'react-router-dom';

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
      className="border p-4 rounded-md shadow cursor-pointer hover:bg-gray-50 transition"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <h2>{event.title}</h2>
      <p>{event.location}</p>
      <p>{event.description}</p>
      <p>{new Date(event.date).toDateString()}</p>
    </div>
  );
}

export default EventCard;

/*

         <Link 
                        to={`/destinations/${(d.city).toLowerCase()}`} 
                        className="card-title text-lg font-semibold hover:text-primary">
                            {d.city}
                        </Link>
                        */
