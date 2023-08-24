import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Admin from "./components/Admin";
import AdminStudent from "./components/Admin/Students";
import AdminTeacher from "./components/Admin/Teachers";
import Student from "./components/Student/Student";
import Teacher from "./components/Teacher/Teacher";
import RequireAuth from "./Auth/RequireAuth";
import "./index.css";
import jwtDecode from "jwt-decode";

let role: string = "";
function isLoggedIn() {
  try {
    let accessToken: string = sessionStorage.getItem("accessToken") || "";
    jwtDecode(accessToken);
    role = sessionStorage.getItem("role") || "";
    return true;
  } catch (error) {
    return false;
  }
}

console.log(isLoggedIn());
function App() {
  return (
    <div className="h-[100%]">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/admin/dashboard"
          element={isLoggedIn() ? <Admin /> : <Login />}
        ></Route>
        <Route
          path="/student/dashboard"
          element={isLoggedIn() ? <Student /> : <Login />}
        ></Route>
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
