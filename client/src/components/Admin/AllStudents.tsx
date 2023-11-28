import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
//import { tobase64 } from "./AddStudent";
import NotFoundComponent from "../../utils/404Component";
import PaginationController from "../../utils/PaginationController";
import EditStudent from "./EditStudent";
import AllStudentsTable from "./AllStudentsTable";
import AllStudentsSearch from "./AllStudentsSearch";

const postUrl = "/admin";
function AllStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [updateUI, setUpdateUI] = useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const errRef = React.useRef<HTMLParagraphElement>(null);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [filteredStudents, setFilteredStudents] = React.useState<any[]>([]);
  const searchbarSubmit = async (searchParams: string) => {
    try {
      let res = await axios.get(`${postUrl}/search/student/${searchParams}`);
      console.log(res);
      setFilteredStudents(res?.data?.student);
    } catch (error) {
      setFilteredStudents([]);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    async function fetchStudents() {
      try {
        setLoading(true);
        const studentResponse = await axios.get(
          `/admin/get/student?pageSize=2&page=${page}`,
          {
            signal: controller.signal,
          }
        );
        setStudents(studentResponse?.data?.student);
        setFilteredStudents(studentResponse?.data?.student);
        setTotalPages(studentResponse?.data?.totalPages);
        errRef.current ? (errRef.current.textContent = "") : "";
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        if (error.name === "AbortError" || error.name === "CanceledError")
          return;
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
  }, [updateUI, page]);

  // const filteredStudents = students.filter((student: any) => {
  //   console.log(student?.studentId);
  //   const searchTerm = searchQuery.toLowerCase();
  //   return (
  //     student.name.toLowerCase().includes(searchTerm) ||
  //     student.email.toLowerCase().includes(searchTerm) ||
  //     student.gender.toLowerCase().includes(searchTerm) ||
  //     student.currentClassLevel.toLowerCase().includes(searchTerm) ||
  //     student.currentClassArm.toLowerCase().includes(searchTerm) ||
  //     `${student.currentClassLevel.toLowerCase()}${student.currentClassArm.toLowerCase()}`.includes(
  //       searchTerm
  //     ) ||
  //     student.studentId.toLowerCase().includes(searchTerm)
  //   );
  // });

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
        setUpdateUI((prev) => prev + 1);
      } catch (error: any) {
        console.log(error);
        errRef.current
          ? (errRef.current.textContent = error?.response?.data?.msg)
          : "";
      }
    }
  };
  return (
    <>
      {students.length ? (
        <div className="dark:bg-gray-900 border w-[100vw]">
          {/* Edit Modal */}
          {isEditModalOpen && editingStudent && (
            <EditStudent
              closeEditModal={closeEditModal}
              editStudent={editStudent}
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
            />
          )}
          <h1>ALL STUDENTS</h1>
          <p className="p-5">
            here you can view all students,search for particular student or
            groups,edit or delete
          </p>
          <div className="dark:bg-gray-900  flex flex-col border p-3 lg:w-[80vw] sm:w-full">
            {/* Search bar */}
            <AllStudentsSearch
              searchQuery={searchQuery}
              searchbarSubmit={searchbarSubmit}
              setSearchQuery={setSearchQuery}
            />
            <p ref={errRef}></p>
            {/* Table */}
            <div className="dark:bg-gray-900  overflow-x-auto overflow-visible ">
              <AllStudentsTable
                errRef={errRef}
                filteredStudents={filteredStudents}
                openEditModal={openEditModal}
                setStudents={setStudents}
                students={students}
              />
            </div>
            <PaginationController
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      ) : (
        <NotFoundComponent>
          {errRef.current?.textContent || "No students found"}
        </NotFoundComponent>
      )}
    </>
  );
}

export default AllStudents;
