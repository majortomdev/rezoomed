import React, { useState, useEffect } from "react";
import axios from "axios";

const URLs = ({ onLogout }) => {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/urls", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUrls(response.data);
  };

  const handleAddUrl = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/api/urls",
      { url: newUrl },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNewUrl("");
    fetchUrls();
  };

  const handleDeleteUrl = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/urls/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUrls();
  };

  return (
    <div>
      <form onSubmit={handleAddUrl}>
        <input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Add URL</button>
      </form>
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            {url.urlstring}{" "}
            <button onClick={() => handleDeleteUrl(url.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default URLs;
