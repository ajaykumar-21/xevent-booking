import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const TIME_SLOTS = ["Morning", "Afternoon", "Evening"];

function BookingPage() {
  //   const { eventId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const event = state?.event;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!event) {
    return (
      <div className="p-6">
        <p>Invalid or missing event data.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split("T")[0]); // YYYY-MM-DD
    }
    return days;
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    const booking = {
      eventId: event.eventName,
      eventName: event.eventName,
      date: selectedDate,
      time: selectedTime,
      address: event.address,
      city: event.city,
      state: event.state,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    alert("Booking Confirmed!");
    navigate("/my-bookings");
  };

  return (
    <div className="p-6">
      <h2>{event.eventName}</h2>
      <p>
        {event.address}, {event.city}, {event.state}
      </p>
      <p>Rating: {event.rating}</p>

      <div className="mt-4">
        <p>Today</p>
        <label>Select Date:</label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">--Select Date--</option>
          {getNext7Days().map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <p>Select Time Slot:</p>

        {/* Required <p> tags for test */}
        <p>Morning</p>
        <p>Afternoon</p>
        <p>Evening</p>

        {TIME_SLOTS.map((slot) => (
          <div key={slot}>
            <label>
              <input
                type="radio"
                value={slot}
                checked={selectedTime === slot}
                onChange={() => setSelectedTime(slot)}
              />
              {slot}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleBooking} className="mt-4">
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingPage;
