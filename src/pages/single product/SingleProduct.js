import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./SingleProduct.module.css";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState();
  const params = useParams();
  const backdropHandler = (event) => {
    event.stopPropagation();
    navigate(-1);
  };
  useEffect(() => {
    const getItem = async () => {
      try {
        const product = await axios.post("http://localhost:5000/item/getitem", {
          id: params.id,
        });
        setItem(product.data.data);
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
    getItem();
  }, []);
  console.log(item);
  return (
    <div className={Styles.single}>
      <div className={Styles["backdrop"]} onClick={backdropHandler}></div>
      <div className={Styles["single-container"]}>
        <div className={Styles["single-card"]}>
          <div>
            <div>{item && <img src={item.images[0]} alt="" />}</div>
            <div>
              <h3>{item && item.name}</h3>
              <p>{item && item.description}</p>
              <span>${item && item.price}</span>
              <div>
                <button className={Styles.buy} onClick={() => navigate(-1)}>
                  Buy
                </button>
                <button onClick={() => navigate(-1)}>Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
