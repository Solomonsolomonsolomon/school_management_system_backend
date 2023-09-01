import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faBook, faGaugeHigh, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import {
  faGraduationCap,
  faAdd,
  faUserPlus,
  faUserFriends,
  faSchoolCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import AddStudent from "./AddStudent";
import React from "react";
interface ProfileProps {
  setView: any;
}
const Navbar: React.FC<ProfileProps> = ({ setView }: ProfileProps) => {
  function setComponent(component: any): any {
    setView(component);
  }
  return (
    <nav className="bg-slate-50 shadow-lg h-screen py-1 relative overflow-y-auto">
      <h1 className="text-center text-3xl font-bold">SMS|ADMIN</h1>
      <section className="my-2">
        <ul className="grid gap-0">
          {/* dashboard */}
          <li
            onClick={() => {
              setComponent("subadmin");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5"
          >
            <div
              onClick={() => {
                setComponent("subadmin");
              }}
            >
              <FontAwesomeIcon icon={faGaugeHigh} size="xl" className="mr-2" />
              <span className="text-slate-700">Dashboard</span>
            </div>
          </li>
          {/* <li className="mr-10">
            <FontAwesomeIcon
              icon={faGraduationCap}
              size="2xl"
              className="mr-2"
            />
            <span className="text-slate-700">Students</span>
          </li> */}
          {/* add students */}
          <li
            onClick={() => {
              setComponent("addstudent");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
          >
            <FontAwesomeIcon icon={faUserPlus} size="xl" />

            <span className="text-slate-700 mr-2">add students</span>
          </li>
          {/* all students */}
          <li
            onClick={() => {
              setComponent("allstudents");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
          >
            <FontAwesomeIcon icon={faUserFriends} size="xl" />

            <span className="text-slate-700 mr-2">all students</span>
          </li>
          {/* class level */}
          <li
            onClick={() => {
              setComponent("classlevel");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
          >
            <FontAwesomeIcon icon={faSchoolCircleCheck} size="xl" />

            <span className="text-slate-700 mr-2">class level</span>
          </li>
          {/* add teacher */}
          <li
            onClick={() => {
              setComponent("addteacher");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
          >
            <FontAwesomeIcon icon={faUserPlus} size="xl" />

            <span className="text-slate-700 mr-2">Add Teacher</span>
          </li>
          {/* year and term */}
          <li
            onClick={() => {
              setComponent("yearandterm");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
          >
            <FontAwesomeIcon icon={faStopwatch} size="xl" />

            <span className="text-slate-700 mr-2">Year and Term</span>
          </li>
          {/* subjects */}
          <li
            onClick={() => {
              setComponent("subjects");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition mr-10 hover:bg-slate-300 p-5 py-1"
          >
            <FontAwesomeIcon icon={faBook} size="xl" />

            <span className="text-slate-700 mr-2"> Subjects</span>
          </li>
          <li className="cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5">
            <NavLink to="/admin/teacher">
              <FontAwesomeIcon
                icon={faChalkboardUser}
                size="2xl"
                className="mr-2"
              />
              <span className="text-slate-700">Teachers</span>
            </NavLink>
          </li>
          <li className="cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5">
            <NavLink to="/admin/messages">
              <FontAwesomeIcon icon={faAdd} size="2xl" className="mr-2" />
              <span className="text-slate-700">Messages</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
