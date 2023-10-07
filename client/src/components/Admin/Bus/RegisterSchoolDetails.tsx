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
  price: number;
   noOfSeats: number;
   noOfBuses:number;
}
let busUrl = "/bus";
const RegisterSchoolDetails: React.FC<I> = ({ setView }) => {
  let [details, setDetails] = React.useState<Iform>({
   price:0,
   noOfBuses:0,
   noOfSeats:0
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
        let res = await axios.post(`${busUrl}/register/school`, details);
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
        Register Bus Details for School
      </p>
      <p className="text-green-600 text-center">{msg.success}</p>
      <p className="text-red-500 text-center">{msg.error}</p>
      <div className="grid h-[70vh] justify-center items-center place-items-center">
        <form
          action=""
          className="p-6 border rounded  border-gray-600"
          onSubmit={handleSubmit}
        >
          <label htmlFor="" className="capitalize">
            number of buses
          </label>
          <input
            className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600  "
            type="text"
            name="noOfBuses"
            onChange={handleFormInput}
            value={details.noOfBuses}
          />
          <label htmlFor="" className="capitalize">bus fees amount</label>
          <input
            className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600  "
            type="number"
            name="price"
            
            onChange={handleFormInput}
            value={details.price}
          />
          <label htmlFor="" className="capitalize">number of seats</label>
          <input
            className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600 "
            name="noOfSeats"
            id=""
            onChange={handleFormInput}
            value={details.noOfSeats}
          />
          <Button buttontype={0}>Register</Button>
        </form>
      </div>

      <WarningComponent>
        StudentId can be found in the student details in all students
      </WarningComponent>
    </>
  );
};
export default RegisterSchoolDetails;
