import { faLongArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import imgDefault from "./../../assets/undraw_real_time_sync_re_nky7.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
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
  const [confirmable, setConfirmable] = React.useState<boolean>(false);
  const [confirmModal, setConfirmModal] = React.useState<boolean>(false);
  // const [loading, setLoading] = React.useState<boolean>(false);
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
  const getUserData = (user: any) => {
    const data = sessionStorage.getItem(user);
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  };
  const user = getUserData("user");
  let Navigate = useNavigate();

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
  if (confirmModal)
    return (
      <ProfileModal
        confirmModal={setConfirmModal}
        confirmable={setConfirmable}
        term={term}
        year={year}
      />
    );
  function getInitialsFromString(inputString: string) {
    // Split the input string into words
    const words = inputString.split(" ");

    // Initialize an empty string to store the initials
    let initials = "";

    // Iterate through the words and extract the first letter of each word
    for (const word of words) {
      if (word.length > 0) {
        initials += word[0].toUpperCase(); // Convert the first letter to uppercase
      }
    }

    return initials;
  }
  return (
    <section
      className=" flex flex-wrap justify-between sm:my-10yy md:my-0 border-b-2  p-1  mb-1  pr-3 pt-2  w-[100%] lg:rounded-none  sm:rounded-none md:rounded-none"
      style={{
        backgroundColor: themeandlogo.theme?.header || "#4a5568",
        color: themeandlogo.theme?.headerText || "#000000",
      }}
    >
      <img src={themeandlogo.logo || imgDefault} alt="" className="w-[3.4em]" />

      <div className="lg:mr-10 md:mr-10 sm:mr-0 xl:mr-10">
        <button
          // className=" flex justify-end mt-14 md:mt-0 bg lg:mt-0 border-b-1 gap-2  dark:border-gray-400  px-5 bg-inherit rounded-full cursor-pointer shadow-2xl "
          onClick={() => {
            toggle();
          }}
        >
          {" "}
          <div className="mt-4 flex justify-end">
            <span className="flex">
              {" "}
              <p className="capitalize opacity-60 rounded-full bg-blue-600 text-white p-2">
                {/* {user?.name.substring(0, 5)}... */}
                {getInitialsFromString(user?.name)}
              </p>
            </span>
          </div>
          {/* <FontAwesomeIcon
            icon={faUser}
            size="lg"
            className=" text-blue p-2  rounded-xl mt-2 "
          /> */}
        </button>
      </div>

      <div
        id="profile"
        //className="absolute hidden transition-opacity duration-500  right-[14%] top-[15%] p-6 shadow-lg w-fit =z-20 bg-inherit"
        className="w-full hidden"
      >
        <ul className="grid gap-3  justify-center m-0 p-0">
          <li>
            <FontAwesomeIcon
              icon={faUser}
              className="mt-3 mr-2 font-bold hover:text-blue-800"
            />
            <span
              className="text-xl font-bold"
              onClick={() => {
                setConfirmModal(true);
              }}
            >
              Profile
            </span>
          </li>
          <li>
            <FontAwesomeIcon icon={faGear} className="mt-3  mr-2" />
            <span className="text-xl  font-bold">Settings</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faUserPlus} className="mt-3  mr-2" />
            <Link
              to="/change-password"
              className="text-xl    font-bold hover:text-blue-800"
            >
              Change Password
            </Link>
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

const ProfileModal: React.FC<{
  confirmable: React.SetStateAction<any>;
  confirmModal: React.SetStateAction<any>;
  term: any;
  year: any;
}> = ({ confirmable, confirmModal, term, year }) => {
  const getUserData = (user: any) => {
    const data = sessionStorage.getItem(user);
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  };
  const user = getUserData("user");

  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmable */}
      {/* const [confirmable,setConfirmable]=React.useState<boolean>(false);
    const [confirmModal,setConfirmModal]=React.useState<boolean>(false); */}

      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh]  ">
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-2xl h-fit box-border p-20">
          <h1 className="p-5 ">your profile details</h1>
          <section className="grid gap-5 flex-wrap-reverse justify-end">
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
            <p>
              <span>{user?.className ? "class:" : ""}</span>
              {user?.classNname}
            </p>
            <p>
              <span>{user?.formTeacher ? "FormTeacher:" : ""}</span>
              {user?.formTeacher}
            </p>
          </section>
          <span className="absolute left-2 top-2">
            <button
              className="bg-blue-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(true);
                confirmModal(false);
              }}
            >
              <FontAwesomeIcon icon={faLongArrowLeft}></FontAwesomeIcon>
            </button>
          </span>
          {/* <span className="absolute left-2">
            {" "}
            <button
              className="bg-red-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(false);
                confirmModal(false);
              }}
            >
              Cancel
            </button>
          </span> */}
        </div>
      </div>
    </>
  );
};
