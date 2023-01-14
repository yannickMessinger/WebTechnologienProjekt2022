import { ChatMessage } from "../../hooks/useChat";
import css from "./Chatstyle.module.css";
interface ChatMessageLstProps {
  msglist: Array<ChatMessage>;
  username: string;
}

export const ChatMsgList = ({ msglist, username }: ChatMessageLstProps) => {
  return (
    <>
      <div className={css.chatlist}>
        <ul>
          {msglist.map((msg: ChatMessage) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    username === msg.username ? "flex-end" : "flex-start",
                  paddingBottom: "1em",
                }}
              >
                {username !== msg.username && (
                  <div
                    style={{
                      height: "30px",
                      width: "30px",
                      marginRight: "0.5em",
                      border: "2px solid lightblue",
                      borderRadius: 25,
                      textAlign: "center",
                      fontSize: "18pt",
                      padding: 5,
                    }}
                  >
                    {msg.username.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div
                  style={{
                    backgroundColor:
                      username === msg.username ? "green" : "gray",
                    color: username === msg.username ? "white" : "black",
                    padding: "0.5em",
                    borderRadius: "1em",
                    maxWidth: "60%",
                    marginRight: 10,
                  }}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
