import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faArrowRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
interface Navbar {
  setConfirmModal: React.Dispatch<React.SetStateAction<any>>;
  logout: any;
}
const NavBar: React.FC<Navbar> = ({ setConfirmModal, logout }) => {
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default NavBar;
