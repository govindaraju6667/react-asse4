import React, { useState, useEffect } from "react";
import axios from "axios";

const ServerData = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false);
  const [title, setTitle] = useState("");
  const [newBody, setBody] = useState("");
  const [id, setId] = useState(0);
  const [edit, setEdit] = useState(false);

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

  const handleFormSubmit = (event) => {
    console.log(event.target);
    if (event.target.value === "Add") {
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
    } else {
      const newItem = {
        title: title,
        body: newBody,
      };
      axios
        .put(`http://localhost:3030/posts/${id}`, newItem)
        .then((response) => {
          fetchServerData();
          setTitle("");
          setBody("");
        });
      setEdit(false);
      setForm(false);
    }
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:3030/posts/${itemId}`)
      .then((response) => {
        console.log("deleted:", response.data);
        fetchServerData();
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleUpdate = (ele) => {
    setEdit(true);
    setTitle(ele.title);
    setBody(ele.body);
    setId(ele.id);

    setForm(true);
  };

  return (
    <div className="main">
      <h1 id="data">Json Data</h1>
      <button onClick={() => setForm(true)} id="btn">
        ADD
      </button>

      {form && (
        <form id="forms">
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
            <textarea
              value={newBody}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <br />

          <button
            type="button"
            onClick={handleFormSubmit}
            id="add-btn"
            value={edit ? "update" : "Add"}
          >
            {edit ? "update" : "Add"}
          </button>
        </form>
      )}

      <ul>
        {data.map((item) => (
          <div className="data-list">
            <li id="list" key={item.id}>
              <h2 id="title">{item.title}</h2>
              <p>{item.body}</p>
              <button id="btns" onClick={() => handleUpdate(item)}>
                Edit
              </button>
              <button id="btns" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ServerData;
