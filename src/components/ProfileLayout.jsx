import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";

function Layout() {
  return (
    <div className="site-wrapper">
      <Profile />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
