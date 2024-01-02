import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "./../../api/axios";
import Loading from "../Loading";
const schoolUrl = "/school";
interface ProfileProps {
  setView: any;
}
const Sidebar: React.FC<ProfileProps> = ({ setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [colors, setColors] = React.useState<any>({
    sideBar: "white",
    sideBarText: "#454545",
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  if (loading) return <Loading />;

  return (
    <nav className="">
      <button
        onClick={toggleSidebar}
        className="m-2 absolute right-4 top-4"
        style={{
          color: "#000000",
        }}
      >
        <FontAwesomeIcon icon={faBars} size="xl" />
      </button>
      <div
        style={{
          backgroundColor: colors.sideBar || "rgb(31 41 55)",
          color: colors.sideBarText || "#ffffff",
        }}
        className={`fixed h-full left-0 top-0 text-white transition-transform transform ${
          isOpen ? "translate-x-0 sm:w-full" : "-translate-x-full"
        } w-64 overflow-y-auto ease-in-out duration-300 z-30`}
      >
        <button
          className="absolute top-3 right-3 text-white "
          onClick={toggleSidebar}
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}>
            <FontAwesomeIcon icon={faClose} />
          </i>
        </button>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4" onClick={toggleSidebar}>
            Menu
          </h2>

          <ul>
            <li
              className="mb-2"
              onClick={() => {
                setView("dashboard");
                setIsOpen(false);
              }}
            >
              <a href="#" className="block  hover:text-white">
                Dashboard
              </a>
            </li>
            <li
              className="mb-2"
              onClick={() => {
                setView("payfees");
                setIsOpen(false);
              }}
            >
              <a className="block  hover:text-white">Pay fees</a>
            </li>

            <li
              className="mb-2"
              onClick={() => {
                setView("allresults");
                setIsOpen(false);
              }}
            >
              <a className="block  hover:text-white">View Results</a>
            </li>
            <li
              className="mb-2"
              onClick={() => {
                setView("transactions");
                setIsOpen(false);
              }}
            >
              <a className="block  hover:text-white">Transactions</a>
            </li>
            <li
              className="mb-2"
              onClick={() => {
                setView("attendance");
                setIsOpen(false);
              }}
            >
              <a className="block  hover:text-white">Attendance</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
