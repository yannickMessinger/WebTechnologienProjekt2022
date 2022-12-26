import React, { useState } from "react";
import { useChat } from "../../hooks/useChat";
import { ChatMsgList } from "./ChatMsgList";
import css from "./Chatstyle.module.css";

export const Chat = () => {
  const { sendChatMsg, msglist } = useChat();

  const [messageContent, setMessageContent] = useState("");

  const sendMessage = () => {
    sendChatMsg({ date: new Date(), content: messageContent });

    setMessageContent("");
  };

  return (
    <div>
      <h3>CHAT</h3>
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
      <div>
        <ul>
          {msglist.map((msg) => {
            return <li>{msg.content}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
