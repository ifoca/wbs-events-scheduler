import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../contexts/AuthContext';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import useGeneralStates from '../contexts/GeneralContext';

function CreateEvent() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { error, setError, setLoading } = useGeneralStates();

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    // imageUrl: '',
    latitude: '',
    longitude: '',
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create event');

      // alert('Event created!');
      console.log('Event created', res.status);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message);
      // alert('Error creating event');
    } finally {
      setLoading(false);
    }
  }

  if (!auth) {
    return (
      <>
        <div className="flex flex-col gap-8 items-center m-4 p-4">
          <ErrorMessage error={'You must be logged in to see this page.'} />
          <button className="btn p-4" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </>
    );
  }

  if (loading) {
    return <LoadingMessage />;
  }

  return (
    <div>
      <h1 className="text-center text-4xl">Create Event</h1>
      {error && <ErrorMessage error={error} />}

      <div className="max-w-xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            id="date"
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-2 rounded"
          />

          {/* <input
          id="imageUrl"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        /> */}

          <input
            id="latitude"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            className="w-full border p-2 rounded"
          />

          <input
            id="longitude"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            className="w-full border p-2 rounded"
          />

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
