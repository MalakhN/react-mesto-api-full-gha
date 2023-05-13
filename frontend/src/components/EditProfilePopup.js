import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  /* Подписка на контекст */
  const currentUser = React.useContext(CurrentUserContext);

  /* Обработчики изменения значений инпутов, обновляющие стейт */
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  /* Эффект, который будет обновлять переменные состояния при изменении контекста */
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleChangeName}
        id="name-input"
        type="text"
        name="name"
        placeholder="Имя"
        className="form__item"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-input-error form__input-error"></span>
      <input
        value={description}
        onChange={handleChangeDescription}
        id="description-input"
        type="text"
        name="description"
        placeholder="О себе"
        className="form__item"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="description-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
