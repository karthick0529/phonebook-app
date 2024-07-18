import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, TextField, Button } from "@mui/material";

function Update() {
  const [phonebook, setPhonebook] = useState([]);
  const [personToUpdate, setPersonToUpdate] = useState({
    id: null,
    newPhone: "",
  });

  const fetchPhonebook = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get-phone");
      setPhonebook(res.data.data.phoneNumbers || []);
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
      await axios.patch(`http://localhost:5000/api/update-phone/${id}`, {
        phone: newPhone,
      });
      fetchPhonebook();
      setPersonToUpdate({ id: null, newPhone: "" });
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };

  const handleUpdateInputChange = (id, newPhone) => {
    setPersonToUpdate({ id, newPhone });
  };

  const deletePhone = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-phone/${id}`);
      fetchPhonebook();
    } catch (error) {
      console.error("Error deleting phone number:", error);
    }
  };

  return (
    <div className="update-container" style={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Update and Delete
      </Typography>
      <div
        className="phonebook-list"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {phonebook.map((val) => (
          <div
            key={val._id}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <Typography variant="h6">{val.name}</Typography>
            <TextField
              placeholder="Update Phone..."
              value={
                personToUpdate.id === val._id
                  ? personToUpdate.newPhone
                  : val.phone
              }
              onChange={(e) => handleUpdateInputChange(val._id, e.target.value)}
              variant="outlined"
              size="small"
              style={{ flexGrow: 1 }}
              inputProps={{
                type: "tel",
                pattern: "[0-9]*",
                inputMode: "numeric",
              }}
            />
            <Button
              className="update-btn"
              variant="contained"
              color="primary"
              onClick={updatePhone}
              disabled={!personToUpdate.id}
            >
              Update
            </Button>
            <Button
              className="delete-btn"
              variant="contained"
              color="error"
              onClick={() => deletePhone(val._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Update;
