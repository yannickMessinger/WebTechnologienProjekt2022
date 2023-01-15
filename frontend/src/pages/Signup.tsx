import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('')
  async function handleSubmit(e: any) {
    e.preventDefault()
    const body = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('passwort') as HTMLInputElement).value,
    }

    try {
      const res = await fetch('http://localhost:4000/quiz/signup', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        navigate("/");
      } else {
        setErrorMsg("Nutzer existiert bereits");
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
    }
  }

  return (
    <>
    <h1>Registrieren</h1>
    <h3>{errorMsg}</h3>
      <label>
          Nutzername
          <input id="username"></input>
      </label>
      <label>
          Passwort
          <input id="passwort" type="password"></input>
      </label>
      <button onClick={handleSubmit}>Registrieren</button>
</>
  );
};
