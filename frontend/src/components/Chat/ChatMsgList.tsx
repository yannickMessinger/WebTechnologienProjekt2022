import {ChatMessage} from '../../hooks/useChat'

//wie kann man das machen, das man aus useChat hook nur eine Instanz zurück bekommt und so die Liste auslagern kann?????
interface ChatMessageLstProps{
  msglist : Array<ChatMessage>
}


export const ChatMsgList = ({msglist}:ChatMessageLstProps) => {
  return (
    <>
     <div>
        <ul>
        {msglist.map((msg:any) =>{
          return <li>{msg.content}</li>
        })}
      </ul>
      </div>
    </>
  )
}
