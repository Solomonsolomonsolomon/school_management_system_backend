import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Link } from "react-router-dom";
interface LoginProps {
  handleSubmit: any;
  msgRef: any;
  details: any;
  handleInput: any;
  setClicked: any;
}
const LoginForm: React.FC<LoginProps> = ({
  handleSubmit,
  msgRef,
  details,
  handleInput,
  setClicked,
}) => {
  const [toggleEye, setToggleEye] = React.useState<boolean>(false);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid g dark:text-gray-900  gap-3 p border border-black bg-white h-fit p-9 rounded-xl "
      >
        <p
          ref={msgRef}
          className={`w-[10 dark:text-gray-9000%] text-center ${
            msgRef.current?.textContent === "successful_login"
              ? "text-green-800"
              : "text-[red]"
          }`}
        ></p>
        <input
          type="text"
          placeholder="email or id"
          name="email"
          value={details.email}
          onChange={handleInput}
          className="border dark:text-gray-900 border-black border-t-0 border-b-2 border-l-0 border-r-0 outline-none "
        />
        <div>
          <input
            type={`${toggleEye ? "text" : "password"}`}
            placeholder="password"
            name="password"
            value={details.password}
            onChange={handleInput}
            className="border dark:text-gray-900 border-black border-t-0 border-b-2 border-l-0 border-r-0 outline-none"
        
          />
          <span onClick={() => setToggleEye(!toggleEye)}>
            {toggleEye ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        </div>

        <select
          name="role"
          id=""
          value={details.role}
          required
          onChange={handleInput}
          className="border dark:text-gray-900 border-black border-t-0 border-b-2 border-l-0 border-r-0 rounded"
        >
          <option value="">SELECT</option>
          <option value="admin">admin</option>
          <option value="student">student</option>
          <option value="teacher">teacher</option>
        </select>
        <Link to="forgot-password" className="text-blue-800">
          Forgot password?
        </Link>
        <button
          onClick={() => {
            setClicked(Date.now());
          }}
          className="bg-gray-900 p-2 rounded text-white"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
