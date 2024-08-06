import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login';
import Layout from './components/layout';
import Penggunaan from './pages/penggunaan';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/layout" element={<Layout/>} />
          <Route path="/penggunaan" element={<Penggunaan/>} />
        </Routes>
      </BrowserRouter>
    </div>
      
  )
}

export default App
