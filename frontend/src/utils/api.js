class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // Приватный метод проверки всё ли в порядке с ответом сервера (если нет, то возвращает ошибку)
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Публичный метод получения данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Публичный метод получения карточек с сервера
  getInitialCard() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Публичный метод загрузки данных пользователя на сервер
  downloadUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  // Публичный метод загрузки аватара пользователя на сервер
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  // Публичный метод загрузки карточки на сервер
  addNewCard(item) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(item),
    }).then((res) => this._checkResponse(res));
  }

  // Публичный метод удаления карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }

  // Публичный метод отметки лайка карточки
  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => this._checkResponse(res));
  }

  // Публичный метод удаления лайка карточки
  deleteLikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }

  // Публичный метод переключения лайка и дизлайка карточки
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.deleteLikeCard(cardId);
    }
  }
}

/* Экземпляр класса Api с нужными параметрами (включая токен) */
export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "05649945-c6eb-4227-a166-ce14a7095099",
    "Content-Type": "application/json",
  },
});
