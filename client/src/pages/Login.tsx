import React, { useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { AxiosLoginInstance } from "../api/axios";
import { Link } from "react-router-dom";
const LOGIN_URL = "/auth";
import svg1 from "../assets/undraw_before_dawn_re_hp4m.svg";
import { isLoggedIn } from "../App";

export default function Login() {
  interface IDetails {
    email?: string;
    password?: string;
    role?: string;
  }
  let [details, setDetails] = React.useState<IDetails>({
    email: "",
    password: "",
    role: "",
  });
  let [clicked, setClicked] = React.useState(0); //clicked is chained to login button
  let msgRef = useRef<HTMLParagraphElement>(null);
  let Navigate = useNavigate();
  let location = useLocation();
  function handleInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setDetails((prev) => {
      let { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }
  React.useEffect(() => {
    let controller = new AbortController();
    login();
    async function login() {
      try {
        let res = await AxiosLoginInstance.post(
          `${LOGIN_URL}/signin`,
          JSON.stringify({ ...details }),
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let userData = res.data.user;
        sessionStorage.setItem("accessToken", res.data?.accessToken);
        sessionStorage.setItem("role", details.role || "");
        sessionStorage.setItem("user", JSON.stringify(userData));
        msgRef.current ? (msgRef.current.textContent = "successful_login") : "";
        Navigate(`/${details.role}/dashboard/`, {
          replace: true,
          state: location.pathname,
        });
        // let path = location.pathname;
        // if (path !== "/" && path !== "/login") window.location.reload();
        window.location.href = `/${details.role}/dashboard`;
      } catch (error: any) {
        //go back to select on fail
        if (error.name == "AbortError" || error.name == "CanceledError") return;
        console.log(error);
        setDetails((prev) => {
          return { ...prev, role: "" };
        });
        msgRef.current && clicked
          ? (msgRef.current.textContent =
              error.response?.data?.msg || error.message)
          : "";
      }
    }
    return () => {
      controller.abort();
    };
  }, [clicked]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(details);
  }
  //if already logged in navigate
  React.useEffect(() => {
    let path = location.pathname;
    if (path !== "/" && path !== "/login") {

      window.location.href = "/";
    }
    if (isLoggedIn()) {
      let role: string = sessionStorage.getItem("role") || "";
      if (role) {
        Navigate(`/${role}/dashboard`, {
          replace: true,
          state: location.pathname,
        });
      } else {
        console.log("😒");
      }
      //   if (role !== "") {
      //     React.useEffect(() => {
      //       Navigate(`/${role}/dashboard`, {
      //         replace: true,
      //         state: location.pathname,
      //       });
      //     }, []);
      //   }
      // } else {
      //   React.useEffect(() => {
      //     console.log("trying to prevent,render more hooks");
      //   }, []);
    }
  }, []);

  return (
    <div className="h-full overflow-x-hidden overflow-y-hidden">
      <h1 className="text-center font-bold">
        SOLACE School Management Systems.Login to continue
      </h1>
      <div className="flex justify-items-center place-content-center">
        <img src={svg1} className="absolute  z-[-100] h-[97vh]" alt="" />
      </div>

      <div className=" grid justify-center justify-items-center h-full grid-cols-1">
        <p></p>
        <form
          onSubmit={handleSubmit}
          className="grid g dark:text-gray-900ap-1 border border-black bg-white h-fit p-6 rounded "
        >
          <p
            ref={msgRef}
            className={`w-[10 dark:text-gray-9000%] text-center ${
              msgRef.current?.textContent === "successful_login"
                ? "text-green-800"
                : "text-[red]"
            }`}
          ></p>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={details.email}
            onChange={handleInput}
            className="border dark:text-gray-900 border-black border-t-0 border-b-2 border-l-0 border-r-0 rounded "
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={details.password}
            onChange={handleInput}
            className="border dark:text-gray-900 border-black border-t-0 border-b-2 border-l-0 border-r-0 rounded"
          />
          <select
            name="role"
            id=""
            value={details.role}
            required
            onChange={handleInput}
            className="border dark:text-gray-900 border-black border-t-0 border-b-2 border-l-0 border-r-0 rounded"
          >
            <option value="">SELECT</option>
            <option value="admin">admin</option>
            <option value="student">student</option>
            <option value="teacher">teacher</option>
          </select>
         <Link to="forgot-password" className="text-blue-800">Forgot password?</Link>
          <button
            onClick={() => {
              setClicked(clicked + 1);
            }}
            className="bg-gray-900 p-2 rounded text-white"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
// import { useRef, useState, useEffect } from "react";
// import { useNavigate, useLocation, redirect } from "react-router-dom";
// import axios from "../api/axios";

// const LOGIN_URL = "/auth";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from.pathname || "/";

//   const emailRef = useRef<HTMLInputElement>(null);
//   const roleRef = useRef<HTMLSelectElement>(null);
//   const msgRef = useRef<HTMLParagraphElement>(null);

//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const getUserData = (user) => {
//       const data = sessionStorage.getItem(user);
//       console.log(data);
//       if (!data) {
//         return {};
//       }
//       return JSON.parse(data);
//     };
//     const userData = getUserData("user");
//     console.log(userData);
//     if (accessToken !== null && userData.role !== undefined) {
//       navigate(`/${userData.role}`, { replace: true });
//     } else {
//       return;
//     }
//   });

//   const Auth = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         `${LOGIN_URL}/signin`,
//         JSON.stringify({
//           email,
//           password,
//           role,
//         }),
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: false,
//         }
//       );
//       console.log(res.data);
//       console.log(from);
//       if (res.data.status === 200) {
//         const accessToken = res.data.accessToken;
//         console.log(accessToken);
//         localStorage.setItem("accessToken", accessToken);
//         sessionStorage.setItem("user", JSON.stringify(res.data.user));
//         navigate(`/${role}`, { replace: true });
//         console.log(accessToken);
//       }

//       setEmail("");
//       setPassword("");
//       setRole("");
//     } catch (err) {
//       // console.log(err.response)
//       if (err.response.status == 401) {
//         setError("email or password is incorrect");
//       } else if (err.response.status === 500) {
//         setError("Server Error");
//       } else if (err.response.status === 400) {
//         setError("Invalid Request");
//       } else {
//         setError("Login Failed");
//       }
//     }
//   };

//   return (
//     <div className=" w-full bg-slate-200 h-screen m-0 pt-[20%] md:pt-[5%] lg:pt-[5%]">
//       <header>
//         <h1 className=" text-3xl md:text-4xl lg:text-4xl text-center mb-10">
//           School Management Portal
//         </h1>
//       </header>
//       <div className="container bg-white lg:w-[40%] w-[90%] md:w-[60%] flex flex-col m-auto rounded-2xl shadow-white p-5 md:p-10 lg:p-10 ">
//         <h1 className="text-2xl text-center">Login To Your Account</h1>
//         <div className="m-auto mt-10 sm:w-[90%] w-[80%]">
//           <p
//             className={error  dark:text-gray-900? "text-red-700 text-center block" : "none"}
//             ref={msgRef}
//             aria-live="assertive"
//           >
//             {error}
//           </p>
//           <form className="flex flex-col gap-5" onSubmit={Auth}>
//             <section>
//               <select
//                 name="roles"
//                 id="roles"
//                 className="w-full dark:text-gray-900 text-xl pointer"
//                 ref={roleRef}
//                 onChange={(e) => setRole(e.target.value)}
//                 required
//               >
//                 <option value="">Select Role</option>
//                 <option value="admin">Admin</option>
//                 <option value="teacher">Teacher</option>
//                 <option value="student">Student</option>
//               </select>
//             </section>
//             <section className="flex flex-col">
//               <label htmlFor="email" className="text-xl">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter Staff Portal"
//                 required
//                 ref={emailRef}
//                 className="w-100% dark:text-gray-900 bg-slate-200 p-3 text-xl rounded-xl"
//                 autoComplete="on"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </section>
//             <section className="flex flex-col">
//               <label htmlFor="password" className="text-xl">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter Password"
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 className="w-100% dark:text-gray-900 bg-slate-200 p-3 text-xl rounded-xl"
//               />
//             </section>
//             <a href="#" className="text-xl text-right text-blue-700 underline">
//               Forgot Passsword?
//             </a>
//             <button className="block w-full bg-blue-700 p-3 text-white text-xl">
//               <span>Login</span>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
