import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    transportation: '',
    energy: '',
    diet: '',
    waste: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/calculate', formData);
      setResult(response.data.total_footprint);
    } catch (error) {
      console.error('Error calculating carbon footprint', error);
    }
  };

  return (
    <div>
      <h1>Carbon Footprint Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Transportation:
          <input type="number" name="transportation" value={formData.transportation} onChange={handleChange} />
        </label>
        <br />
        <label>
          Energy:
          <input type="number" name="energy" value={formData.energy} onChange={handleChange} />
        </label>
        <br />
        <label>
          Diet:
          <input type="number" name="diet" value={formData.diet} onChange={handleChange} />
        </label>
        <br />
        <label>
          Waste:
          <input type="number" name="waste" value={formData.waste} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result && <h2>Your Carbon Footprint: {result} tons/year</h2>}
    </div>
  );
}

export default App;

