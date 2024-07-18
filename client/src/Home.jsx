import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Assuming you have a separate CSS file for styling

function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const addNewNumber = async () => {
    try {
      await axios.post("http://localhost:5000/api/add-phone", {
        name,
        phone,
      });
      // Clear the input fields after adding the number
      setName("");
      setPhone("");
    } catch (error) {
      console.error("Error adding new number:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Add New Number</h1>
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "300px" }} // Adjust the width value as needed
        />
      </div>
      <div className="input-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>
      <button onClick={addNewNumber}>Add Number</button>
    </div>
  );
}

export default Home;
