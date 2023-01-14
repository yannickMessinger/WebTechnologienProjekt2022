import React from "react";

export const Login = () => {
  return (
    <>
    <label>
        Nutzername
        <input id="username"></input>
    </label>
    <label>
        Passwort
        <input id="passwort" type="password"></input>
    </label>
    <button>Login</button>
    <button>Login mit Google</button>
    <button>Registrieren</button>
</>
  );
};
