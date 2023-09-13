import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

interface ProfileProps {
  setView: any;
}
const Sidebar: React.FC<ProfileProps> = ({ setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="m-2 absolute top-4">
        <FontAwesomeIcon icon={faBars} size="2xl" />
      </button>
      <div
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
              <a href="#" className="block text-gray-300 hover:text-white">
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
              <a className="block text-gray-300 hover:text-white">Pay fees</a>
            </li>
            <li
              className="mb-2"
              onClick={() => {
                setView("viewresult");
                setIsOpen(false);
              }}
            >
              <a className="block text-gray-300 hover:text-white">View Results</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
