import React, { useState, useEffect } from "react";
import axiosX from "../axiosConfig";
import "./DataTags.css";
import Navbar from "./Navbar";
import EditDatatag from "./EditDatatag";

const DataTags = ({ onLogout, datatag, onUpdate }) => {
  const [datatags, setDatatags] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newEntries, setNewEntries] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  useEffect(() => {
    const fetchDatatags = async () => {
      const response = await axiosX.get("http://localhost:5000/api/datatags", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setDatatags(response.data);
    };
    fetchDatatags();
  }, []);

  const handleAddDatatag = async () => {
    const response = await axiosX.post(
      "http://localhost:5000/api/datatags",
      {
        title: newTitle,
        entries: newEntries.split("\n"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setDatatags([...datatags, response.data]);
    setNewTitle("");
    setNewEntries("");
  };

  return (
    <div className="datatags-container">
      <Navbar />

      <div className="datatags-container">
        <div className="new-datatag">
          <h3>Save a new entry</h3>
          <input
            className="new-inputs"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="new-inputs"
            value={newEntries}
            rows="7"
            onChange={(e) => setNewEntries(e.target.value)}
            placeholder="Enter your info here, enter to create new entry"
          />
          <button className="new-input-btn" onClick={handleAddDatatag}>
            Add Data
          </button>
        </div>

        {datatags.map((datatag) => (
          <div key={datatag.id} className="datatag">
            {isEditing ? (
              <EditDatatag datatag={datatag} onUpdate={onUpdate} />
            ) : (
              <div>
                <h3>{datatag.title}</h3>
                <ul className="data-list">
                  {datatag.entries.map((entry, index) => (
                    <li key={index}>{entry}</li>
                  ))}
                </ul>
                <button onClick={handleEditClick}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="nt-btn-lo">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DataTags;
