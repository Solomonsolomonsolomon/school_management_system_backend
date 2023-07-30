// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
                <Route  path="/" element={<Login/>} />
                <Route path="/Admin" element={<Admin/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>

    </>
  );
}

export default App;
