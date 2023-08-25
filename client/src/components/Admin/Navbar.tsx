import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGaugeHigh } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap, faAdd } from "@fortawesome/free-solid-svg-icons";
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
    <nav className="bg-slate-50 shadow-lg h-screen py-1 relative fixed">
      <h1 className="text-center text-3xl font-bold">SMS|ADMIN</h1>
      <section className="my-2">
        <ul className="grid gap-0">
          <li
            onClick={() => {
              setComponent("subadmin");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5"
          >
            <NavLink to="/admin/">
              <FontAwesomeIcon icon={faGaugeHigh} size="2xl" className="mr-2" />
              <span className="text-slate-700">Dashboard</span>
            </NavLink>
          </li>
          <li className="mr-10">
            <FontAwesomeIcon
              icon={faGraduationCap}
              size="2xl"
              className="mr-2"
            />
            <span className="text-slate-700">Students</span>
          </li>
          <li
            onClick={() => {
              setComponent("addstudent");
            }}
            className="cursor-pointer hover:shadow-lg hover:transition"
          >
            <FontAwesomeIcon icon={faAdd} size="xl" />
            <span className="text-slate-700 mr-2">add students</span>
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
