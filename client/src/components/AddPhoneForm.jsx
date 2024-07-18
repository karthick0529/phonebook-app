import React, { useState } from "react";
import axios from "axios";

const AddPhoneForm = ({ fetchPhonebook }) => {
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
      // Refresh the phonebook list
      fetchPhonebook();
    } catch (error) {
      console.error("Error adding new number:", error);
    }
  };

  return (
    <div className="add-phone-form">
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
    </div>
  );
};

export default AddPhoneForm;
