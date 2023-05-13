import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип Mesto Россия" src={logo} />
      <div className="header__account">
        <p className="header__account-name">{props.email}</p>
        <button className="header__account-button" onClick={props.onClick}>
          {props.text}
        </button>
      </div>
    </header>
  );
}

export default Header;
