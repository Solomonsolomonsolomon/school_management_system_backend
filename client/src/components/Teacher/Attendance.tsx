import React, { useState } from "react";
import axios from "../../api/axios";
import Modal from "react-modal";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import EditAttendance from "./EditAttendance";
import Loading from "../Loading";

interface Student {
  _id: string;
  name: string;
  className: string;
}

interface Attendance {
  studentId: string;
  studentName?: string;
  date: string;
  status: string;
  class: string;
}

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

let subtitle: any;
subtitle;
let baseUrl = "/teacher";
const userId = sessionStorage.getItem("user");
let id = { _id: "" };
if (userId) {
  id = JSON.parse(userId ? userId : "{_id:``}");
}
let _id = id._id;
const AttendanceManagement: React.FC = () => {
  const [formStudents, setFormStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [query, setQuery] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [attendanceDetails, setAttendanceDetails] = useState<Attendance[]>([]);
  const [attendanceStatus, setAttendanceStatus] = useState<string>("");
  let [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);
  let focusRef = React.useRef<HTMLInputElement>(null);
  let msgRef = React.useRef<HTMLParagraphElement>(null);
  let [isLoading, setLoading] = React.useState<boolean>(false);
  let [msg, setMsg] = React.useState<string>("");

  let [editDetails, setEditDetails] = React.useState<any>({
    date: "",
    status: "",
    _id: "",
  });
  let date = new Date().toISOString().split("T")[0];

  const closeModal = () => {
    setQuery("");
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  React.useEffect(() => {
    managedStudents();
    async function managedStudents() {
      let ref = msgRef;
      try {
        let res = await axios.get(`${baseUrl}/${_id}/get/students`);
        ref.current
          ? (ref.current.textContent = res.data?.msg || "Form Students here")
          : "";
        setFormStudents(res.data?.formStudents);
      } catch (error: any) {
        console.log(error);
        ref.current
          ? (ref.current.textContent =
              error?.response?.data?.msg ||
              error?.message ||
              "Error in getting information")
          : "";
      }
    }
  }, []);

  const handleStudentSelect = async (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    // Fetch attendance details for the selected student
    try {
      let response = await axios.get(
        `/attendance/get/${student._id}/${student.className}`
      );
      console.log(response);
      setAttendanceDetails([...response.data?.attendance?.attendanceDetails]);
    } catch (error) {
      console.error(error);
      setAttendanceDetails([]);
    } finally {
      console.log(attendanceDetails);
    }
  };

  const filtered = formStudents.filter((data) => {
    return data.name
      .toUpperCase()
      .split(" ")
      .join("")
      .split("_")
      .join("")
      .includes(query.toUpperCase().split(" ").join(""));
  });
  const handleAttendanceStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAttendanceStatus(e.target.value);
  };

  const handleRecordAttendance = async () => {
    const newAttendance: Attendance = {
      studentId: selectedStudent?._id || "",
      date,
      studentName: selectedStudent?.name || "",
      status: attendanceStatus,
      class: selectedStudent?.className || "",
    };

    try {
      setLoading(true);
      let response = await axios.post(
        `/attendance/new/${selectedStudent?._id}/${selectedStudent?.className}`,
        newAttendance
      );

      console.log(",,");
      //  setAttendanceDetails([...attendanceDetails, newAttendance]);
      closeModal();

      setMsg(response.data?.msg || "attendance added successfully");
    } catch (error: any) {
      closeModal();
      setMsg(error?.response?.data?.msg || "");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleEditModalOpen = (data: any) => {
    setIsEditModalOpen(true);
    setEditDetails(data);
  };
  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-center font-bold">Attendance Management</h1>
      <p ref={msgRef} className="font-bold text-center capitalize"></p>
      <p className="font-bold text-center capitalize text-sm ">{msg}</p>
      <div>
        <h2 className="text-center italic font-bold text-xs">
          Select a Student
        </h2>
        <input
          type="search"
          className="border border-black  rounded-2xl p-2 w-full"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            focusRef.current ? focusRef.current.focus() : "";
          }}
          placeholder={`search student...`}
          ref={focusRef}
        />
        <ul className="mt-4">
          {filtered.map((student) => (
            <li key={student._id} onClick={() => handleStudentSelect(student)}>
              {student.name}
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {!isEditModalOpen ? (
          <>
            {" "}
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className="text-center text-sm"
            >
              Modify attendance
            </h2>
            <p ref={msgRef}></p>
            {selectedStudent && (
              <div>
                <h2 className="font-bold mb-2">
                  Record Attendance for {selectedStudent.name}
                </h2>
                <div>
                  <p>date:{date}</p>
                  <form onSubmit={handleRecordAttendance}>
                    {" "}
                    <select
                      onChange={handleAttendanceStatusChange}
                      required
                      value={attendanceStatus}
                    >
                      <option value="">select status</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                      <option value="excused">Excused</option>
                    </select>
                    <span className="mx-2">
                      {" "}
                      <Button buttontype={1}>Record</Button>
                    </span>
                  </form>
                </div>
                <div>
                  <h3 className="text-center font-bold mt-2 underline">
                    Attendance Details
                  </h3>
                  <div className="">
                    {!attendanceDetails.length ? (
                      <p className="text-center">No attendance found</p>
                    ) : (
                      <div className="rounded h-[200px]">
                        <div className="overflow-x-auto  rounded bg-white">
                          <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border rounded">
                            <thead className="bg-gray-50 dark:bg-gray-700 rounded border">
                              <tr>
                                <th className="py-3 px-4 pr-0">
                                  {/* Checkbox input */}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Edit
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {attendanceDetails.map(
                                (record: any, index: number) => (
                                  <tr key={index}>
                                    <td className="py-3 pl-4">
                                      <div className="flex items-center h-5"></div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                      {record.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {record.status}
                                    </td>
                                    <td
                                      className="px-6 py-4 whitespace-nowrap text-sm text-blue-900 dark:text-gray-200"
                                      onClick={() =>
                                        handleEditModalOpen(record)
                                      }
                                    >
                                      edit
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <EditAttendance
            selectedDetails={editDetails}
            selectedStudent={selectedStudent}
          />
        )}

        <div className="absolute top-1 right-1">
          <Button buttontype={2} onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} size="sm"></FontAwesomeIcon>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AttendanceManagement;
