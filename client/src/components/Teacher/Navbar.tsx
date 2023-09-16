import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";

import Loading from "../Loading";
const schoolUrl = "/school";
interface ProfileProps {
  setView: any;
}
const Sidebar: React.FC<ProfileProps> = ({ setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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

  if (loading) return <Loading />;

  return (
    <>
      <button onClick={toggleSidebar} className="m-2 absolute top-4">
        <FontAwesomeIcon icon={faBars} size="2xl" />
      </button>
      <div
        style={{
          backgroundColor: colors.sideBar || "rgb(31 41 55)",
          color: colors?.sideBarText || "#ffffff",
        }}
        className={`fixed h-full left-0 top-0 bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0 sm:w-full" : "-translate-x-full"
        } w-64 overflow-y-auto ease-in-out duration-300 z-30`}
      >
        <button
          className="absolute top-3 right-3 text-white bg-black"
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
                setView("addstudent");
                setIsOpen(false);
              }}
            >
              <a className="block  hover:text-white">
                Add Student
              </a>
            </li>
            <li
              className="mb-2"
              onClick={() => {
                setView("registerclass");
                setIsOpen(false);
              }}
            >
              <a href="#" className="block  hover:text-white">
                Register Class
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
