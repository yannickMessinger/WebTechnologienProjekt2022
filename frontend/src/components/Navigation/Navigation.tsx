import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useUser, useUsername } from "../../hooks/useUser";
import { Chat } from "../Chat/Chat";
import css from "./Navigation.module.css";

export const NavBar = () => {
  const nutzer = useUsername();
  const logout = () => {
    fetch('http://localhost:4000/quiz/logout', {credentials: 'include'});
  };
  let nutzerInfo = nutzer ? <h3>Eingeloggter Nutzer: {nutzer.username}</h3>: "";
  let logButton = nutzer ? <button className={css.button} onClick={logout}>Logout</button> : <NavLink to="/login" name="Login" />
  return (
    <nav className={css.navigation}>
      <ul>
        <NavLink to="/" name="Home" />
        <NavLink to="/quiz" name="Quiz spielen" />
        <NavLink to="/createQuestion" name="neue Frage erstellen" />
        {logButton}
        {nutzerInfo}
      </ul>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  name: string;
}

const NavLink = ({ to, name, ...props }: NavLinkProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link className={css.link} to={to} {...props}>
        <button className={css.button}>{name}</button>
      </Link>
    </li>
  );
};
