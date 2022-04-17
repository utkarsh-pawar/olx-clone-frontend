import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ProductList from "../../components/product list/ProductList";
import Styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={Styles.home}>
      <Navbar />
      <div>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
