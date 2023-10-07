import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WarningComponent from "../../../utils/WarningComponent";
import Button from "../../Button/Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../api/axios";
interface I {
  setView: any;
}
interface Iform {
  studentId: string;
  address: string;
}
let busUrl = "/bus";
const AddStudent: React.FC<I> = ({ setView }) => {
  let [details, setDetails] = React.useState<Iform>({
    address: "",
    studentId: "",
  });
  interface IMsg {
    error: string;
    success: string;
  }
  let [msg, setMsg] = React.useState<IMsg>({
    error: "",
    success: "",
  });

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(details);
    (async () => {
      try {
        let res = await axios.post(`${busUrl}/register/student`,details);
        console.log(res);
        setMsg({ error: "", success: res.data?.msg });
      } catch (error: any) {
        setMsg({
          error: error?.response?.data?.msg || error?.message,
          success: "",
        });
      }
    })();
  };

  function handleFormInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  return (
    <>
      <button
        className="border p-2 bg-blue-700 text-white rounded"
        onClick={() => setView("navbar")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <p className="text-center font-extrabold opacity-90">
        Add student to Bus Line
      </p>
      <p className="text-green-600 text-center">{msg.success}</p>
      <p className="text-red-500 text-center">{msg.error }</p>
      <div className="grid h-[70vh] justify-center items-center place-items-center">
        <form
          action=""
          className="p-6 border rounded  border-gray-600"
          onSubmit={handleSubmit}
        >
          <input
            className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600  "
            type="text"
            name="studentId"
            placeholder="enter studentId"
            onChange={handleFormInput}
            value={details.studentId}
          />
          <textarea
            className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600 "
            name="address"
            id=""
            placeholder="enter address"
            onChange={handleFormInput}
            value={details.address}
          ></textarea>
          <Button buttontype={0}>Add to bus Line</Button>
        </form>
      </div>

      <WarningComponent>
        StudentId can be found in the student details in all students
      </WarningComponent>
    </>
  );
};
export default AddStudent;
