import React from "react";
import { Outlet } from "react-router-dom";
import Background from "../components/Background";

function AuthLayout() {
  return (
    <>
      <Outlet />
      <Background />
    </>
  );
}

export default AuthLayout;
