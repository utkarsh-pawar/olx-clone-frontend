import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../product/Product";
import Styles from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const getAllItems = async () => {
      const items = await axios.get("http://localhost:5000/item/getallitems");
      setProducts(items.data.data);
      console.log(items);
    };
    getAllItems();
  }, []);
  console.log(products && products);

  return (
    <div className={Styles.products}>
      {products && products.length > 0
        ? products.map((product) => (
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
        : "No Items to Buy!!"}
    </div>
  );
};

export default ProductList;
