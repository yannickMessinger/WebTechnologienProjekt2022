import React, { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export interface ChatMessage {
  username: string;
  content: string;
}

export const useChat = () => {
  const socket = useSocket("ws://localhost:4000", {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });

  const [msglist, setMsglist] = useState(Array<ChatMessage>);
  

  
  
  useEffect(() => {
    if(!socket.connected){
    socket.connect();
    }
  }, []);
 

  socket.on("connect", () => {
    console.log(`connected to backend with id: ${socket.id}`);
  });

  socket.on("update_category_backend", (message) => {
    console.log(`new category from backend: ${message.category}`);
  });

  socket.on("chat_message_backend", (message) => {
    console.log(
      `Message an alle: Username${message.username} Msg: ${message.payload}`
    );
    setMsglist([
      ...msglist,
      { username: message.username, content: message.payload },
    ]);
    console.log(msglist);
  });

  function sendChatMsg(msg: ChatMessage) {
    socket.emit("chat_message_frontend", {
      username: msg.username,
      payload: msg.content
    });
  }


  function sendCategoryUpdate(category:string){
    socket.emit("update_category_frontend", {
      category:category
    });
  }

  return {
    socket,
    sendCategoryUpdate,
    sendChatMsg,
    msglist,
  };
};
