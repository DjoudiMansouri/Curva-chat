import React from "react";
import "./App.js";
import fire from "./fire";
import "./login.css";
const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  return (
    <section className="login">
      <div id="connection-container">
        {hasAccount ? (
          <>
            <form onSubmit={handleLogin}>
              <label id="connex-lab" for="nom">
                {" "}
                Connectez-vous
              </label>
              <input
                className="connex-email"
                type="text"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                title="E-mail"
              />
              <p className="errorMsg"> {emailError} </p>
              <input
                className="connex-email connex-pw"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                title="Mot de passe"
              />
              <p className="errorMsg"> {passwordError} </p>
              <button
                type="submit"
                className="login__button"
                onClick={handleLogin}
              >
                Connexion
              </button>
              <p className="pascomp">Pas de compte ?</p>{" "}
              <span
                className="inscr"
                onClick={() => setHasAccount(!hasAccount)}
              >
                Inscrivez-vous !
              </span>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleSignup}>
              <label id="connex-lab" for="nom">
                {" "}
                Inscrivez-vous
              </label>
              <input
                className="connex-email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                title="E-mail"
              />
              <p className="errorMsg"> {emailError} </p>
              <input
                className="connex-email connex-pw"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                title="Mot de passe"
              />
              <p className="errorMsg"> {passwordError} </p>
              <button
                type="submit"
                className="login__button"
                onClick={handleSignup}
              >
                Inscription
              </button>
              <p className="pascomp">Vous disposez d'un compte ?</p>{" "}
              <span
                className="inscr"
                onClick={() => setHasAccount(!hasAccount)}
              >
                Connectez-vous !
              </span>
            </form>
          </>
        )}
      </div>
    </section>
  );
};
export default Login;