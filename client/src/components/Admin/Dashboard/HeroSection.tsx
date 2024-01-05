import React from "react";
import banner from "./../../../assets/undraw_pair_programming_re_or4x.svg";
const HeroSection: React.FC = () => {
  return (
    <div
      className="w-full flex justify-center flex-wrap 
      bg-gray-200 dark:bg-gray-700 p-5 rounded-2xl"
    >
      <div className="flex flex-col justify-center flex-wrap opacity-60">
        <p className="uppercase ">
          Manage and Monitor your entire school's activites
        </p>
        <p className="uppercase "> from anywhere</p>
        <p>Never be out of the loop again</p>
      </div>

      <img src={banner} alt="" className="h-[250px] z-4" />
    </div>
  );
};

export default HeroSection;
