import React, { useEffect, useState } from "react";
import Styles from "./Navbar.module.css";
import logo from "../../assets/olx-logo.webp";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isUser = useSelector((state) => state.user.isUser);
  const [pathname, setPathname] = useState();
  const logoutHandler = () => {
    dispatch(userActions.loggedOut());
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname, pathname]);
  if (isUser) {
    return (
      <div className={Styles.navbar}>
        <div className={Styles["navbar-logo"]}>
          <img src={logo} alt="" />
        </div>
        <div className={Styles["navbar-links"]}>
          {pathname === "/profile" && (
            <>
              <h4 className={Styles["navbar-links__signup"]}>
                <Link to="/">home</Link>
              </h4>
              <h4 className={Styles["navbar-links__login"]}>
                <p onClick={logoutHandler}>Logout</p>
              </h4>
            </>
          )}
          {pathname === "/" && (
            <>
              <h4 className={Styles["navbar-links__signup"]}>
                <Link to="/profile">Profile</Link>
              </h4>
              <h4 className={Styles["navbar-links__login"]}>
                <p onClick={logoutHandler}>Logout</p>
              </h4>
            </>
          )}
        </div>
      </div>
    );
  } else if (!isUser) {
    return (
      <div className={Styles.navbar}>
        <div className={Styles["navbar-logo"]}>
          <img src={logo} alt="" />
        </div>
        <div className={Styles["navbar-links"]}>
          <h4 className={Styles["navbar-links__login"]}>
            <Link to="/login">LogIn</Link>
          </h4>
          <h4 className={Styles["navbar-links__signup"]}>
            <Link to="/signup">Sign Up</Link>
          </h4>
        </div>
      </div>
    );
  }
};

export default Navbar;
