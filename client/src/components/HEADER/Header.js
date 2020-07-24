import React from "react";
import logo from "../../logo.svg";
import "./Header.css";

const Header = (props) => {
  return (
    <header className="header">
      <div className="_logobox"></div>
      <div className="hOne-box">
        <h1 className="heading_big">
          <span className="heading_1">AddressBook</span>
          <span className="heading_2">Get All Details</span>
        </h1>
        <a href="/addDetails" class="btn btn-white">
          Add New Users
        </a>
      </div>
    </header>
  );
};

export default Header;
