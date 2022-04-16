import React from "react";
import Styles from "./Product.module.css";

const Product = ({ name, description, price, productID, status, images }) => {
  // console.log(images);
  return (
    <div className={Styles.product}>
      <div className={Styles["img-container"]}>
        <div
          className={Styles.img}
          style={{ background: `url(${images[0]})` }}
        ></div>
        <div className={Styles.info}>
          <div>
            <h3>{name}</h3>
            <p>$ {price}</p>
          </div>
          <p>{description}</p>
          <button>Buy This!</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
