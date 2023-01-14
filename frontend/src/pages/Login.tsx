import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  async function handleSubmit(e: any) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        navigate("/");
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
  }

  return (
    <>
    <h1>Login</h1>
      <label>
          Nutzername
          <input id="username"></input>
      </label>
      <label>
          Passwort
          <input id="passwort" type="password"></input>
      </label>
      <button>Login</button>
      <a href="http://localhost:4000/auth/google"><button>Login mit Google</button></a>
      <button>Registrieren</button>
</>
  );
};
