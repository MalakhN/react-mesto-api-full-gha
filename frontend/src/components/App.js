import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import Register from "../components/Register";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  /* Хуки */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
  });
  const [cards, setCards] = React.useState([]);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isSignSuccess, setIsSignSuccess] = React.useState(false);
  const navigate = useNavigate();

  /* Проверяем JSON Web Token */
  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken()
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/main", { replace: true });
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    }
  }, [navigate]);

  /* Получаем данные пользователя и карточки при загрузке страницы для авторизованного пользователя */
  React.useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCard()])
        .then(([userArr, initialCards]) => {
          setCurrentUser(userArr);
          setCards(initialCards);
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
  }, [loggedIn]);

  /* Обработчик пропса компонента входа зарегистрированного пользователя */
  const onLogin = (email, password) => {
    auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) {
          setEmail("");
          handleLogin();
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => {
        setIsSignSuccess(false);
        setIsTooltipOpen(true);
      });
  };

  /* Обработчик пропса компонента регистрации нового пользователя */
  const onRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsSignSuccess(true);
        setIsTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsSignSuccess(false);
        setIsTooltipOpen(true);
        console.error(err);
      });
  };

  /* Обработчик состояния авторизации */
  const handleLogin = () => {
    setLoggedIn(true);
  };

  /* Обработчики пропса isOpen, открывающие соответствующие попапы */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  };

  /* Обработчик пропса onClose, закрывающий все попапы */
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsConfirmPopupOpen(false);
    setIsTooltipOpen(false);
  };

  /* Функции отправки данных пользователя на сервер и обновления их на странице */
  const handleUpdateUser = (data) => {
    api
      .downloadUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  /* Функция поддержки лайков и дизлайков */
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  /* Функция добавления карточек */
  const handleAddPlaceSubmit = (newCard) => {
    api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  /* Функция удаления карточек */
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Routes>
            {/* Роут с переадресацией в зависимости от статуса авторизации пользователя */}
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            {/* Роут для входа зарегистрированного пользователя */}
            <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
            {/* Роут для регистрации незарегистрированного пользователя */}
            <Route
              path="/sign-up"
              element={<Register onRegister={onRegister} />}
            />
            {/* Защищённый авторизацией роут с контентом для авторизованного пользователя */}
            <Route
              path="/main"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  email={email}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onDeleteCard={handleDeleteClick}
                  cards={cards}
                />
              }
            />
          </Routes>
          {/* Попап смены аватара */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* Попап редактирования профиля */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/* Попап добавления карточки */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          {/* Попап предпросмотра изображения карточки */}
          <ImagePopup
            isOpen={isCardPopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
          {/* Попап подтверждения удаления карточки */}
          <ConfirmDeletePopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
            onDeleteCard={handleCardDelete}
          />
          {/* Попап-сообщение об успешности/неуспешности регистрации */}
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isSignSuccess}
            successMessage="Вы успешно зарегистрировались!"
            errorMessage="Что-то пошло не так! Попробуйте ещё раз."
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
