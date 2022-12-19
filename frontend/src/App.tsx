import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSocket} from './hooks/useSocket';
import io, {Socket} from 'socket.io-client';


function App() {
  
  const url = 'ws://localhost:4000'
  const socket = io(url)
  socket.connect();
  
  

  const sendMessage = () => {
   console.log("send"); 
  socket.emit("send_message", {payload:"test"});
    
  }

  return (
    <div className="App">
      <h2>CHAT</h2>
      <input placeholder="message"></input>
      <button onClick={() => {sendMessage()}}>send message</button>
    </div>
  );
}

export default App;
