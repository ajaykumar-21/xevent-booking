import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchSection() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((res) => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://eventdata.onrender.com/cities/${selectedState}`)
        .then((res) => res.json())
        .then(setCities);
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
        <label
          onClick={() => setShowStates(!showStates)}
          style={{ cursor: "pointer" }}
        >
          Select State: {selectedState && <strong>{selectedState}</strong>}
        </label>
        {showStates && (
          <ul>
            {states.map((state) => (
              <li
                key={state}
                onClick={() => {
                  setSelectedState(state);
                  setSelectedCity(""); // reset city
                  setShowStates(false);
                  setShowCities(true); // open city next
                }}
                style={{ cursor: "pointer" }}
              >
                {state}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* City Dropdown */}
      <div id="city">
        <label
          onClick={() => setShowCities(!showCities)}
          style={{ cursor: "pointer" }}
        >
          Select City: {selectedCity && <strong>{selectedCity}</strong>}
        </label>
        {showCities && (
          <ul>
            {cities.map((city) => (
              <li
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setShowCities(false);
                }}
                style={{ cursor: "pointer" }}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        id="searchBtn"
        type="submit"
        disabled={!selectedState || !selectedCity}
      >
        Search
      </button>
    </form>
  );
}

export default SearchSection;
