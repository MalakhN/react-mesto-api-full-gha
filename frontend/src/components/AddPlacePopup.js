import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  /* Обработчики изменения значений инпутов, обновляющие стейт */
  function handleChangeNameCard(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  /* Эффект, который очищает форму после отправки данных в api */
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText="Сохранение..."
      name="add-card"
      title="Новое место"
      buttonText="Сохранить"
    >
      <input
        value={name}
        onChange={handleChangeNameCard}
        id="title-input"
        type="text"
        name="cardname"
        placeholder="Название"
        className="form__item form__item_info_title"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="title-input-error form__input-error"></span>
      <input
        value={link}
        onChange={handleChangeLink}
        id="link-input"
        type="url"
        name="cardlink"
        placeholder="Ссылка на картинку"
        className="form__item form__item_info_link"
        required
      />
      <span className="link-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
