import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
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

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    fetch(`https://eventdata.onrender.com/cities/${state}`)
      .then((res) => res.json())
      .then((data) => setCities(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/events?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div id="state">
          <label>State:</label>
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div id="city">
          <label>City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" id="searchBtn">
          Search
        </button>
      </form>
    </div>
  );
}

export default LandingPage;
