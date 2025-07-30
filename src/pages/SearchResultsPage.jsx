import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResultsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

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
        });
    }
  }, [state, city]);

  const handleBook = (event, index) => {
    console.log("Booking event:", event);
    navigate(`/book/${index}`, { state: { event } });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1>
        {events.length} events available in {city}
      </h1>

      <div className="grid gap-4 mt-4">
        {events.map((event, index) => (
          <div key={event.eventName} className="border p-4 rounded shadow">
            <h3>{event.eventName}</h3>
            <p>
              {event.address}, {event.city}, {event.state}
            </p>
            <p>Rating: {event.rating}</p>
            <button onClick={() => handleBook(event, index)}>
              Book FREE Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
