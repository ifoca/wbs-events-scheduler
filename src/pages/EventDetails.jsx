import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import useGeneralStates from '../contexts/GeneralContext';

function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, setLoading, error, setError } = useGeneralStates();

  const [item, setItem] = useState(null);
  const [image, setImage] = useState(null);

  const fetchEvent = async () => {
    try {
      setError('');
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/events/${id}`);
      if (!res.ok) {
        throw new Error(`Could not fetch the details of the event with id: ${id}`);
      }
      const data = await res.json();
      setItem(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchImage = async () => {
    const res = await fetch('https://picsum.photos/400');
    setImage(res.url);
  };

  useEffect(() => {
    fetchEvent();
    fetchImage();
  }, [id]);

  if (loading || image === null) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!item) {
    return <ErrorMessage error={`Event with id ${id} could not be found `} />;
  }

  return (
    <div className="w-11/12 max-w-5xl m-auto mb-8 mt-8">
      <div className="card lg:card-side bg-base-100 shadow-sm">
        <figure>
          <img src={image} alt={item.title} />
        </figure>
        <div className="flex flex-col card-body max-w-lg gap-2">
          <h2 className="card-title font-stretch-normal">
            {item.title} @ {item.location}
          </h2>
          <h4 className="font-stretch-normal text-lg">
            Event date: {new Date(item.date).toDateString()}
          </h4>
          <p className="self-start font-extralight font-stretch-normal text-sm text-justify mt-8">
            {item.description}
          </p>
          <p className="self-start content-end text-xs font-light mt-3">
            Last update: {new Date(item.updatedAt).toDateString()}
          </p>
        </div>
      </div>
      <div className="modal-action">
        <button className="btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default EventDetails;
