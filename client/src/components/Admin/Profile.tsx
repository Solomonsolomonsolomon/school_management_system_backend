import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { PropsWithChildren, ReactNode } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let term = React.useRef<HTMLParagraphElement>(null);
  let year = React.useRef<HTMLParagraphElement>(null);
  React.useEffect(() => {
    let controller = new AbortController();
    currentTerm();

    async function currentTerm() {
      try {
        let CurrTerm = await axios.get("/term/get/current", {
          signal: controller.signal,
        });
        
        term.current
          ? (term.current.textContent = `current term:${CurrTerm.data?.currentTerm?.name}`)
          : "";
      } catch (error) {
        console.error(error);
      }
    }
    return () => {
      controller.abort();
    };
  });
  React.useEffect(() => {
    let controller = new AbortController();
    academicYear();
    async function academicYear() {
      let currentYear = await axios.get("/year/get/current", {
        signal: controller.signal,
      });
      let current = year.current;
      console.log(currentYear?.data?.current?.name);
      current
        ? (current.textContent = `current academic Year:${currentYear?.data?.current?.name}`)
        : "";
    }
    return () => {
      controller.abort();
    };
  }, []);
  let Navigate = useNavigate();
  const getUserData = (user: any) => {
    const data = sessionStorage.getItem(user);
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  };

  const user = getUserData("user");

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    // location.href='/'
    Navigate("/", { replace: true });
  };

  const toggle = () => {
    const profile = document.getElementById("profile");
    profile?.classList.toggle("hidden");
    console.log(profile);
  };

  return (
    <section className="bg-sky-300 shadow-lg  p-5 w-[100%] border border-black">
      <div className=" flex justify-end gap-2 cursor-pointer" onClick={toggle}>
        <section>
          <h1 className="text-xl text-white font-bold">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.role}</p>
          <p ref={term}>current Term:not set</p>
          <p ref={year}>current Academic Year:not set</p>
        </section>
        <FontAwesomeIcon icon={faUser} size="2xl" className="mt-3 text-white" />
      </div>
      <div
        id="profile"
        className="absolute hidden transition-opacity duration-500  left-[60%] p-5 shadow-lg w-[25%] z-20 bg-black"
      >
        <ul className="grid gap-3  justify-center m-0 p-0">
          <li>
            <FontAwesomeIcon icon={faUser} className="mt-3 mr-2 text-sky-300" />
            <span className="text-xl text-sky-300 font-bold">Profile</span>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faGear}
              className="mt-3  mr-2 text-sky-300"
            />
            <span className="text-xl text-sky-300  text-white font-bold">
              Settings
            </span>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faUserPlus}
              className="mt-3  mr-2 text-sky-300"
            />
            <span className="text-xl text-sky-300  text-white font-bold">
              Add Admin
            </span>
          </li>
          <li>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={logout}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
