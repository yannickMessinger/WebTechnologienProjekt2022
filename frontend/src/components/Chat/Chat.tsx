import React, { useState } from "react";
import { useChat } from "../../hooks/useChat";
import { ChatMsgList } from "./ChatMsgList";
import css from "./Chatstyle.module.css";

export const Chat = () => {
  const { sendChatMsg, msglist } = useChat();
  const [user, setUser] = useState({ username: "", chatContent: "" });
  const [showSetUserButton, setshowSetUserButton] = useState(true);

  const [messageContent, setMessageContent] = useState("");
  //const user {}... useState
  const sendMessage = () => {
    sendChatMsg({ username: user.username, content: messageContent });

    setMessageContent("");
  };

  return (
    <div className={css.chatWindowWrapper}>
      <div className={css.header}>
        <h3>CHAT</h3>
        <h4>Username:{user.username}</h4>

        {showSetUserButton ? (
          <div>
            <input
              placeholder="Username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            ></input>
            <button
              onClick={() => {
                setshowSetUserButton(!showSetUserButton)
              }}
            >
              set Username
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <ChatMsgList msglist={msglist} username={user.username} />

      {user.username !== "" ? (
        <div className={css.footer}>
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
        </div>
      ) : (
        <div className={css.footer}>
          <p>Bitte Username eingebe!!</p>
        </div>
      )}
    </div>
  );
};
