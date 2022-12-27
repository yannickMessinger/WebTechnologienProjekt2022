import React, { useState } from "react";
import { useChat } from "../../hooks/useChat";
import { ChatMsgList } from "./ChatMsgList";
import css from "./Chatstyle.module.css";

export const Chat = () => {
  const { sendChatMsg,msglist } = useChat();
  const [user, setUser] = useState(
    {username:"Jeff", chatContent:""}
  );

  const [messageContent, setMessageContent] = useState("");
  //const user {}... useState
  const sendMessage = () => {
    sendChatMsg({ username: user.username, content: messageContent });

    setMessageContent("");
  };

  return (
    <div>
      <h3>CHAT</h3>
      <h4>Username:{user.username}</h4>

      <ChatMsgList msglist={msglist} username={user.username} />

      <input
        placeholder="message"
        value={messageContent}
        onChange={(e) => {
          setMessageContent(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        send message
      </button>

      <br></br>

      <input
        placeholder="Username"
        value={user.username}
        onChange={(e) => {
          setUser({...user, username:e.target.value});
        }}
      ></input>
      <button
        onClick={() => {
          console.log(user.username);
        }}
      >
        set Username
      </button>

      
    </div>
  );
};
