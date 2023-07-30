import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Admin from "./components/Admin";
import AdminStudent from "./components/Admin/Students"
import AdminTeacher from "./components/Admin/Teachers"
import Student from "./components/Student/Student";
import Teacher from "./components/Teacher/Teacher";
import RequireAuth from "./Auth/RequireAuth";
import "./index.css"; 
 
function App() {
  return (
    <>
<<<<<<< HEAD

      <AuthProvider>
        <BrowserRouter>
          <div className="App"> 
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Admin" element={<Admin />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
=======
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */ }
        <Route path="login" element={<Login />} />
        {/* <Route path="forgotPassword" element={<Login />} /> */}

        {/* protected routes */ }
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="admin/student" element={<AdminStudent />} />
          <Route path="admin/teacher" element={<AdminTeacher />} />
          <Route path="student" element={<Student />} />
          <Route path="teacher" element={<Teacher />} />
        </Route>


        {/* catch all */ }
        <Route path="*" element={<h1>Not Found</h1>} />
        </Route>

      </Routes>
>>>>>>> 168aba8a14e75a2fd3e9a52f0e55d8e2fff69e95
    </>
  );
}

export default App;
