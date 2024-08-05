import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut, reset } from "../features/authSlice";
import "./style.css";
import LogoutModal from "./logoutModal";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logOut()).then(() => {
      dispatch(reset());
      navigate('/');
    });
  };

  return (
    <div className="bg-white sidebar p-3">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">Listriku</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush ">
        <NavLink
          to="/dashboard"
          className="list-group-item py-2 "
          activeclassname="active"
          style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        >
          <i className="bi bi-speedometer2 fs-4 me-3"></i>
          <span className="fs-5">Dashboard</span>
        </NavLink>
        <NavLink
          to="/penggunaan"
          className="list-group-item py-2"
          activeclassname="active"
        >
          <i className="bi bi-graph-up fs-5 me-3"></i>
          <span className="fs-5">Penggunaan</span>
        </NavLink>
        <NavLink
          to="/tagihan"
          className="list-group-item py-2"
          activeclassname="active"
        >
          <i className="bi bi-table fs-5 me-3"></i>
          <span className="fs-5">Tagihan</span>
        </NavLink>
        <NavLink
          to="/pembayaran"
          className="list-group-item py-2"
          activeclassname="active"
        >
          <i className="bi bi-clipboard-data fs-5 me-3"></i>
          <span className="fs-5">Pembayaran</span>
        </NavLink>
        <button
          className="list-group-item py-2 btn btn-danger "
          style={{ borderRadius: "15px" }}
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-power fs-5 me-3"></i>
          <span className="fs-5">Logout</span>
        </button>
      </div>
      <LogoutModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
