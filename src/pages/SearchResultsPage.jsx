import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResultsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Parse state and city from URL
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    if (state && city) {
      fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [state, city]);

  const handleBook = (event) => {
    navigate(`/book/${event.eventName}`, { state: { event } });
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-6">
      <h1>
        {events.length} events available in {city}
      </h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {events.map((event, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3>{event.eventName}</h3>
              <p>
                {event.address}, {event.city}, {event.state}
              </p>
              <p>Rating: {event.rating}</p>
              <button onClick={() => handleBook(event)}>Book FREE Event</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
