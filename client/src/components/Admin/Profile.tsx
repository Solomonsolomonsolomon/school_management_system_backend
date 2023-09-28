import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import imgDefault from "./../../assets/undraw_real_time_sync_re_nky7.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
interface ITheme {
  header: string;
  headerText: string;
}
interface IThemeAndLogo {
  theme: ITheme;
  logo: string;
}
let schoolUrl = "/school";
const Profile = () => {
  let term = React.useRef<HTMLParagraphElement>(null);
  let year = React.useRef<HTMLParagraphElement>(null);
  let [themeandlogo, setthemeandlogo] = React.useState<IThemeAndLogo>({
    theme: {
      header: "#edf2f7",
      headerText: "#000000",
    },
    logo: "",
  });
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

      current
        ? (current.textContent = `current academic Year:${currentYear?.data?.current?.name}`)
        : "";
    }
    return () => {
      controller.abort();
    };
  }, []);
  //get themes and logo
  React.useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${schoolUrl}/logo/theme/get`);
        console.log(res);
        setthemeandlogo({
          logo: res.data?.logo,
          theme: {
            header: res.data?.themes?.header,
            headerText: res?.data?.themes?.headerText,
          },
        });
      } catch (error) {
        console.log(error);
      }
    })();
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
  };
  return (
    <section
      className="    border-b-2   p-5 mb-2 pr-3 pt-3  w-[100%]  rounded"
      style={{
        backgroundColor: themeandlogo.theme?.header || "#4a5568",
        color: themeandlogo.theme?.headerText || "#000000",
      }}
    >
      <img src={themeandlogo.logo || imgDefault} alt="" className="w-[3.4em]" />
      <div
        className=" flex   justify-center border-b-1 gap-2 cursor-pointer "
        onClick={toggle}
      >
        <section className="flex gap-5 flex-wrap-reverse justify-end">
          <h1 className="text-sm font-bold capitalize ">{user.name}</h1>
          {/* <p className="text-sm font-bold text-white">{user.role}</p>
           */}
          <h1 className="text-sm  ">
            <span className="capitalize font-xs opacity-[0.6]">school</span>:
            <span className="capitalize">{user.school}</span>
          </h1>
          <p className=" text-sm capitalize" ref={term}>
            current Term:not set
          </p>
          <p ref={year} className="text-sm capitalize">
            current Academic Year:not set
          </p>
        </section>
        <FontAwesomeIcon icon={faUser} size="2xl" className="mt-3 text-blue" />
      </div>
      <div
        id="profile"
        className="absolute hidden transition-opacity duration-500  left-[60%] p-6 shadow-lg w-fit =z-20 bg-gray-950"
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
            <span className="text-xl  text-white font-bold">Settings</span>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faUserPlus}
              className="mt-3  mr-2 text-sky-300"
            />
            <span className="text-xl   text-white font-bold">Add Admin</span>
          </li>
          <li>
            <div className="w-full">
              <Button buttontype={2} onClick={logout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="" />
                <span className="ml-2">Logout</span>
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
