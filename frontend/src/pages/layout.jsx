import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";


const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="container-fluid bg-secondary min-vh-100">
        <div className="row">
          <div className="col-2 bg-white min-vh-100 p-0">
            <Sidebar />
          </div>
          <div className="col p-0 ">
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
