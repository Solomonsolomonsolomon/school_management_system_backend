import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Hamburger: React.FC<{
  renderNavBar: boolean;
  setRenderNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}> = () => {
  let [renderNavBar, setRenderNavBar] = React.useState<boolean>(true);
  const handleRenderNavBar = () => {
    setRenderNavBar(!renderNavBar);
  };
  return (
    <>
      <button
        className="absolute right-6 top-6 p-3 border "
        onClick={(_) => handleRenderNavBar}
      >
        <FontAwesomeIcon icon={faBars} size="2x"></FontAwesomeIcon>
      </button>
    </>
  );
};
export default Hamburger;
