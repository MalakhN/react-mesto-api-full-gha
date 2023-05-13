import React from "react";
import Success from "../images/Success.png";
import Error from "../images/Error.png";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : " "
      }`}
    >
      <div className="popup__container popup__tooltip-container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__tooltip-image"
          src={props.isSuccess ? Success : Error}
          alt=""
        />
        <p className="popup__tooltip-message">
          {props.isSuccess ? props.successMessage : props.ErrorMessage}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
