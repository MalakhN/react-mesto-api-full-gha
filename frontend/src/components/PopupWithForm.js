import React from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,
}) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : " "} popup_type_${name}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <form className="form" name={`${name}`} onSubmit={onSubmit}>
          <div className="form__input-container">
            <h2 className="form__heading">{`${title}`}</h2>
            <div className="form__inputs">
              {children}
              <button type="submit" className="form__save-button">
                {`${buttonText}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
