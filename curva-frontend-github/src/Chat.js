import React, { useRef, useState, useEffect } from "react";
import fire from "./fire";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import axios from "./axios";

function Chat({ user, messages, handleLogout }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  const userId = user.uid;
  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim().length > 0) {
      await axios.post("/messages/new", {
        userId: userId,
        avatar: user.photoURL,
        message: input,
        name: user.displayName,
        timestamp: new Date().toLocaleString(),
        received: true,
      });
    }
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_headerInfo">
          <h1>Salle de discussion</h1>
        </div>
      </div>
      <div className="chat_body">
        {messages &&
          messages.map((message) => (
            <>
              {" "}
              <div
                className={`${
                  message.userId == user.uid
                    ? "chat_message chat_message_sender"
                    : "chat_message"
                }`}
              >
                <Avatar
                  id="message_avatar"
                  title={message.name}
                  src={message.avatar}
                />
                <p>
                  {message.message}
                  <span>{message.timestamp}</span>
                </p>
              </div>{" "}
            </>
          ))}
        <div ref={messagesEndRef} />{" "}
      </div>
      <div className="chat_footer">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez quelque chose..."
            type="text"
          />
          <IconButton onClick={sendMessage} type="submit">
            {" "}
            <SendRoundedIcon id="chat_footer_icons" />{" "}
          </IconButton>
        </form>{" "}
      </div>{" "}
    </div>
  );
}
export default Chat;
