import React from "react";
import { Link } from "react-router-dom";
const ForgotPassword: React.FC = () => {
  return (
    <div className="h-full grid justify-center items-center place-content-center ">
      <h1>hi there 👋</h1>
      <p>It seems like you've forgotten your password....</p>
      <p>
        Contact an admin from your school to change it{" "}
        <p>or directly mail the developer (only extreme cases)</p>
        <a
          href="mailto:emmanuel.solomon.04292003@gmail.com"
          className="text-blue-800"
        >
          email link here
        </a>
      </p>
      <p>Thank you and remember to pick and easier password next time</p>
      <Link to="/" className="text-blue-500">back to login?</Link>
      {/* <input type="text" placeholder="email" className="bg-inherit border" />
      <input type="text" placeholder="password" className="bg-inherit border" />
      <button></button> */}
    </div>
  );
};
export default ForgotPassword;
