import React, { useReducer } from "react";
import Loading from "../Loading";
import axios from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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

let baseUrl = "/admin";
let subject = "/subject";
interface Action {
  type: string;
  msg?: any;
  payload?: any;
}
interface State {
  loading: boolean;
  msg: string;
  teachers: any[];
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "startLoading":
      return { ...state, loading: true };
    case "stopLoading":
      return { ...state, loading: false };
    case "msg":
      return { ...state, loading: false, msg: action.msg };
    case "msg+saveTeacher":
      return {
        ...state,
        loading: false,
        msg: action.msg,
        teachers: action.payload,
      };
    default:
      return { ...state };
  }
}
const initialState = { loading: true, msg: "", teachers: [] };
const AllTeachers: React.FC = () => {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editingTeacher, setEditingTeacher] = React.useState<any>({});
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [classes, setAllClasses] = React.useState<any[]>([]);
  const [subjects, setAllSubjects] = React.useState<any[]>([]);
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);
  const [triggerFetch, setTriggerFetch] = React.useState<any>("");
  const [subjectSearchQuery, setSubjectSearchQuery] =
    React.useState<string>("");

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle!.style.color = "#000";
  }
  function closeModal() {
    setIsOpen(false);
  }
  let [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  function handleDelete(studentId: string) {
    async function deleteTeacher() {
      try {
        dispatch({ type: "startLoading" });
        let res = await axios.delete(`${baseUrl}/delete/teacher/${studentId}`);

        let updateUIOnDeletion = state.teachers.filter(
          (teacher) => teacher.teacherId !== studentId
        );
        dispatch({
          type: "msg+saveTeacher",
          msg: res.data?.msg || "successfully deleted",
          payload: updateUIOnDeletion,
        });
      } catch (error: any) {
        dispatch({
          type: "msg",
          msg: error?.response?.data?.err || "failed to delete",
        });
      }
    }
    let confirmable = window.confirm(
      "please note that this action is permanent,do you want to continue"
    );
    if (confirmable) {
      deleteTeacher();
    }
  }
  function handleEdit(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingTeacher({ ...editingTeacher, [e.target.name]: e.target.value });
  }

  const filtered = state.teachers.filter((teacher) => {
    return (
      teacher.name.includes(searchQuery) ||
      teacher.email.includes(searchQuery) ||
      teacher.teacherId.includes(searchQuery) ||
      teacher.formTeacher.includes(searchQuery)
    );
  });
  const filteredSubjects = subjects.filter((subject) => {
    return subject.name
      .toLowerCase()
      .includes(subjectSearchQuery.toLowerCase());
  });

  const handleClickedSubjects = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(
        ...[selectedSubjects.filter((subject) => subject !== subjectId)]
      );
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };
  async function saveChangesClick(
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    let controller = new AbortController();

    try {
      const updatedTeacher = { ...editingTeacher, subjects: selectedSubjects };
      console.log(selectedSubjects);
      dispatch({ type: "startLoading" });
      let submit = await axios.put(
        `${baseUrl}/edit/teacher/${updatedTeacher._id}`,
        updatedTeacher,
        {
          signal: controller.signal,
        }
      );
      setTriggerFetch(Date.now());
      dispatch({type:"msg",msg:submit.data?.msg||"edited successfully"})
    } catch (error: any) {
      console.log(error);
      if (error.name == "AbortError" || error.name == "CanceledError") return;
      dispatch({
        type: "msg",
        msg:
          error.response?.data || error?.message == "canceled"
            ? "loading........."
            : error?.message || "error in fetching",
      });
    } finally {
      setIsOpen(false);
    }
    return () => {
      controller.abort();
    };
  }
  //#getting all teachers
  React.useEffect(() => {
    let controller = new AbortController();

    async function allTeachers() {
      dispatch({ type: "startLoading" });

      try {
        let res = await axios.get(`${baseUrl}/get/teacher`, {
          signal: controller.signal,
        });

        dispatch({
          type: "msg+saveTeacher",
          msg: res.data?.msg || "teachers fetched successfully",
          payload: res.data?.teacher,
        });
      } catch (error: any) {
        if (error.name == "AbortError" || error.name == "CanceledError") return;
        dispatch({
          type: "msg",
          msg:
            error.response?.data || error?.message == "canceled"
              ? "loading........."
              : error?.message || "error in fetching",
        });
      }
    }
    allTeachers();
    return () => {
      controller.abort();
    };
  }, [triggerFetch]);
  //#getting subjects
  React.useEffect(() => {
    const controller = new AbortController();
    async function subjects() {
      try {
        dispatch({ type: "startLoading" });
        let res = await axios.get(`${subject}/get/all/json`, {
          signal: controller.signal,
        });
        setAllSubjects(res.data?.asJson);
      } catch (error: any) {
        if (error.name == "CanceledError" || error.name == "AbortError") return;
        dispatch({
          type: "msg",
          msg: error.response?.data || error?.message || "error in fetching",
        });
      }
    }
    subjects();
    return () => {
      controller.abort();
    };
  }, []);
  //#getting classes
  React.useEffect(() => {
    const controller = new AbortController();

    async function getClasses() {
      try {
        dispatch({ type: "startLoading" });
        let res = await axios.get(`${baseUrl}/class/get/all`, {
          signal: controller.signal,
        });
        setAllClasses(res.data?.classes);
        dispatch({ type: "stopLoading" });
      } catch (error: any) {
        console.log(error);
        if (error.name == "CanceledError" || error.name == "AbortError") return;
        dispatch({
          type: "msg",
          msg:
            error?.response?.data?.msg ||
            error.message ||
            "failed to fetch classes",
        });
      }
    }
    getClasses();
    return () => {
      controller.abort();
    };
  }, []);
  if (state.loading) return <Loading />;
  return (
    <div className="w-[200px]sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px]">
      <h1 className="text-center font-bold">{state.msg}</h1>
      <div className="overflow-x-auto grid">
        <input
          type="text"
          placeholder="Search for teachers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
          <thead className="bg-gray-50 dark:bg-gray-700">
            {/* table head */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                TeacherId
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Form Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Subjects Taught
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                EMPLOYMENT DATE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filtered
              ? filtered.map((teacher: any, i: number, _array: any[]) => {
                  return (
                    <>
                      <tr key={teacher._id}>
                        <td
                          key={i + teacher._id}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                        >
                          {teacher.name}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {teacher.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {teacher.teacherId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {teacher.formTeacher || "nil"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {[
                            ...new Set(
                              teacher?.subjects?.map(
                                (subject: any) => subject?.subject
                              )
                            ),
                          ]
                            .join(",")
                            .toLowerCase() || "nil"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {teacher.dateEmployed || "nil"}
                        </td>

                        <td
                          className="px-6  py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 "
                          onClick={(_e) => {
                            handleDelete(teacher.teacherId);
                          }}
                        >
                          <a className="text-blue-600">Delete</a>
                        </td>
                        <td className="px-6  py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 ">
                          <a
                            className="text-blue-600"
                            onClick={() => {
                              setSelectedSubjects(
                                Array.from(
                                  new Set(
                                    teacher.subjects.map((id: any) => id._id)
                                  )
                                )
                              );

                              openModal();
                              setEditingTeacher(teacher);
                            }}
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    </>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit teacher"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="font-bold text-center"
        >
          Edit Teacher
        </h2>
        <input
          type="text"
          name="name"
          value={editingTeacher.name}
          onChange={handleEdit}
        />
        <input
          type="email"
          name="email"
          value={editingTeacher.email}
          onChange={handleEdit}
        />
        <input
          type="date"
          name="dateEmployed"
          value={editingTeacher.dateEmployed}
          onChange={handleEdit}
        />
        <select
          name="formTeacher"
          value={editingTeacher.formTeacher}
          onChange={(e) => {
            setEditingTeacher({
              ...editingTeacher,
              formTeacher: e.target.value,
            });
          }}
          id=""
        >
          <option value="">not a form teacher</option>
          {classes.map((eachClass) => (
            <option>{eachClass.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter subjects..."
          value={subjectSearchQuery}
          onChange={(e) => setSubjectSearchQuery(e.target.value)}
          className="p-2 border rounded w-[100%]"
        />
        <div className="h-[150px] overflow-y-auto border  p-3">
          {filteredSubjects.map((subject) => {
            return (
              <div className="">
                <p
                  className={
                    selectedSubjects.includes(subject._id)
                      ? "text-blue-500"
                      : "text-black"
                  }
                  onClick={() => handleClickedSubjects(subject._id)}
                >
                  {subject.name}
                </p>
              </div>
            );
          })}
        </div>

        <button
          className="bg-green-700 text-white rounded p-2 absolute right-3"
          onClick={saveChangesClick}
        >
          save changes
        </button>
        <button
          onClick={closeModal}
          className="bg-red-900 p-2 rounded text-white"
        >
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </button>
      </Modal>
    </div>
  );
};
export default AllTeachers;
