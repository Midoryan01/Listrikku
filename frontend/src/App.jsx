import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from './components/login';
import Layout from './components/layout';
import SignUp from './components/signup';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/layout" element={<Layout/>} />
        </Routes>
      </BrowserRouter>
    </div>
      
  )
}

export default App
