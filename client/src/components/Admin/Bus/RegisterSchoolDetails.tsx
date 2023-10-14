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
  noOfBuses: number;
}
let busUrl = "/bus";
const RegisterSchoolDetails: React.FC<I> = ({ setView }) => {
  let [confirmModal, setConfirmModal] = React.useState<boolean>(false);
  let [_confirmable, setConfirmable] = React.useState<boolean>(false);
  let [details, setDetails] = React.useState<Iform>({
    price: 0,
    noOfBuses: 0,
    noOfSeats: 0,
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
  if (confirmModal)
    return (
      <EditModal confirmModal={setConfirmModal} confirmable={setConfirmable} />
    );
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
          <label htmlFor="" className="capitalize">
            bus fees amount
          </label>
          <input
            className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600  "
            type="number"
            name="price"
            onChange={handleFormInput}
            value={details.price}
          />
          <label htmlFor="" className="capitalize">
            number of seats
          </label>
          <input
            className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600 "
            name="noOfSeats"
            id=""
            onChange={handleFormInput}
            value={details.noOfSeats}
          />
          <Button buttontype={0}>Register</Button>
          <br />
          <a
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setConfirmModal(true);
            }}
          >
            Edit School Details?
          </a>
        </form>
      </div>

      <WarningComponent>
        StudentId can be found in the student details in all students
      </WarningComponent>
    </>
  );
};

export default RegisterSchoolDetails;

//edit modal

const EditModal: React.FC<{
  confirmable: React.SetStateAction<any>;
  confirmModal: React.SetStateAction<any>;
}> = ({ confirmable, confirmModal }) => {
  let [details, setDetails] = React.useState<Iform>({
    price: 0,
    noOfBuses: 0,
    noOfSeats: 0,
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
    console.log('g')
    console.log(details);
    (async () => {
      try {

        let res = await axios.put(`${busUrl}/modify/school_details`, details);
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
  //getting school details
  React.useEffect(() => {
    //getting schoolDetails
    (async () => {
      try {
        const res = await axios.get(`${busUrl}/school/details`);
        setDetails(res?.data?.schoolDetails);
      } catch (error: any) {
        setMsg({ error: error?.response?.data?.msg, success: "" });
      }
    })();
  }, []);

  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmable */}
      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh] dark:bg-gray-800 bg-white ">
        <p className="text-center text-lg">Edit School Details</p>
        <p className="text-green-600 text-center">{msg.success}</p>
        <p className="text-red-500 text-center">{msg.error}</p>
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-2xl h-fit box-border p-20">
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
            <label htmlFor="" className="capitalize">
              bus fees amount
            </label>
            <input
              className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600  "
              type="number"
              name="price"
              onChange={handleFormInput}
              value={details.price}
            />
            <label htmlFor="" className="capitalize">
              number of seats
            </label>
            <input
              className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600 "
              name="noOfSeats"
              id=""
              onChange={handleFormInput}
              value={details.noOfSeats}
            />
            <Button
              buttontype={0}
              onClick={() => {
                confirmable(true);
                //   confirmModal(false);
              }}
            >
              Register
            </Button>
            <br />
          </form>
          <span className="absolute right-2"></span>
          <span className="absolute left-2">
            {" "}
            <button
              className="bg-red-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(false);
                confirmModal(false);
              }}
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
