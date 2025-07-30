import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchSection() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://eventdata.onrender.com/cities/${selectedState}`)
        .then((res) => res.json())
        .then((data) => setCities(data));
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="p-6">
      {/* State Dropdown */}
      <div id="state">
        <label>Select State:</label>
        <ul>
          {states.map((state) => (
            <li
              key={state}
              onClick={() => setSelectedState(state)}
              style={{ cursor: "pointer" }}
            >
              {state}
            </li>
          ))}
        </ul>
        <p>Selected: {selectedState}</p>
      </div>

      {/* City Dropdown */}
      <div id="city">
        <label>Select City:</label>
        <ul>
          {cities.map((city) => (
            <li
              key={city}
              onClick={() => setSelectedCity(city)}
              style={{ cursor: "pointer" }}
            >
              {city}
            </li>
          ))}
        </ul>
        <p>Selected: {selectedCity}</p>
      </div>

      <button id="searchBtn" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchSection;
