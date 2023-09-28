import React from "react";
import Button from "../Button/Button";
import axios from "./../../api/axios";
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
const EditAttendance: React.FC<{
  selectedDetails: any;
  selectedStudent: Student | null;
}> = ({ selectedDetails, selectedStudent }) => {
  const { date } = selectedDetails;

  const [attendanceDetails, setAttendanceDetails] = React.useState<
    Attendance[]
  >([]);
  const [attendanceStatus, setAttendanceStatus] = React.useState<string>("");

  let [msg, setMsg] = React.useState<string>("");
  const handleAttendanceStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAttendanceStatus(e.target.value);
  };

  const handleRecordAttendance = async () => {
    // Create a new attendance record or update an existing record
    const newAttendance: Attendance = {
      studentId: selectedStudent?._id || "",
      date,
      studentName: selectedStudent?.name || "",
      status: attendanceStatus,
      class: selectedStudent?.className || "", // Assuming className is available
    };

    try {
      await axios
        .put(
          `/attendance/edit/${selectedStudent?._id}/${selectedStudent?.className}`,
          newAttendance
        )
        .then((response) => {
          // Update the attendance details in the state
          setAttendanceDetails([...attendanceDetails, newAttendance]);
          //   closeModal();
          setMsg(response.data?.msg || "attendance updated successfully");
        })
        .catch((err) => {
          throw err;
        });
    } catch (error: any) {
      //closeModal();
      setMsg(error?.response?.data?.msg || "failed to update attendance");
    }
  };

  return (
    <>
      <p>
        {msg ||
          `
        You want to edit attendance for ${selectedStudent?.name} on
        ${date}`}
      </p>
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
          <Button buttontype={1}>Edit</Button>
        </span>
      </form>
    </>
  );
};

export default EditAttendance;
