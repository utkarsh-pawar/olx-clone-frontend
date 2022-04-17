import React from "react";
import AddItem from "../../components/additem/AddItem";
import Loading from "../../components/loading/Loading";
import Navbar from "../../components/Navbar/Navbar";
import Styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import MyItems from "../../components/itemOnSale/MyItems";
import ItemsPurchased from "../../components/ItemsPurchased/ItemsPurchased";

const Profile = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <div className={Styles.profile}>
      {isLoading && <Loading />}
      <Navbar />
      <AddItem />
      <div>
        <MyItems />
        <ItemsPurchased />
      </div>
    </div>
  );
};

export default Profile;
