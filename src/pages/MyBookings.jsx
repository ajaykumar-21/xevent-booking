import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {bookings.map((booking, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3>{booking.eventName}</h3>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>
                Location: {booking.address}, {booking.city}, {booking.state}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
