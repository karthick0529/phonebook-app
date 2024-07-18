import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phonebook, setPhonebook] = useState([]);

  const addNewNumber = async () => {
    try {
      await axios.post("http://localhost:5000/api/add-phone", {
        name,
        phone,
      });
      // Clear the input fields after adding the number
      setName("");
      setPhone("");
      // Refresh the phonebook list
      fetchPhonebook();
    } catch (error) {
      console.error("Error adding new number:", error);
    }
  };

  const fetchPhonebook = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get-phone");
      if (res.data && res.data.data && res.data.data.phoneNumbers) {
        setPhonebook(res.data.data.phoneNumbers);
      } else {
        setPhonebook([]);
      }
    } catch (error) {
      console.error("Error fetching phonebook:", error);
    }
  };

  useEffect(() => {
    fetchPhonebook();
  }, []);

  return (
    <div className="container">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="phone">Phone Number</label>
      <input
        type="text"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <button onClick={addNewNumber}>Add Number</button>

      <h1>PhoneBook List</h1>
      {phonebook.map((val, key) => (
        <div key={key} className="phone">
          <h1>{val.name}</h1>
          <h1>{val.phone}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
