import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from './components/login';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
      
  )
}

export default App
