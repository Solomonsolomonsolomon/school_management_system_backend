// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./index.css";

function App() {
    // useEffect(() => {
    //   let call = async () => {
    //     let res = await fetch("/v1/auth/signup");
    //     console.log(res);
    //     let json = await res.json();
    //     console.log(json);
    //   };
    //   call();
    // });
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
              <Route  path="/" element={<Login/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
