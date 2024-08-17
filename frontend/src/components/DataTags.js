import React, { useState, useEffect } from "react";
import axiosX from "../axiosConfig";
import "./DataTags.css";
import Navbar from "./Navbar";

const DataTags = ({ onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newEntries, setNewEntries] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axiosX.get("http://localhost:5000/api/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setNotes(response.data);
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    const response = await axiosX.post(
      "http://localhost:5000/api/notes",
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
    setNotes([...notes, response.data]);
    setNewTitle("");
    setNewEntries("");
  };

  return (
    <div className="dataTags-container">
      <Navbar />

      <div className="notes-container">
        <div className="new-note">
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
          <button className="new-input-btn" onClick={handleAddNote}>
            Add Data
          </button>
        </div>

        {notes.map((note) => (
          <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <ul className="data-list">
              {note.entries.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
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
