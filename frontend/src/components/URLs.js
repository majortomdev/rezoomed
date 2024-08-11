import React, { useState, useEffect } from "react";
import axios from "axios";
import "./URLs.css";

const URLs = ({ username, onLogout }) => {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  useEffect(() => {
    fetchUrls();
  }, []);

  const displayPart = (str) => {
    let start = str.indexOf("//") + 2;
    let newString = str.substring(start);
    let end = newString.indexOf("/") + start;
    return "(" + str.substring(start, end) + ")";
  };

  const fetchUrls = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get("http://localhost:5000/api/urls", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setUrls(response.data);
  };

  const handleAddUrl = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const display = displayPart(newUrl);

    if (newUrl.length > 35) {
      await axios.post(
        "http://localhost:5000/api/urls",
        { url: newUrl, display: display, clipped: true },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/urls",
        { url: newUrl },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    }

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
      {username ? (
        <h2>Hello {username}, here are your saved links:</h2>
      ) : (
        <h2>Here are your links</h2>
      )}

      <ul className="url-list">
        {urls.map((url) => (
          <li className="url-item" key={url.id}>
            <a
              href={url.urlstring}
              target="_blank"
              rel="noopener noreferrer"
              className="url-link"
            >
              {url.clipped ? "Origin:  " + url.display : url.urlstring}
            </a>

            <button
              className="delete-button"
              onClick={() => handleDeleteUrl(url.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="add-urls">
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
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default URLs;
