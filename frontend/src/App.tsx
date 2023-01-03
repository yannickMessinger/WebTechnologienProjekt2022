import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chat } from './components/Chat/Chat';
import { Quiz } from './components/Quiz/Quiz';




function App() {
 
 
  return (
    <div className="App">
      <h3>ÄPP</h3>
      <Chat></Chat>
      <Quiz></Quiz>
    </div>
  );
}

export default App;
