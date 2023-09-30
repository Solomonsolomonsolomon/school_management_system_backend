import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./Navbar";
import axios from "../../api/axios";
const schoolUrl = "/school";
const Hamburger: React.FC<{
  setView: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setView }) => {
  interface Color {
    headerText: string;
  }
  let [renderNavBar, setRenderNavBar] = React.useState<boolean>(false);
  const [theme, settheme] = React.useState<Color>({ headerText: "#000000" });
  const handleRenderNavBar = () => {
    setRenderNavBar(!renderNavBar);
    console.log(renderNavBar);
  };
  React.useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${schoolUrl}/logo/theme/get`);
        console.log(res);
        settheme({
          headerText: res?.data?.themes?.headerText,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <button
        className="fixed lg:hidden md:hidden xl:hidden block bg-inherit text-inherit z-50 right-6 top-6 p-2 border  cursor-pointer"
        onClick={(_) => handleRenderNavBar()}
        style={{
          color: theme.headerText||"black",

        }}
      >
        <FontAwesomeIcon icon={faBars} size="2x"></FontAwesomeIcon>
      </button>
      {/* <div className={`${renderNavBar ? "block" : "hidden"} absolute`}> */}
      <div
        className={` lg:hidden md:hidden xl:hidden fixed h-full left-0 top-0 text-white transition-transform transform ${
          renderNavBar ? "translate-x-0 sm:w-full" : "-translate-x-full"
        } w-64 overflow-y-auto ease-in-out duration-300 z-30`}
      >
        <Navbar setView={setView} isOpen={setRenderNavBar} />
      </div>
    </>
  );
};
export default Hamburger;
