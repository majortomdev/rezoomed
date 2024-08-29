import React, { useState, useEffect } from "react";
import axiosX from "../axiosConfig";
import "./DataTags.css";
import Navbar from "./Navbar";
import EditDataModal from "./EditDataModal";

// const DataTags = ({ onUpdateDatag, onLogout }) => {
//   const [notes, setNotes] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [newEntries, setNewEntries] = useState("");
//   const [selectedDatatag, setSelectedDatatag] = useState(null);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await axiosX.get(
//           "http://localhost:5000/api/datatags",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//           }
//         );
//         setNotes(response.data);
//       } catch (error) {
//         console.error("Failed to fetch notes:", error);
//       }
//     };
//     fetchNotes();
//   }, []);

//   const handleAddNote = async () => {
//     try {
//       const response = await axiosX.post(
//         "http://localhost:5000/api/datatags",
//         {
//           title: newTitle,
//           entries: newEntries.split("\n"),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       setNotes([...notes, response.data]);
//       setNewTitle("");
//       setNewEntries("");
//     } catch (error) {
//       console.error("Failed to add note:", error);
//     }
//   };

//   const handleEditClick = (tag) => {
//     setSelectedDatatag(tag);
//   };

//   const handleSaveDatatag = async (updatedDatatag) => {
//     try {
//       await axiosX.put(`/api/datatags/${updatedDatatag.id}`, updatedDatatag, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       // Update the notes array with the updated datatag
//       const updatedNotes = notes.map((note) =>
//         note.id === updatedDatatag.id ? updatedDatatag : note
//       );
//       setNotes(updatedNotes);
//       setSelectedDatatag(null); // Close the modal
//     } catch (error) {
//       console.error("Failed to update the tag", error);
//     }
//   };

//   return (
//     <div className="dataTags-container">
//       <Navbar />

//       <div className="notes-container">
//         <div className="new-note">
//           <h3>Save a new entry</h3>
//           <input
//             className="new-inputs"
//             type="text"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             placeholder="Title"
//           />
//           <textarea
//             className="new-inputs"
//             value={newEntries}
//             rows="7"
//             onChange={(e) => setNewEntries(e.target.value)}
//             placeholder="Enter your info here, enter to create new entry"
//           />
//           <button className="new-input-btn" onClick={handleAddNote}>
//             Add Data
//           </button>
//         </div>

//         {notes.map((note) => (
//           <div key={note.id} className="note">
//             <h3>{note.title}</h3>
//             <ul className="data-list">
//               {note.entries.map((entry, index) => (
//                 <li key={index}>{entry}</li>
//               ))}
//             </ul>
//             <button onClick={() => handleEditClick(note)}>Edit</button>
//           </div>
//         ))}
//         {selectedDatatag && (
//           <EditDataModal
//             datatag={selectedDatatag}
//             onSave={handleSaveDatatag}
//             onClose={() => setSelectedDatatag(null)}
//           />
//         )}
//       </div>
//       <div className="nt-btn-lo">
//         <button onClick={onLogout}>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default DataTags;

const DataTags = ({ onUpdateDatag, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newEntries, setNewEntries] = useState("");
  const [selectedDatatag, setSelectedDatatag] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axiosX.get("http://localhost:5000/api/datatags", {
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
    setNotes([...notes, response.data]);
    setNewTitle("");
    setNewEntries("");
  };

  const handleEditClick = (tag) => {
    console.log("tag: " + selectedDatatag);
    setSelectedDatatag(tag);
    console.log("tag: " + selectedDatatag);
  };

  const handleSaveDatatag = async (updatedDatatag) => {
    // onUpdateNote(updatedNote);
    // setSelectedNote(null); // Close the modal after saving

    try {
      await axiosX.put(`/api/datatags/${updatedDatatag.id}`, updatedDatatag);
      //onUpdateDatag(updatedDatatag); // Update the note in the parent component's state
      setSelectedDatatag(null); // Close the modal
    } catch (error) {
      console.error("Failed to update the tag", error);
    }
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
            <button onClick={() => handleEditClick(note)}>Edit</button>
          </div>
        ))}
        {selectedDatatag && (
          <EditDataModal
            datatag={selectedDatatag}
            onSave={handleSaveDatatag}
            onClose={() => setSelectedDatatag(null)}
          />
        )}
      </div>
      <div className="nt-btn-lo">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DataTags;
