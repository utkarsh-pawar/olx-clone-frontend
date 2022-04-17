import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Styles from "./BuyItem.module.css";
import { useNavigate, useParams } from "react-router-dom";

const BuyItem = () => {
  useEffect(() => {});
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className={Styles.buy}>
      <div className={Styles["buy-card"]}>
        <h1>{params.id}</h1>
      </div>
      {/* <button onClick={() => navigate(-1)}>goback</button> */}
    </div>
  );
};

export default BuyItem;
