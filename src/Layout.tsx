import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <div className="content">
      <Outlet />
      {children}
    </div>
  </>
);

export default Layout;
