import React from "react";
import fire from "./fire";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
const Sidebar = ({
  user,
  showProfile,
  setShowProfile,
  nickName,
  profilePicture,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton onClick={() => setShowProfile(!showProfile)}>
          {" "}
          <Avatar id="sidebar_my_avatar" src={profilePicture} />{" "}
        </IconButton>
        <p>
          <h3>{nickName}</h3>
          <a className="status" href="">
            ⬤ Connecté
          </a>
        </p>
        <div className="sidebar_headerRight"></div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat />
      </div>
    </div>
  );
};
export default Sidebar;
