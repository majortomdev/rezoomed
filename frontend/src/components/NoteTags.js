import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NoteTags.css";
import Navbar from "./Navbar";

const NoteTags = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newEntries, setNewEntries] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get("http://localhost:5000/api/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setNotes(response.data);
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    const response = await axios.post(
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
    <div>
      <Navbar />
      <div className="notes-container">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <ul>
              {note.entries.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="new-note">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={newEntries}
            onChange={(e) => setNewEntries(e.target.value)}
            placeholder="Enter your notes here, one per line"
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
      </div>
    </div>
  );
};

export default NoteTags;
