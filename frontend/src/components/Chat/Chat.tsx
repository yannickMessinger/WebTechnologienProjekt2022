import React, { useState } from "react";
import { useChat } from "../../hooks/useChat";
import { ChatMsgList } from "./ChatMsgList";
import css from "./Chatstyle.module.css";
import { useUsername } from "../../hooks/useUser";

export const Chat = () => {
  const nutzer = useUsername();
  const { sendChatMsg, msglist } = useChat();
  const [user, setUser] = useState({ username: nutzer.username, chatContent: "" });
  const [showSetUserButton, setshowSetUserButton] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [messageContent, setMessageContent] = useState("");
  const sendMessage = () => {
    sendChatMsg({ username: nutzer.username, content: messageContent });

    setMessageContent("");
  };

  const toggleDisp = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      <h4>Chatte mit anderen Spielern:</h4>
      <div className={css.chatWindowOuterWrapper}>
        <button
          className="css.button"
          onClick={() => {
            toggleDisp();
          }}
        >
          {showChat ? "\u25B2" : "\u25BC"}
        </button>
        {showChat && (
          <div className={css.chatWindowWrapper}>
            <div className={css.header}>
              <h3>CHAT</h3>
              <h4>Username: {user.username}</h4>

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
                    className={css.chatbutton}
                    onClick={() => {
                      setshowSetUserButton(!showSetUserButton);
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
                  className={css.chatbutton}
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
                <p>
                  <b>Bitte Username eingeben!</b>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
