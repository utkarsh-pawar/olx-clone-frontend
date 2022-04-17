import React, { useState } from "react";
import Styles from "./AddItem.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loaderActions } from "../../store/loaderSlice";

const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

  const addItemHandler = async (event) => {
    try {
      event.preventDefault();
      dispatch(loaderActions.startLoading())

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
      dispatch(loaderActions.stopLoading())
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
      <form encType="multipart/form" method="POST" onSubmit={addItemHandler}>
        <h4>
          <label htmlFor="name">Name of Item:</label>
        </h4>
        <input
          type="text"
          autoComplete="off"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name of the product"
        />
        <h4>
          <label htmlFor="desc">Description:</label>
        </h4>
        <textarea
          type="text-are"
          autoComplete="off"
          id="desc"
          rows={5}
          placeholder="Description of the product"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <h4>
          <label htmlFor="price">Price: (in dollars)</label>
        </h4>
        <input
          type="number"
          id="price"
          placeholder="Ask Price of the product"
          autoComplete="off"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <h4>
          <label htmlFor="images">images of the item:</label>
        </h4>

        <input
          type="file"
          placeholder="select images of the product"
          autoComplete="off"
          id="images"
          className={Styles["add-input__image"]}
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
