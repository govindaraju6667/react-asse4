import React, { useState, useEffect } from "react";
import axios from "axios";

const ServerData = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false);
  const [title, setTitle] = useState("");
  const [newBody, setBody] = useState("");

  useEffect(() => {
    fetchServerData();
  }, []);
  const fetchServerData = () => {
    axios
      .get("http://localhost:3030/posts")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleFormSubmit = () => {
    const newItem = {
      title: title,
      body: newBody,
    };

    axios
      .post("http://localhost:3030/posts", newItem)
      .then((response) => {
        console.log("added:", response.data);

        fetchServerData();

        setTitle("");
        setBody("");
        setForm(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDeleteClick = (itemId) => {
    axios
      .delete(`http://localhost:3030/posts/${itemId}`)
      .then((response) => {
        console.log("deleted:", response.data);
        fetchServerData();
      })
      .catch((error) => console.log("Error:", error));
  };

  return (
    <div className="main">
      <h1>Json Data</h1>
      <button onClick={() => setForm(true)}>ADD</button>

      {form && (
        <form>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />

          <label>
            Body:
            <input
              type="text"
              value={newBody}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <br />

          <button type="button" onClick={handleFormSubmit}>
            Add
          </button>
        </form>
      )}

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <button>Add</button>
            <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerData;
