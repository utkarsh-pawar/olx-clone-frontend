import React, { useState } from "react";
import Styles from "./AddItem.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loaderActions } from "../../store/loaderSlice";
import links from "../../links/link";

const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

  const addItemHandler = async (event) => {
    try {
      event.preventDefault();
      dispatch(loaderActions.startLoading());
      console.log(images);

      if (!name || !description || !price || images.length === 0) {
        dispatch(loaderActions.stopLoading());
        return toast.info("enter all required fields");
      }

      const bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("description", description);
      bodyFormData.append("price", price);

      for (let i = 0; i < images.length; i++) {
        bodyFormData.append("images", images[i]);
      }

      const authHeader = `Bearer ${localStorage.getItem("token")}`;
      const sell = await axios.post(links.addItem, bodyFormData, {
        headers: { auth: authHeader, "content-type": "multipart/form-data" },
      });
      toast.info("your item is listed to be sold.");
      dispatch(loaderActions.stopLoading());
      // console.log(sell);
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
        <ToastContainer
          toastClassName={Styles.toast}
          theme="colored"
          toastStyle={{ backgroundColor: "lightblue" }}
          pauseOnHover={false}
          hideProgressBar={true}
          autoClose={2000}
        />
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
