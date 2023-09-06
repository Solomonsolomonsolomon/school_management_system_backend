import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminStudent from "./components/Admin/Students";
import AdminTeacher from "./components/Admin/Teachers";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import RequireAuth from "./Auth/RequireAuth";
import "./index.css";
import axios from "./api/axios";
import jwtDecode from "jwt-decode";

let role: string = "";
function isLoggedIn(userRole: string = "") {
  try {
    let accessToken: string = sessionStorage.getItem("accessToken") || "";
    let c: any = jwtDecode(accessToken);
    if (Date.now() >= c.exp * 1000) throw new Error("");
    role = sessionStorage.getItem("role") || "";
    if (userRole !== "" && userRole !== role) throw new Error("failed");
    return true;
  } catch (error) {
    return false;
  }
}

function App() {
  return (
    <div className="h-[100%]">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin/dashboard"
          element={isLoggedIn("admin") ? <Admin /> : <Login />}
        ></Route>
        <Route
          path="/student/dashboard"
          element={isLoggedIn("student") ? <Student /> : <Login />}
        ></Route>
        <Route
          path="/teacher/dashboard"
          element={isLoggedIn("teacher") ? <Teacher /> : <Login />}
        ></Route>
        {/* catch all */}
        <Route path="*" element={<Login />}></Route>
      </Routes>
      {/* <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="forgotPassword" element={<Login />} /> */}
      {/* protected routes */}
      {/* <Route element={<RequireAuth />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="admin/student" element={<AdminStudent />} />
          <Route path="admin/teacher" element={<AdminTeacher />} />
          <Route path="student" element={<Student />} />
          <Route path="teacher" element={<Teacher />} />
        </Route> */}

      {/* {/* catch all */}
      {/* <Route path="*" element={<h1>Not Found</h1>} />
        </Route> */}
      {/* </Routes> */}
    </div>
  );
}
export { isLoggedIn };
export default App;
