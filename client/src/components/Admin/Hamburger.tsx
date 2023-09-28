import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Hamburger: React.FC<{
  renderNavBar: boolean;
  setRenderNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ renderNavBar, setRenderNavBar }) => {
  const handleRenderNavBar = () => {
    setRenderNavBar(!renderNavBar);
    console.log(renderNavBar);
  };
  return (
    <>
      <button
        className="fixed bg-blue-900 z-50 right-6 top-6 p-3 border  cursor-pointer"
        onClick={(_) => handleRenderNavBar()}
      >
        <FontAwesomeIcon icon={faBars} size="2x"></FontAwesomeIcon>
      </button>
    </>
  );
};
export default Hamburger;
