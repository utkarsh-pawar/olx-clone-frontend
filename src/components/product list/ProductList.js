import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../product/Product";
import Styles from "./ProductList.module.css";
import { FaAngleDown } from "react-icons/fa";
import links from "../../links/link";
import Loading from "../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { loaderActions } from "../../store/loaderSlice";

const ProductList = () => {
  const [products, setProducts] = useState();
  const [count, setCount] = useState(15);

  const isLoading = useSelector((state) => state.loader.isLoading);
  const dispatch = useDispatch();

  const countHandler = () => {
    if (count >= products.length) {
      return;
    }
    setCount((...prevState) => +prevState + +15);
  };

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch(loaderActions.startLoading());
        const items = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/item/getallitems`
        );
        dispatch(loaderActions.stopLoading());
        setProducts(items.data.data);
        console.log(items);
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
    getAllItems();
  }, [count]);
  console.log(count);

  return (
    <div className={Styles.products}>
      {isLoading && <Loading />}

      {products && products.length > 0
        ? products
            .filter((product) => product.status === "unsold")
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, count)
            .map((product) => (
              <Product
                key={product._id}
                productID={product._id}
                name={product.name}
                price={product.price}
                status={product.status}
                description={product.description}
                images={product.images}
              />
            ))
        : ""}
      <div className={Styles["product-showmore"]}>
        <FaAngleDown onClick={countHandler} />
      </div>
    </div>
  );
};

export default ProductList;
