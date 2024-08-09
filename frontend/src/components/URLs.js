import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const URLs = ({ onLogout }) => {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
      console.log("FFFFFFFFFFFFFFFFFFeeeettttt");
    const accessToken = localStorage.getItem("accessToken");
      console.log("sSsSsSsSsSsSsSsS:    "+accessToken);
      //const decodedToken = jwtDecode(token);
      //console.log(decodedToken);
    const response = await axios.get("http://localhost:5000/api/urls", {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') }`
    }});
    setUrls(response.data);
  };

  const handleAddUrl = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    await axios.post(
      "http://localhost:5000/api/urls",
      { url: newUrl },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setNewUrl("");
    fetchUrls();
  };

  const handleDeleteUrl = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    await axios.delete(`http://localhost:5000/api/urls/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
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
