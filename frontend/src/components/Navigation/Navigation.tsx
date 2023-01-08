import React, { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import css from "./Navigation.module.css";

export const NavBar = () => {
  return (
    <nav className={css.navigation}>
      <ul>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/quiz">Quiz</NavLink>
        <NavLink to="/createQuestion">create new question</NavLink>
        <NavLink to="/login">Login</NavLink>
      </ul>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink = ({ to, children, ...props }: NavLinkProps) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
