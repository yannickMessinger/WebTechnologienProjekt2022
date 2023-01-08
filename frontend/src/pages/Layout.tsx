import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navigation/Navigation";

export const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}
