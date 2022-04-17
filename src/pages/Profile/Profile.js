import React from "react";
import AddItem from "../../components/additem/AddItem";
import "../../App.css";
import Navbar from "../../components/Navbar/Navbar";
import Styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import MyItems from "../../components/itemOnSale/MyItems";
import ItemsPurchased from "../../components/ItemsPurchased/ItemsPurchased";
import Footer from "../../components/footer/Footer";

const Profile = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <div className={Styles.profile}>
      {isLoading && <div className="loading">Loading...</div>}
      <Navbar />
      <AddItem />
      <div className={Styles.list}>
        <MyItems />
        <ItemsPurchased />
      </div>
      <div className={Styles["profile-footer"]}>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
