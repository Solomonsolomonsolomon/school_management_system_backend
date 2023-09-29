import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
//import { tobase64 } from "./AddStudent";
import Button from "../Button/Button";

const postUrl = "/admin";
function AllStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  let [updateUI, setUpdateUI] = useState<number>(0);
  let errRef = React.useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudents() {
      try {
        setLoading(true);
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
  }, [updateUI]);

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

  if (loading) {
    return <Loading />;
  }

  const openEditModal = (student: any) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingStudent(null);
  };
  const editStudent = (student: any) => {
    editTheStudent();
    async function editTheStudent() {
      try {
        let editStudent = await axios.put(
          `${postUrl}/edit/student/${student.studentId}`,
          student
        );

        console.log(student.currentClassLevel, student.currentClassArm);
        errRef.current
          ? (errRef.current.textContent = editStudent.data?.msg)
          : "";
        setUpdateUI((prev) => prev+1);
      } catch (error: any) {
        console.log(error);
        errRef.current
          ? (errRef.current.textContent = error?.response?.data?.msg)
          : "";
      }
    }
  };
  return (
    <div className="dark:bg-gray-900 border  w-[200px]sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px]">
      {/* Edit Modal */}
      {isEditModalOpen && editingStudent && (
        <div className="dark:bg-gray-900  border-gray-200 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="dark:bg-gray-900  bg-white p-4 rounded-md shadow-md">
            <h2 className="dark:bg-gray-900  text-lg font-semibold mb-4">
              Edit Student
            </h2>
            {/* Here you can render the form for editing student data */}
            <div>
              <p>Edit student data here</p>
              {/* Example fields: */}
              <input
                type="text"
                placeholder="Name"
                value={editingStudent.name}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    name: e.target.value,
                  })
                }
                className="dark:bg-gray-900 ` w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Email"
                value={editingStudent.email}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    email: e.target.value,
                  })
                }
                className="dark:bg-gray-900  w-full p-2  border rounded"
              />
              <input
                type="password"
                placeholder="password"
                value={editingStudent.password}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    password: e.target.value,
                  })
                }
                className="dark:bg-gray-900  w-full p-2  border rounded"
              />
              {/* <input
                type="file"
                name="picture"
                id=""
                onChange={async (e) => {
                  console.log(e.target.files?.length);
                  if (e.target.files?.length) {
                    if (e.target.files[0].type.startsWith("image")) {
                      let picture = await tobase64(e.target.files[0]);
                      setEditingStudent({
                        ...editingStudent,
                        picture,
                      });
                    }
                  }
                }}
              /> */}
              {/*gender */}
              <select
                name="gender"
                className="dark:bg-gray-900 border rounded border-gray-400"
                onChange={(e) => {
                  setEditingStudent({
                    ...editingStudent,
                    gender: e.target.value,
                  });
                }}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              {/* current class Level */}
              <select
                className="dark:bg-gray-900  border rounded border-gray-400"
                defaultValue=""
                onChange={(e) => {
                  setEditingStudent({
                    ...editingStudent,
                    currentClassLevel: e.target.value,
                  });
                }}
              >
                <option value="">class</option>
                <option value="NUR1">NUR1</option>
                <option value="NUR2">NUR2</option>
                <option value="NUR3">NUR3</option>
                <option value="PRY1">PRY1</option>
                <option value="PRY2">PRY2</option>
                <option value="PRY3">PRY3</option>
                <option value="PRY4">PRY4</option>
                <option value="PRY5">PRY5</option>
                <option value="PRY6">PRY6</option>
                <option value="JSS1">JSS1</option>
                <option value="JSS2">JSS2</option>
                <option value="JSS3">JSS3</option>
                <option value="SSS1">SSS1</option>
                <option value="SSS2">SSS2</option>
                <option value="SSS3">SSS3</option>
              </select>
              {/*current class Arm*/}{" "}
              <select
                className="dark:bg-gray-900  border rounded border-gray-400"
                defaultValue=""
                onChange={(e) => {
                  setEditingStudent({
                    ...editingStudent,
                    currentClassArm: e.target.value,
                  });
                }}
              >
                {" "}
                <option value="">select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
                <option value="H">H</option>
                <option value="I">I</option>
                <option value="J">J</option>
                <option value="K">K</option>
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="N">N</option>
                <option value="O">O</option>
                <option value="P">P</option>
              </select>
              {/* Add more input fields for other data */}
            </div>
            {/* payment information */}

            <div>
              <p className="font-bold">Financial Details</p>
              <form action="">
                <label htmlFor="payment details">Fees Status</label>
                <select
                  name=""
                  id=""
                  className="bg-inherit border mx-2 p-1 dark:bg-gray-700"
                  onChange={(e) => {
                    setEditingStudent({
                      ...editingStudent,
                      isPaid: e.target.value,
                    });
                  }}
                >
                  <option value="">select</option>
                  <option value="true">paid</option>
                  <option value="false">unpaid</option>
                </select>
              </form>
              <input
                type="number"
                placeholder="amount deposited"
                className="bg-inherit p-2 rounded mt-1 border"
                onChange={(e) => {
                  setEditingStudent({
                    ...editingStudent,
                    amount: e.target.value,
                  });
                }}
              />
            </div>
            <div className="dark:bg-gray-900  mt-4 flex justify-end">
              <Button
                buttontype={3}
                onClick={() => {
                  // Here you can implement the update logic
                  editStudent(editingStudent);
                  console.log("Update student data:", editingStudent);
                  closeEditModal();
                }}
              >
                Update
              </Button>
              <div className="dark:bg-gray-900  ml-2">
                {" "}
                <Button buttontype={2} onClick={closeEditModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1>ALL STUDENTS</h1>
      <p>
        here you can view all students,search for particular student or
        groups,edit or delete
      </p>
      <div className="dark:bg-gray-900  flex flex-col border p-10 ">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search for students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="dark:bg-gray-900  p-2 border rounded"
        />
        <p ref={errRef}></p>
        {/* Table */}
        <div className="dark:bg-gray-900  overflow-x-auto">
          <table className="dark:bg-gray-900  divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
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
        </div>
      </div>
    </div>
  );
}

export default AllStudents;
