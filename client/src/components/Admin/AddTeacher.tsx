import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import axios from "./../../api/axios";
import Modal from "react-modal";
import Loading from "../Loading";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

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
  subjectsColors?: any;
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
    case "saveSubject":
      return {
        ...state,
        loading: false,
        msg: action.msg,
        subjectData: action.payload,
      };
    case "toggleColor":
      const subjectId = action.payload;
      const currentColor = state.subjectsColors
        ? state.subjectsColors[subjectId] || false
        : false;
      return {
        ...state,
        subjectsColors: {
          ...state.subjectsColors,
          [subjectId]: !currentColor,
        },
      };
    case "resetSelectedSubjects": {
      let subjectId = action.payload;
      return {
        ...state,
        loading: false,
        subjectsColors: {
          ...state.subjectsColors,
          [subjectId]: false,
        },
      };
    }
    case "saveSubjects":
      return { ...state };
    default:
      return state;
  }
}
let initialState: State = {
  classData: [],
  loading: true,
  msg: "",
  subjectsData: {},
  subjectsColors: {},
};
const TeacherAddition: React.FC = () => {
  let ref = React.useRef<HTMLDivElement | null>(null);
  return (
    <>
      <AddTeacher CheckBoxDivRef={ref} />
    </>
  );
};
const AddTeacher: React.FC<{
  CheckBoxDivRef: React.RefObject<HTMLDivElement>;
}> = ({ CheckBoxDivRef }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  let subtitle: any;
  console.log("reading subtitle", subtitle);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [state, dispatch] = React.useReducer<React.Reducer<any, Action>>(
    reducer,
    initialState
  );
  let [query, setQuery] = useState<string>("");
  let [dataObj, setDataObj] = useState<any>({});
  let [classData, setClassData] = useState<any[]>([]);
  let [subjectData, setSubjectData] = useState<any[]>([]);
  let [isModalSubmitted, setModalSubmitted] = useState<boolean>(false);
  let [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  let focusRef = React.useRef<HTMLInputElement>(null);
  let checkboxRef = React.useRef<HTMLDivElement>(null);

  let baseUrl = "/admin";
  let url2 = "/subject";
  //fetching classes
  React.useEffect(() => {
    let controller = new AbortController();
    classLevels();
    async function classLevels() {
      try {
        dispatch({ type: "startLoading" });
        let res = await axios.get(`${baseUrl}/class/get/all`, {
          signal: controller.signal,
        });
        dispatch({
          type: "msg",
          msg: "Add Teacher",
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
  //fetching subjects
  React.useEffect(() => {
    let controller = new AbortController();
    getSubjects();
    async function getSubjects() {
      dispatch({ type: "startLoading" });
      let res = await axios.get(`${url2}/get/all/json`, {
        signal: controller.signal,
      });

      dispatch({
        type: "msg",
        msg: res.data?.msg || "successful",
      });
      setSubjectData(res.data?.asJson);
    }
    return () => {
      controller.abort();
    };
  }, []);
  //handle checkboxes
  const onSubmit: SubmitHandler<any> = async (data) => {
    // Handle the form submission here, e.g., send data to the server
    setDataObj({ ...dataObj, ...data });
    reset();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    dispatch({ type: "toggleColor", payload: {} });
    setQuery("");
    setIsModalOpen(false);
  };
  const onSubmitSubjects = async () => {
    // Handle the submission of subjects offered here

    setModalSubmitted(true);
    setIsModalOpen(false);
    // let subjects: any[] = [];

    setQuery("");
    //am
  };
  const filtered = subjectData.filter((data) => {
    return data.name
      .toUpperCase()
      .split(" ")
      .join("")
      .split("_")
      .join("")
      .includes(query.toUpperCase().split(" ").join(""));
  });

  const handleSubjectClick = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(
        ...[selectedSubjects.filter((subject) => subject !== subjectId)]
      );
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  async function handleFinalRegister() {
    try {
      dispatch({ type: "startLoading" });
      let theData = { ...dataObj, subjects: selectedSubjects };

      let res = await axios.post(`${baseUrl}/add/teacher`, theData);

      dispatch({
        type: "msg",
        msg: res?.data?.msg || "teacher added successfully",
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: "msg",
        msg: error.response?.data?.err || error.message,
      });
    } finally {
      setModalSubmitted(false);
    }
  }

  if (state.loading) return <Loading />;
  return (
    <>
      <p className="text-center font-bold"> {state.msg} </p>
      <div className="grid px-4 justify-items-center" ref={checkboxRef}>
        <form
          onSubmit={
            isModalSubmitted
              ? (e) => {
                  e.preventDefault();
                  handleFinalRegister();
                }
              : handleSubmit(onSubmit)
          }
          className="grid justify-items justify-between border border-gray-300 p-3 gap-4 w-fit items-center place-content-between"
        >
          <div className="form-group grid ">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className={`${
                !isModalSubmitted
                  ? "form-control border rounded p-2 border-gray-300"
                  : "hidden"
              }`}
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
              className={`${
                !isModalSubmitted
                  ? "form-control border rounded p-2 border-gray-300"
                  : "hidden"
              }`}
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
              className={`${
                !isModalSubmitted
                  ? "form-control border rounded p-2 border-gray-300"
                  : "hidden"
              }`}
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
              className={`${
                !isModalSubmitted
                  ? "form-control border rounded p-2 border-gray-300"
                  : "hidden"
              }`}
              {...register("dateEmployed")}
            />
          </div>

          <div className="form-group grid">
            <label htmlFor="formTeacher">Form Teacher</label>
            <select
              id="formTeacher"
              className={`${
                !isModalSubmitted
                  ? "form-control border rounded p-2 border-gray-300"
                  : "hidden"
              }`}
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

          <Button buttonType={0}>
            {isModalSubmitted ? "Register" : "Proceed"}
          </Button>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="text-center text-sm"
        >
          Select subject(s) taught
        </h2>

        <div className="h-[150px]">
          <input
            type="search"
            className="border rounded-none"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              focusRef.current ? focusRef.current.focus() : "";
            }}
            placeholder="search subjects..."
            ref={focusRef}
          />
          <div ref={CheckBoxDivRef} className="grid gap-3">
            {filtered.map((subject, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="font-blue flex gap-1">
                    <span
                      key={subject.name}
                      onClick={() => handleSubjectClick(subject._id)}
                      className={`${
                        selectedSubjects.includes(subject._id)
                          ? "text-blue-800"
                          : "text-black"
                      }`}
                    >
                      {subject.name}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <form>
            <input />
          </form>
        </div>
        <div className="absolute top-1 left-1">
          <Button buttonType={2} onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} size="sm"></FontAwesomeIcon>
          </Button>
        </div>

        <div className="absolute right-1 top-1">
          <Button buttonType={1} onClick={onSubmitSubjects}>
            <FontAwesomeIcon icon={faCheck} size="sm"></FontAwesomeIcon>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TeacherAddition;
