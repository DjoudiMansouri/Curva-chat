import React, { useState } from "react";
import "./App.js";
import fire from "./fire";
import "./profil.css";
import { Avatar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
const Profile = ({
  setShowProfile,
  user,
  nickName,
  setNickName,
  profilePicture,
  setProfilePicture,
}) => {
  const [showNameChange, setShowNameChange] = useState(false);
  const [showPictureChange, setShowPictureChange] = useState(false);
  return (
    <div className="profile_container">
      <div className="profile">
        <IconButton id="close_button" onClick={() => setShowProfile(false)}>
          {" "}
          <CloseIcon id="profile_button" />{" "}
        </IconButton>
        <label
          className="profile_label"
          onClick={() => setShowNameChange(!showNameChange)}
        >
          Désignez ou modifiez votre nom
        </label>
        {showNameChange || user.displayName == null ? (
          <NameChange
            user={user}
            nickName={nickName}
            setNickName={setNickName}
          />
        ) : null}
        <label
          className="profile_label"
          onClick={() => setShowPictureChange(!showPictureChange)}
        >
          Ajoutez l'URL de votre photo de profil
        </label>
        {showPictureChange ? (
          <PictureChange
            user={user}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
        ) : null}
      </div>{" "}
    </div>
  );
};
const NameChange = ({ user, nickName, setNickName }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const updateNickName = (e) => {
    e.preventDefault();
    if (input.trim().length > 0 && input.trim().length < 36) {
      user.updateProfile({ displayName: input });
      setNickName(input);
      setInput("");
      setError("");
    } else {
      setError(
        "Votre nom ne doit pas être vide et ne doit pas dépasser 36 caractères !"
      );
    }
  };
  return (
    <div className="profile_block">
      <form className="rename_form">
        <input
          className="rename_input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <IconButton onClick={updateNickName} type="submit">
          {" "}
          <EditIcon id="profile_button" />{" "}
        </IconButton>
      </form>{" "}
      <p className="error">{error}</p>{" "}
    </div>
  );
};
const PictureChange = ({ user, profilePicture, setProfilePicture }) => {
  const [input1, setInput1] = useState("");
  const [error1, setError1] = useState("");
  const updateProfilePicture = (e) => {
    e.preventDefault();
    if (input1.trim().length > 0) {
      user.updateProfile({ photoURL: input1 });
      setProfilePicture(input1);
      setInput1("");
      setError1("");
    } else {
      setError1("Veuillez rentrer une URL valide !");
    }
  };
  return (
    <div className="profile_block">
      <form className="rename_form">
        <input
          className="rename_input"
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        ></input>
        <IconButton>
          {" "}
          <EditIcon
            onClick={updateProfilePicture}
            id="profile_button"
            type="submit"
          />{" "}
        </IconButton>
      </form>
      <p className="error">{error1}</p>
    </div>
  );
};
export default Profile;
