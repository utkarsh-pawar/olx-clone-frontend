import React from "react";
import Styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={Styles.footer}>
      <div className={Styles.links}>
        <a href="">About</a>
        <a href="">Blog</a>
        <a href="">Jobs</a>
        <a href="">Press</a>
        <a href="">Accessibility</a>
        <a href="">Partners</a>
      </div>
      <div className={Styles.social}>
        <a href="">
          <FaInstagram />
        </a>
        <a href="">
          <FaFacebook />
        </a>
        <a href="">
          <FaTwitter />
        </a>
        <a href="">
          <FaGithub />
        </a>
      </div>
      <div className={Styles.copyright}>
        <p>© 2020 Workflow, Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
