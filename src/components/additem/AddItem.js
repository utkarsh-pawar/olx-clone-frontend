import React, { useState } from "react";
import Styles from "./AddItem.module.css";
import axios from "axios";

const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const addItemHandler = async (event) => {
    try {
      event.preventDefault();

      const bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("description", description);
      bodyFormData.append("price", price);

      for (let i = 0; i < images.length; i++) {
        bodyFormData.append("images", images[i]);
      }

      const authHeader = `Bearer ${localStorage.getItem("token")}`;
      const sell = await axios.post(
        "http://localhost:5000/item/additem",
        bodyFormData,
        { headers: { auth: authHeader, "content-type": "multipart/form-data" } }
      );

      console.log(sell);
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log(e.message);
      }
    }
  };

  return (
    <div className={Styles.add}>
      <form onSubmit={addItemHandler}>
        <label htmlFor="name">Name of Item:</label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label htmlFor="price">Price: (in dollars)</label>
        <input
          type="number"
          id="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label htmlFor="images">images of the item:</label>
        <input
          type="file"
          id="images"
          onChange={(e) => {
            setImages(e.target.files);
          }}
          accept="image/png, image/jpeg"
          multiple
        />
        <button type="submit">Sell Item</button>
      </form>
    </div>
  );
};

export default AddItem;
