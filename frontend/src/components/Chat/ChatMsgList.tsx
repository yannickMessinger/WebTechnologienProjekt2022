import React, { useState } from 'react'
//import { ChatMessage, useChat } from '../../hooks/useChat'

//wie kann man das machen, das man aus useChat hook nur eine Instanz zurück bekommt und so die Liste auslagern kann?????



export const ChatMsgList = () => {

  //const {sendChatMsg, msglist} = useChat();
  const msglist:any = []
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
