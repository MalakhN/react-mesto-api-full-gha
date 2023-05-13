import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleOnRegister = () => {
    navigate("/sign-up", { replace: true });
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  };

  return (
    <>
      <Header email="" text="Регистрация" onClick={handleOnRegister} />
      <section className="sign">
        <div className="sign__container">
          <h2 className="sign__header">Вход</h2>
          <form className="sign__form" onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={handleInputEmail}
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="sign__form-item"
              minLength="2"
              maxLength="40"
              required
            />
            <input
              value={password}
              onChange={handleInputPassword}
              id="password"
              type="password"
              name="password"
              placeholder="Пароль"
              className="sign__form-item"
              minLength="2"
              maxLength="40"
              required
            />
            <button type="submit" className="sign__submit-button">
              Войти
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
