import { useState, useEffect } from 'react';
import EventsList from '../components/EventsList';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import useGeneralStates from '../contexts/GeneralContext';

function Home() {
  const [events, setEvents] = useState([]);
  const { loading, setLoading, error, setError } = useGeneralStates();

  useEffect(() => {
    setLoading(true);
    setError('');

    fetch('http://localhost:3001/api/events')
      .then((response) => response.json())
      .then((data) => {
        // Extract the events array from data.results
        const sortedEvents = data.results.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log('EVENT OBJECT:', events[0]);

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="p-8">
      <EventsList events={events} />
    </div>
  );
}

export default Home;
