import React from "react";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className=" p-10 shadow-gray-500 shadow-lg border  box-content flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 ">
      {children}
    </div>
  );
};


export default Card;
