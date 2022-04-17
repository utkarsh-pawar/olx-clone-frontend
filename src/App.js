import "./App.css";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home.js/Home";
import Profile from "./pages/Profile/Profile";
import { useEffect } from "react";
import checkIsUser from "./constants/tokenCheck";

import SingleProduct from "./pages/single product/SingleProduct";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkIsUser(dispatch);
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<SingleProduct />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
