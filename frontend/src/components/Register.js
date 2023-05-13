import React from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleOnLogIn = () => {
    navigate("/sign-in", { replace: true });
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
  };

  return (
    <>
      <Header email="" text="Войти" onClick={handleOnLogIn} />
      <section className="sign">
        <div className="sign__container">
          <h2 className="sign__header">Регистрация</h2>
          <form className="sign__form" onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={handleSetEmail}
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
              onChange={handleSetPassword}
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
              Зарегистрироваться
            </button>
            <p className="sign__redirect">
              Уже зарегистрированы?{" "}
              <Link to="/sign-in" className="sign__redirect-link">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
