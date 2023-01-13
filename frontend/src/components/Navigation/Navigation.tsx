import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Chat } from "../Chat/Chat";
import css from "./Navigation.module.css";

export const NavBar = () => {
  return (
    <nav className={css.navigation}>
      <ul>
        <NavLink to="/" name="Home" />
        <NavLink to="/quiz" name="Quiz spielen" />
        <NavLink to="/createQuestion" name="neue Frage erstellen" />
        <NavLink to="/login" name="Login" />
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
