import React, { useState, useEffect } from "react";
import Styles from "./Login.module.css";
import bg from "../../assets/bg.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isUser = useSelector((state) => state.user.isUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pathname, setPathname] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loginByMail, setLoginByMail] = useState(false);
  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
        number,
      });

      localStorage.setItem("token", response.data.token);
      dispatch(userActions.loggedIn());
      console.log(response.data);
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
  const signupHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("http://localhost:5000/user/signup", {
        email,
        password,
        name,
        contactNO: number,
      });

      const loginResponse = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
          number,
        }
      );
      localStorage.setItem("token", loginResponse.data.token);
      dispatch(userActions.loggedIn());
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

  const toggleChoiceHandler = () => {
    setLoginByMail((prevState) => (prevState = !prevState));
    setEmail("");
    setNumber("");
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (isUser) {
      navigate("/");
    }
    setPathname(location.pathname);
  }, [pathname, location.pathname, isUser, navigate]);
  console.log(pathname);
  return (
    <div className={Styles.login} style={{ background: `url(${bg})` }}>
      <ToastContainer
        toastClassName={Styles.toast}
        theme="colored"
        toastStyle={{ backgroundColor: "lightblue" }}
        pauseOnHover={false}
        hideProgressBar={true}
        autoClose={2000}
      />
      <div className={Styles.empty}></div>
      <div className={Styles["login-cardcontainer"]}>
        <div className={Styles["login-card"]}>
          <div className={Styles["login-formcontainer"]}>
            <h3>{pathname === "/login" ? "Login In" : "Create An Account"}</h3>

            {pathname === "/login" && (
              <button onClick={toggleChoiceHandler}>
                {loginByMail
                  ? "login by contact No"
                  : "login By Email address:"}
              </button>
            )}
            {pathname === "/login" ? (
              <form onSubmit={loginHandler} className={Styles["login-form"]}>
                {loginByMail ? (
                  <>
                    <label htmlFor="email">Email:</label>
                    <input
                      id="email"
                      value={email}
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                    />{" "}
                  </>
                ) : (
                  <>
                    <label htmlFor="number">Contact NO:</label>
                    <input
                      id="number"
                      value={number}
                      type="number"
                      onChange={(e) => setNumber(e.target.value)}
                      autoComplete="off"
                    />{" "}
                  </>
                )}

                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={Styles.primary}>
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={signupHandler} className={Styles["login-form"]}>
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  value={email}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                  id="contactNumber"
                  value={number}
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={Styles.primary}>
                  Sign Up
                </button>
              </form>
            )}
            {pathname === "/login" ? (
              <h4>
                Not a User? <Link to="/signup">Create an account</Link>
              </h4>
            ) : (
              <h4>
                already a user?{" "}
                <Link to="/login">Login to existing account</Link>
              </h4>
            )}
            <div>
              go Back to <Link to="/">Home</Link> page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
