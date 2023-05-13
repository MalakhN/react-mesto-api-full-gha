class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Приватный метод проверки всё ли в порядке с ответом сервера (если нет, то возвращает ошибку)
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Публичный метод для регистрации пользователя
  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    }).then(this._checkResponse);
  }

  // Публичный метод для авторизации пользователя
  authorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    })
      .then(this._checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      });
  }

  // Публичный метод проверки валидности токена и получения email для вставки в шапку сайта
  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => data);
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
});
