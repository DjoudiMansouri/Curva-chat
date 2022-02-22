import React, { useState, useEffect } from "react";
import fire from "./fire";
import Login from "./login";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Profile from "./profil.js";
import Pusher from "pusher-js";
import axios from "./axios";
import logo from "./img/Curva-Chat.png";

function App() {
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  const { default: fire } = require("./fire");
  const [user, setUser] = useState("");
  const [nickName, setNickName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = (e) => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-nor-found":
            setEmailError(
              (err.message =
                "Cette adresse e-mail est invalide, indisponible ou introuvable")
            );
            break;
          case "auth/wrong-password":
            setPasswordError((err.message = "Mot de passe incorrect"));
            break;
        }
      });
    e.preventDefault();
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-used":
          case "auth/invalid-email":
            setEmailError((err.message = "E-mail invalide ou déjà utilisée"));
            break;
          case "auth/weak-password":
            setPasswordError((err.message = "Mot de passe trop faible"));
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        setNickName(user.displayName);
        setProfilePicture(user.photoURL);
        setConnected(true);
        if (user.displayName === null) {
          setNickName(user.email);
          setShowProfile(true);
        }
      } else {
        setUser("");
        setConnected(false);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("c984ba905ddb2e8ecace", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (NewMessage) => {
      setMessages([...messages, NewMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <nav>
        <a href="">
          <img
            className="logo"
            src={logo}
            alt="Curva Chat"
            title="Curva Chat"
          />
        </a>
        <h2>
          {" "}
          <span> BIENVENUE SUR CURVA CHAT </span>{" "}
        </h2>
        {connected ? (
          <button className="deconnection" onClick={handleLogout}>
            Déconnexion
          </button>
        ) : (
          <button className="co-useless">Connexion</button>
        )}
      </nav>
      {connected ? (
        <>
          {" "}
          <div className="app_body">
            <Sidebar
              showProfile={showProfile}
              setShowProfile={setShowProfile}
              user={user}
              nickName={nickName}
              profilePicture={profilePicture}
            />
            {showProfile ? (
              <Profile
                setShowProfile={setShowProfile}
                user={user}
                nickName={nickName}
                setNickName={setNickName}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
              />
            ) : (
              <Chat
                user={user}
                messages={messages}
                handleLogout={handleLogout}
              />
            )}
          </div>{" "}
        </>
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
}

export default App;
