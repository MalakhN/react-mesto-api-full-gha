import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  /* Реф, чтобы получить прямой доступ к DOM-элементу инпута и его значению */
  const avatarLinkRef = React.useRef();

  /* Обработчик изменения значений инпутов, обновляющий стейт */
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar:
        /* Значение инпута, полученное с помощью рефа */
        avatarLinkRef.current.value,
    });
  }

  /* Эффект, который очищает форму после отправки данных в api */
  React.useEffect(() => {
    avatarLinkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <input
        ref={avatarLinkRef}
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className="form__item"
        required
      />
      <span className="avatar-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
