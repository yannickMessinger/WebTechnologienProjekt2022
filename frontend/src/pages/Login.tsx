import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('')
  async function handleSubmit(e: any) {
    e.preventDefault()
    const body = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('passwort') as HTMLInputElement).value,
    }

    try {
      const res = await fetch('http://localhost:4000/quiz/login', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        setErrorMsg("Erfolgreich eingeloggt! Viel Spaß c:");
        navigate('/');
        navigate(0);
      } else {
        setErrorMsg("Nutzer oder Passwort falsch");
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error)
    }
  }

  return (
    <>
    <h1>Login</h1>
    <h3>{errorMsg}</h3>
      <label>
          Nutzername
          <input id="username"></input>
      </label>
      <label>
          Passwort
          <input id="passwort" type="password"></input>
      </label>
      <button onClick={handleSubmit}>Login</button>
      <a href="http://localhost:4000/auth/google"><button>Login mit Google</button></a>
      <a href="http://localhost:3000/signup"><button>Registrieren</button></a>
</>
  );
};
