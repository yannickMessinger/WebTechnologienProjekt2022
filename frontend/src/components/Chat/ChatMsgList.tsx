import { ChatMessage } from "../../hooks/useChat";
import css from "./Chatstyle.module.css";
//wie kann man das machen, das man aus useChat hook nur eine Instanz zurück bekommt und so die Liste auslagern kann?????
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
                  paddingBottom: "1em"
                }}
              >
                {username !== msg.username && (
                  <div style={{height:'50px', width:'50px', marginRight:'0.5em', border:'2px solid lightblue', borderRadius: 25, textAlign:'center', fontSize:'18pt', paddingTop: 5}}>
                    {msg.username.slice(0,2).toUpperCase()}
                  </div>
                )}
                <div
                  style={{
                    backgroundColor:
                      username === msg.username ? "green" : "gray",
                    color: username === msg.username ? "white" : "black",
                    padding: "1em",
                    borderRadius: "1em",
                    maxWidth: "60%",
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
