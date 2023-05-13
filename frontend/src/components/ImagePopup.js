import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.isOpen ? "popup_opened" : " "}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image-image"
          src={`${props.card.link}`}
          alt={props.card.name}
        />
        <p className="popup__image-text">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
