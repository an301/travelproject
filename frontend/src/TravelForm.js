import React, { useState } from "react";

const TravelForm = () => {
  // State for storing user input
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    preferences: "",
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Trip details saved! Check console for data.");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Plan Your Trip</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Budget ($):
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Preferences:
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="E.g. Beach, Adventure, Culture"
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TravelForm;
