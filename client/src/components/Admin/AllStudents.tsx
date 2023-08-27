import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const postUrl = "/admin";
function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  let [studentId, setStudentId] = useState("");
  let errRef = React.useRef<HTMLParagraphElement>(null);
  console.log(studentId);
  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudents() {
      try {
        const studentResponse = await axios.get(`/admin/get/student`, {
          signal: controller.signal,
        });

        setStudents(studentResponse?.data?.student);
        errRef.current ? (errRef.current.textContent = "") : "";
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        errRef.current
          ? (errRef.current.textContent = error?.response?.data?.msg)
          : "";
      }
    }

    fetchStudents();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredStudents = students.filter((student: any) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.gender.toLowerCase().includes(searchTerm) ||
      student.currentClassLevel.toLowerCase().includes(searchTerm) ||
      student.currentClassArm.toLowerCase().includes(searchTerm) ||
      `${student.currentClassLevel.toLowerCase()}${student.currentClassArm.toLowerCase()}`.includes(
        searchTerm
      )
    );
  });

  if (loading) return <Loading />;

  async function clickDeleteButton() {}
  return (
    <div className="w-[90%]">
      <h1>ALL STUDENTS</h1>

      <div className="flex flex-col border p-10 ">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search for students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <p ref={errRef}></p>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 pr-0">{/* Checkbox input */}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Class Level
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((student: any, index) => (
                <tr key={index}>
                  <td className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      {/* ... Checkbox input ... */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {student.gender === "M" ? "MALE" : "FEMALE"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {student.currentClassLevel}
                    {student.currentClassArm}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                    <a
                      className="text-blue-500 hover:text-blue-700"
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
                              (s:any) => s.studentId !== student.studentId
                            );
                            setStudents(updatedStudents);
                          } catch (error: any) {
                            console.log(error);
                            errRef.current
                              ? (errRef.current.textContent =
                                  error.response?.data?.msg || error?.message)
                              : "";
                          }
                        }
                        if(confirmable){
                          deleteIt()
                        }else{
                          console.log('user cancelled delete')
                        }
                      }}
                  
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllStudents;
