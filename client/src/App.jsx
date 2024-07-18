import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phonebook, setPhonebook] = useState([]);

  // State to hold individual new phone numbers for each person
  const [personToUpdate, setPersonToUpdate] = useState({
    id: null,
    newPhone: ""
  });

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

  const updatePhone = async () => {
    const { id, newPhone } = personToUpdate;
    try {
      await axios.patch(`http://localhost:5000/api/update-phone/${id}`, { phone: newPhone });
      // After successful update, refresh the phonebook list
      fetchPhonebook();
      // Reset personToUpdate state after update
      setPersonToUpdate({
        id: null,
        newPhone: ""
      });
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  }

  const handleUpdateInputChange = (id, newPhone) => {
    // Update the state for the person being edited
    setPersonToUpdate({
      id,
      newPhone
    });
  }

  const deletePhone = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-phone/${id}`);
      // After successful deletion, refresh the phonebook list
      fetchPhonebook();
    } catch (error) {
      console.error('Error deleting phone number:', error);
    }
  }

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
      <div className="phonebook-list">
        {phonebook.map((val, key) => (
          <div key={key} className="phone">
            <h1>{val.name}</h1>
            <h1>{val.phone}</h1>
            <input
              type="number"
              placeholder="Update Phone..."
              value={val._id === personToUpdate.id ? personToUpdate.newPhone : ""}
              onChange={(e) => handleUpdateInputChange(val._id, e.target.value)}
            />
            <button
              className="update-btn"
              onClick={updatePhone}
              disabled={!personToUpdate.id} // Disable update button if no person is selected
            >
              Update
            </button>
            <button
              className="delete-btn"
              onClick={() => deletePhone(val._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
