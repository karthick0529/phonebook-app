import React, { useState, useEffect } from "react";
import axios from "axios";

const PhonebookList = () => {
  const [phonebook, setPhonebook] = useState([]);

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
    <div className="phonebook-list">
      <h1>PhoneBook List</h1>
      {phonebook.map((val, key) => (
        <div key={key} className="phone">
          <h1>{val.name}</h1>
          <h1>{val.phone}</h1>
        </div>
      ))}
    </div>
  );
};

export default PhonebookList;
