import { Link } from "react-router-dom";
import axios from "./../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBus,
  faCrown,
  faGear,
  faHouseMedical,
  faMessage,
  faMoneyBillAlt,
  faNetworkWired,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

import {
  faUserPlus,
  faUserFriends,
  faSchoolCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";
import React from "react";
interface ProfileProps {
  setView: any;
  isOpen?: any;
}
const schoolUrl = "/school";

const Navbar: React.FC<ProfileProps> = ({ setView, isOpen }: ProfileProps) => {
  let parsed: any = {
    school: "",
  };
  let user = sessionStorage.getItem("user");
  if (user) {
    parsed = JSON.parse(user);
  }
  let school: string = parsed.school;

  const [colors, setColors] = React.useState<any>({
    sideBar: "000000",
    sideBarText: "#ffffff",
  });
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    async function getColor() {
      try {
        const res = await axios.get(`${schoolUrl}/theme/current`);
        const fetchedColors = res.data?.themes;
        if (fetchedColors) {
          setColors({
            ...fetchedColors,
          });
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        setLoading(false);
      }
    }

    getColor();
  }, []);

  function setComponent(component: any): any {
    setView(component);
    isOpen ? isOpen(false) : "";
  }
  if (loading) return <Loading />;
  return (
    <div className="px-0 lg:py-0 scrollbar-hide sm:py-1 md:py-0  bg-gray-50 sm:block lg:flex  md:flex justify-center">
      <nav
        style={{
          backgroundColor: `${colors.sideBar}`,
          color: `${colors.sideBarText}`,
        }}
        className="bg-gray-700  shadow-2xl scrollbar-hide h-screen py-0 relative overflow-y-auto p-2 sm:w-full md:w-fit lg:w-fit xl:w-full lg:rounded-none md:rounded-none  sm:rounded-none l"
      >
        <p className="text-md text-2xl relative border-y-0 border-x-0 border-b-2 shadow-sm p-0 m-0 w-full capitalize ">
          {school.split("_").join(" ")}
        </p>
        {/* <h1 className="text-center text-3xl">ADMIN</h1> */}
        <section className="my-3  ">
          <ul className="grid gap-4 text-sm">
            {/* dashboard */}
            <li
              onClick={() => {
                setComponent("subadmin");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 px-5"
            >
              <div
                onClick={() => {
                  setComponent("subadmin");
                }}
              >
                <FontAwesomeIcon
                  icon={faHouseMedical}
                  size="lg"
                  className="mr-2"
                />
                <span className="md:hidden lg:inline xl:inline sm:inline text-md ">
                  Dashboard
                </span>
              </div>
            </li>
            {/* <li className="mr-10">
            <FontAwesomeIcon
              icon={faGraduationCap}
              size="2xl"
              className="mr-2"
            />
            <span className="md:hidden lg:inline xl:inline sm:inline">Students</span>
          </li> */}
            {/* add students */}
            <li
              onClick={() => {
                setComponent("addstudent");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faUserPlus} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1 text-md">
                {" "}
                Add student
              </span>
            </li>
            {/* add admin */}
            <li
              onClick={() => {
                setComponent("addadmin");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faUserPlus} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1 text-md">
                {" "}
                Add Admin
              </span>
            </li>
            {/* all admin */}
            <li
              onClick={() => {
                setComponent("alladmin");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faUserFriends} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1 text-md">
                {" "}
                All Admin
              </span>
            </li>
            {/* all students */}
            <li
              onClick={() => {
                setComponent("allstudents");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faUserFriends} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                All students
              </span>
            </li>
            {/* class level */}
            <li
              onClick={() => {
                setComponent("classlevel");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faSchoolCircleCheck} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                Class level
              </span>
            </li>
            {/* add teacher */}
            <li
              onClick={() => {
                setComponent("addteacher");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faUserPlus} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                Add Teacher
              </span>
            </li>
            {/* all teachers */}
            <li
              onClick={() => {
                setComponent("allteachers");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faUserFriends} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                All Teachers
              </span>
            </li>
            {/* year and term */}
            <li
              onClick={() => {
                setComponent("yearandterm");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faStopwatch} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                Year and Term
              </span>
            </li>
            {/* subjects */}
            <li
              onClick={() => {
                setComponent("subjects");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faBook} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                Subjects
              </span>
            </li>
            <li
              onClick={() => {
                setComponent("expenses");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faMoneyBillAlt} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                Expenses
              </span>
            </li>
            <li
              onClick={() => {
                setComponent("busmanagement");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon
                icon={faCrown}
                size="sm"
                className="text-orange-400"
              />
              <FontAwesomeIcon icon={faBus} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                Bus Management
              </span>
            </li>
            <li
              onClick={() => {
                setComponent("settings");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
            >
              <FontAwesomeIcon icon={faGear} size="lg" />

              <span className="md:hidden lg:inline xl:inline sm:inline mr-2 ml-1">
                {" "}
                Settings
              </span>
            </li>
            <li
              onClick={() => {
                setComponent("subscription");
              }}
              className="cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5"
            >
              <FontAwesomeIcon
                icon={faNetworkWired}
                size="2xl"
                className="mr-2"
              />
              <span className="md:hidden lg:inline xl:inline sm:inline">
                {" "}
                Subscription
              </span>
            </li>
            <li
              className="cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5"
              onClick={() => setComponent("messages")}
            >
              <span>
                <FontAwesomeIcon icon={faMessage} size="2xl" className="mr-2" />
                <Link  to='/messages' className="md:hidden lg:inline xl:inline sm:inline">
                  {" "}
                  Messages
                </Link>
              </span>
            </li>
          </ul>
        </section>
      </nav>
    </div>
  );
};

export default Navbar;
