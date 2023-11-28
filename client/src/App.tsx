import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
//import Admin from "./pages/Admin";
//import Student from "./pages/Student";
//import Teacher from "./pages/Teacher";
import "./index.css";
import jwtDecode from "jwt-decode";
//import ForgotPassword from "./components/ForgotPassword";
//import ChangePassword from "./components/ChangePassword";
import AppProvider from "./context/AppProvider";
//import Messages from "./components/Messages";
import Loading from "./components/Loading";

const Admin = React.lazy(() => import("./pages/Admin"));
const ForgotPassword = React.lazy(() => import("./components/ForgotPassword"));
const ChangePassword = React.lazy(() => import("./components/ChangePassword"));
const Student = React.lazy(() => import("./pages/Student"));
const Teacher = React.lazy(() => import("./pages/Teacher"));
const Messages = React.lazy(() => import("./components/Messages"));
let role: string = "";

function isLoggedIn(userRole: string = "") {
  try {
    let accessToken: string = sessionStorage.getItem("accessToken") || "";
    let c: any = jwtDecode(accessToken);
    if (Date.now() >= c.exp * 1000) throw new Error("token expired");
    role = sessionStorage.getItem("role") || "";
    if (userRole !== "" && userRole !== role) throw new Error("failed");
    return true;
  } catch (error) {
    return false;
  }
}

function App() {
  return (
    <AppProvider>
      <div className="h-[100%] dark:bg-gray-900  dark:text-white font-montserrat">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin/dashboard"
            element={
              isLoggedIn("admin") ? (
                <Suspense fallback={<Loading />}>
                  <Admin />{" "}
                </Suspense>
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/student/dashboard"
            element={
              isLoggedIn("student") ? (
                <Suspense fallback={<Loading />}>
                  <Student />
                </Suspense>
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/teacher/dashboard"
            element={
              isLoggedIn("teacher") ? (
                <Suspense fallback={<Loading />}>
                  <Teacher />
                </Suspense>
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Loading />}>
                <ForgotPassword />
              </Suspense>
            }
          ></Route>
          <Route
            path="/change-password"
            element={
              <Suspense fallback={<Loading />}>
                <ChangePassword />
              </Suspense>
            }
          />
          <Route
            path="/messages"
            element={isLoggedIn() ? <Messages /> : <Login />}
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
    </AppProvider>
  );
}
export { isLoggedIn };
export default App;
