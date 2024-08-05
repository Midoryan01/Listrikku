import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nomorKwh, setNomorKwh] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [idTarif, setIdTarif] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const tarifList = [
    { id_tarif: 1, daya: 900, tarifperkwh: 400 },
    { id_tarif: 2, daya: 1300, tarifperkwh: 600 },
    { id_tarif: 3, daya: 3500, tarifperkwh: 1500 },
  ];

  const validateNomorKwh = (nomorKwh) => {
    const nomorKwhPattern = /^[0-9]+$/;
    return nomorKwh.match(nomorKwhPattern);
  };

  const register = (e) => {
    e.preventDefault();
    if (!validateNomorKwh(nomorKwh)) {
      setRegisterStatus("Nomor KWH harus berupa angka");
      setSuccessMessage("");
      return;
    }

    axios
      .post("http://localhost:5000/pelanggan", {
        username: username,
        password: password,
        nomor_kwh: nomorKwh,
        nama_pelanggan: namaPelanggan,
        alamat: alamat,
        id_tarif: idTarif,
      })
      .then((response) => {
        if (response.data.msg) {
          setRegisterStatus(response.data.msg);
          navigate("/");
        } 
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.msg) {
          setRegisterStatus(error.response.data.msg);
  }});
  };

  let imgs = [];

  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={register}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Create Your Account</p>
              </div>
              {/* Display success or error message */}
              <h1
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  marginTop: "20px",
                  color: successMessage ? "green" : "red", // Green for success, red for error
                }}
              >
                {successMessage || registerStatus}
              </h1>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="namaPelanggan">Name</label>
                <input
                  type="text"
                  id="namaPelanggan"
                  className="form-control form-control-lg"
                  placeholder="Enter your Name"
                  onChange={(e) => setNamaPelanggan(e.target.value)}
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Enter your Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="nomorKwh">Nomor KWH</label>
                <input
                  type="text"
                  id="nomorKwh"
                  className="form-control form-control-lg"
                  placeholder="Enter your Nomor KWH"
                  onChange={(e) => setNomorKwh(e.target.value)}
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="alamat">Alamat</label>
                <input
                  type="text"
                  id="alamat"
                  className="form-control form-control-lg"
                  placeholder="Enter your Alamat"
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="idTarif">ID Tarif</label>
                <select
                  id="idTarif"
                  className="form-select form-control-lg"
                  onChange={(e) => setIdTarif(e.target.value)}
                  required
                >
                  <option value="">Select Tarif</option>
                  {tarifList.map((tarif) => (
                    <option key={tarif.id_tarif} value={tarif.id_tarif}>
                      ID {tarif.id_tarif} - Daya {tarif.daya} - Rp.
                      {tarif.tarifperkwh} /kWh
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign Up
                </button>
                <p className="small fw-bold mt-4 pt-2 mb-1">
                  Already have an account?{" "}
                  <a href="/">Login</a>
                </p>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignUp;
