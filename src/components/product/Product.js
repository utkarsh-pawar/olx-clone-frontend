import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./Product.module.css";

const Product = ({ name, description, price, productID, status, images }) => {
  const isUser = useSelector((state) => state.user.isUser);
  const navigate = useNavigate();
  const buyHandler = () => {
    if (!isUser) {
      return toast.info("please login to buy or sell.");
    }
    navigate(`/product/${productID}`);
  };

  // console.log(images);
  return (
    <div className={Styles.product}>
      <ToastContainer
        toastClassName={Styles.toast}
        theme="colored"
        toastStyle={{ backgroundColor: "crimson" }}
        pauseOnHover={false}
        hideProgressBar={true}
        autoClose={2000}
      />
      <div className={Styles["img-container"]}>
        <div
          className={Styles.img}
          style={{ background: `url(${images[0]})` }}
        ></div>
        <div className={Styles.info}>
          <div>
            <h3>{name}</h3>
            <div>
              <p>{status}</p>
              <p>$ {price}</p>
            </div>
          </div>
          <p>{description}</p>
          {status=== "unsold" &&

          <button onClick={buyHandler}>Buy This!</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Product;
