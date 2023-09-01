import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ReactDOM from "react-dom";
import axios from "./../../api/axios";
import Modal from "react-modal";
import Loading from "../Loading";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
interface Action {
  type: string;
  loading?: boolean;
  msg?: string;
  payload?: any;
}
interface State {
  loading: boolean;
  msg: string;
  classData: any[];
  subjectsData: any;
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "startLoading":
      return { ...state, loading: true };
    case "stopLoading":
      return { ...state, loading: false };
    case "msg":
      return { ...state, loading: false, msg: action.msg };
    case "saveClasses":
      return { ...state, loading: false, classData: action.payload };
    case "msg+classes":
      return {
        ...state,
        loading: false,
        classData: action.payload,
        msg: action.msg,
      };
    case "saveSubject": {
      return {
        ...state,
        loading: false,
        msg: action.msg,
        subjectData: action.payload,
      };
    }
    default:
      return state;
  }
}
let initialState: State = {
  classData: [],
  loading: true,
  msg: "",
  subjectsData: {},
};
const AddTeacher: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  let subtitle: any;
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [state, dispatch] = React.useReducer<React.Reducer<any, Action>>(
    reducer,
    initialState
  );
  let [dataObj, setDataObj] = useState<any>([]);
  let [classData, setClassData] = useState<any[]>([]);
  let [subjectData, setSubjectData] = useState<any>({});

  let baseUrl = "/admin";
  let url2 = "/subject";
  
  React.useEffect(() => {
    let controller = new AbortController();
    //  classLevels();
    async function classLevels() {
      try {
        dispatch({ type: "startLoading" });
        let res = await axios.get(`${baseUrl}/class/get/all`, {
          signal: controller.signal,
        });
        dispatch({
          type: "msg",
          msg: res.data?.msg || "successful",
        });
        setClassData(res.data?.classes);
      } catch (error: any) {
        dispatch({
          msg: error.response?.data?.msg || error?.message,
          type: "msg",
        });
      }
    }
    return () => {
      controller.abort();
    };
  }, []);
  React.useEffect(() => {
    let controller = new AbortController();
    getSubjects();
    async function getSubjects() {
      dispatch({ type: "startLoading" });
      let res = await axios.get(`${url2}/get/all`, {
        signal: controller.signal,
      });
 
      dispatch({
        type: "msg",
        msg: res.data?.msg || "successful",
      });
      setSubjectData(res.data?.subjects)
    }
    return () => {
      controller.abort();
    };
  }, []);
  const onSubmit: SubmitHandler<any> = async (data) => {
    // Handle the form submission here, e.g., send data to the server
    console.log("Teacher data:", data);
    setDataObj([...dataObj, data]);
    reset();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  const onSubmitSubjects: SubmitHandler<any> = async (data) => {
    // Handle the submission of subjects offered here
    console.log("Subjects data:", data);

    // Close the modal after submission
    setIsModalOpen(false);
  };
  if (state.loading) return <Loading />;
  return (
    <>
      <p className="text-center font-bold"> {state.msg} </p>
      <div className="grid px-4 justify-items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid justify-items justify-between border border-gray-300 p-3 gap-4 w-fit items-center place-content-between"
        >
          <div className="form-group grid ">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control border rounded p-2 border-gray-300"
              {...register("name", { required: true })}
              placeholder="Full Name"
            />
            {errors.name && (
              <span className="text-danger">Name is required</span>
            )}
          </div>

          <div className="form-group grid">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control border rounded p-2 border-gray-300"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email Address"
            />
            {errors.email && (
              <span className="text-danger">Invalid email address</span>
            )}
          </div>

          <div className="form-group grid">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control border rounded p-2 border-gray-300"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-danger">Password is required</span>
            )}
          </div>

          <div className="form-group grid">
            <label htmlFor="dateEmployed">Date Employed</label>
            <input
              type="date"
              id="dateEmployed"
              className="form-control border rounded p-2 border-gray-300"
              {...register("dateEmployed")}
            />
          </div>

          <div className="form-group grid">
            <label htmlFor="formTeacher">Form Teacher</label>
            <select
              id="formTeacher"
              className="form-control"
              {...register("formTeacher")}
            >
              <option value="">not a form teacher</option>
              {classData.map((classes: any, index: number) => {
                return (
                  <option value={classes.name} key={index}>
                    {classes.name}
                  </option>
                );
              })}
              {/* Add options for form teacher */}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary p-4 text-white bg-gray-600 rounded"
          >
            Add Teacher
          </button>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Enter subject(s) taught
        </h2>
        <input type="search"  />
        {Object.entries(subjectData).map((keys,index,arr:any[]) => {
          return (
            <>
              <>
                <div className="overflow-x-auto" key={index+keys[0]}>
                  <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      {/* table head */}
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {arr[index][0]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {arr[index][1]
                        ? arr[index][1].map(
                            (subject: any, i: number, array: any[]) => {
                              return (
                                <>
                                  {" "}
                                  <tr key={subject._id}>
                                    <div className="flex items-center justify-between h-5">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {subject.subject}
                                      </td>
                                    </div>

                                    <td
                                      className="px-6  py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 "
                                      onClick={(e) => {
                                console.log('kkk')
                                      }}
                                    >
                                      <a className="text-blue-600">Add</a>
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                          )
                        : ""}
                    </tbody>
                  </table>
                </div>
              </>
            </>
          );
        })}
        <form>
          <input />
        </form>

        <button onClick={closeModal}>close</button>
      </Modal>
    </>
  );
};

export default AddTeacher;
