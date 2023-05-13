import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteCard }) {
  /* Подписываемся и получаем значение контекста */
  const currentUser = React.useContext(CurrentUserContext);
  /* Проверяем, являемся ли мы владельцем текущей карточки */
  const isOwn = card.owner._id === currentUser._id;
  /* Создаём переменную, которую зададим в `className` для кнопки удаления карточки */
  const cardDeleteButtonClassName = `element__delete-icon ${
    isOwn ? "" : "element__delete-icon_disabled"
  }`;
  /* Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  /* Создаём переменную, которую зададим в `className` для кнопки лайка */
  const cardLikeButtonClassName = `element__icon ${
    isLiked ? "element__icon_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteCard(card);
  }

  return (
    <div className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <div className="element__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
