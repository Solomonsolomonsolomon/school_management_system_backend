import React from "react";
const postUrl = "/admin";
import axios from "./../../api/axios";
interface AllStudentsTableProps {
  errRef: any;
  students: any;
  setStudents: any;
  filteredStudents: any;
  openEditModal: any;
}
const AllStudentsTable: React.FC<AllStudentsTableProps> = ({
  errRef,
  students,
  setStudents,
  filteredStudents,
  openEditModal,
}) => {
  return (
    <>
      {" "}
      <table className="dark:bg-gray-900  divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border ">
        <thead className="dark:bg-gray-900  bg-gray-50">
          <tr>
            <th className="dark:bg-gray-900  py-3 px-4 pr-0">
              {/* Checkbox input */}
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              StudentId
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Gender
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Class Level
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              FEES
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              BALANCE
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              PERCENTAGE PAID
            </th>
            <th className="dark:bg-gray-900  px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="dark:bg-gray-900  divide-y divide-gray-200 dark:divide-gray-700">
          {filteredStudents.map((student: any, index: number) => (
            <tr key={index}>
              <td className="dark:bg-gray-900  py-3 pl-4">
                <div className="dark:bg-gray-900  flex items-center h-5">
                  {/* ... Checkbox input ... */}
                </div>
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                {student.name}
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {student.email}
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {student.studentId}
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {student.gender === "M" ? "MALE" : "FEMALE"}
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {student.currentClassLevel}
                {student.currentClassArm}
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {student.isPaid ? "paid" : "unpaid"}
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {student.balance}
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {student.percentagePaid?.toFixed(2)}%
              </td>
              <td className="dark:bg-gray-900  px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                <a
                  className="dark:bg-gray-900  text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    let confirmable = window.confirm(
                      "are you sure,this action is permanent"
                    );
                    async function deleteIt() {
                      try {
                        let del = await axios.delete(
                          `${postUrl}/delete/student/${student.studentId}`
                        );
                        errRef.current
                          ? (errRef.current.textContent = del?.data?.msg)
                          : "";
                        // Refresh the list of students after deletion
                        const updatedStudents = students.filter(
                          (s: any) => s.studentId !== student.studentId
                        );
                        console.log(updatedStudents);
                        setStudents(updatedStudents);
                      } catch (error: any) {
                        console.log(error);
                        errRef.current
                          ? (errRef.current.textContent =
                              error.response?.data?.msg || error?.message)
                          : "";
                      }
                    }
                    if (confirmable) {
                      deleteIt();
                    } else {
                      console.log("user cancelled delete");
                    }
                  }}
                >
                  Delete
                </a>
              </td>
              <td
                className="dark:bg-gray-900  text-blue-500"
                onClick={() => {
                  openEditModal(student);
                }}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllStudentsTable;
