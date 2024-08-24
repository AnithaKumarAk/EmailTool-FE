import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../auth/auth";
import loginImage from "../../assets/login-1.png"; // Adjust path if necessary

import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    signin(email, password).then((res) => {
      if (res.valid === true && res.status === 200) {
        setIncorrect(false);
        navigate("/");
      } else if (res.valid === false && res.status === 400) {
        setIncorrect(true);
      }
    });
  };

  return (
    <div>
      <main className="sign-up">
        <div className="sign-up__container">
          <div className="sign-up__image">
            <img src={loginImage} alt="login" className="login-image" />
          </div>
          <div className="sign-up__content">
            <header className="sign-up__header">
              <h1 className="sign-up__title">Login</h1>
              <p className="sign-up__descr">Welcome, Please login to your account.</p>
            </header>
            <div className="sign-up__form form">
              <div className="form__row">
                <div className="input">
                  <div className="input__container">
                    <input
                      className="input__field"
                      id="email"
                      placeholder="Email"
                      required
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="input__label" htmlFor="email">
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <div className="form__row">
                <div className="input">
                  <div className="input__container">
                    <input
                      className="input__field"
                      id="password"
                      placeholder="Password"
                      required
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="input__label" htmlFor="password">
                      Password
                    </label>
                  </div>
                </div>
                {incorrect && (
                  <span className="err">Invalid Username or password</span>
                )}
              </div>

              <div className="form__row">
                <div className="component component--primary form__button">
                  <button
                    className="btn btn--regular"
                    id="sign-up-button"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="form__row sign-up__sign">
                Don't have an account? &nbsp;
                <Link to="/register" className="link">
                  Sign up.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
