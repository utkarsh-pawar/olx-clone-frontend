import axios from "axios";
import React, { useEffect, useState } from "react";
import Styles from "./MyItems.module.css";
import { useSelector } from "react-redux";
import Product from "../product/Product";
import links from "../../links/link";

const MyItems = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [myProducts, setMyProducts] = useState([]);
  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const authHeader = `Bearer ${localStorage.getItem("token")}`;
        console.log(authHeader);
        const itemsList = await axios.post(links.myItems, null, {
          headers: { auth: authHeader },
        });

        setMyProducts(itemsList.data.data);
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
    fetchMyItems();
  }, [isLoading]);
  console.log(myProducts);
  return (
    <div className={Styles.items}>
      <h3>Items Listed:</h3>
      <div>

      {myProducts.length > 0 ?
        myProducts.map((product) => (
          <Product
          key={product._id}
          productID={product._id}
          name={product.name}
          price={product.price}
          status={product.status}
          description={product.description}
          images={product.images}
          />
          )):<h4>No items Listed to sell.</h4>}
          </div>
    </div>
  );
};

export default MyItems;
