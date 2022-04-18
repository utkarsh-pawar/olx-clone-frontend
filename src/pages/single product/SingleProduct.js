import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import links from "../../links/link";
import Styles from "./SingleProduct.module.css";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState();
  const params = useParams();
  const backdropHandler = (event) => {
    event.stopPropagation();
    navigate(-1);
  };

  const buyHandler = async () => {
    try {
      const authHeader = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.post(
        links.buyItem,
        { itemID: item._id },
        { headers: { auth: authHeader } }
      );
      if (response) {
        navigate("/profile");
      }
    } catch (e) {
      if (e.response) {
        toast.info(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log(e.message);
      }
    }
  };
  useEffect(() => {
    const getItem = async () => {
      try {
        const product = await axios.post(links.getSingleItem, {
          id: params.id,
        });
        setItem(product.data.data);
      } catch (e) {
        if (e.response) {
          toast(e.response.data);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log(e.message);
        }
      }
    };
    getItem();
  }, [params.id]);
  console.log(item);
  return (
    <div className={Styles.single}>
      {" "}
      <ToastContainer
        toastClassName={Styles.toast}
        theme="colored"
        toastStyle={{ backgroundColor: "crimson" }}
        pauseOnHover={false}
        hideProgressBar={true}
        autoClose={2000}
      />
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
                <button className={Styles.buy} onClick={buyHandler}>
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
