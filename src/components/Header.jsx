import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="p-4 shadow flex gap-6">
      <Link to="/">Find Events</Link>
      <Link to="/my-bookings">My Bookings</Link>
    </nav>
  );
}
