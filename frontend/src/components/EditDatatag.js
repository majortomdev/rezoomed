import React, { useState } from "react";
import axios from "axios";

const EditDatatag = ({ datatag, onUpdate }) => {
  const [title, setTitle] = useState(datatag.title);
  const [entries, setEntries] = useState(datatag.entries);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/datatags/${datatag.id}`,
        {
          title,
          entries,
        }
      );
      onUpdate(response.data);
    } catch (error) {
      console.error("There was an error updating the datatag:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea value={entries} onChange={(e) => setEntries(e.target.value)} />
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
};

export default EditDatatag;
