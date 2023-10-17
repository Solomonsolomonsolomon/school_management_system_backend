import React from "react";
const userId = sessionStorage.getItem("user");
import axios from "./../../api/axios";
import EditGradesModal from "./EditGradesModal";
let id = { _id: "" };
if (userId) {
  id = JSON.parse(userId ? userId : "{_id:``}");
}
let _id = id._id;

let baseUrl = "/teacher";
let gradeUrl = "/grades";
("/teacher/:id/get/students/taught");
const Dashboard: React.FC<{
  errRef?: React.RefObject<HTMLParagraphElement>;
}> = ({}) => {
  let ref = React.useRef<HTMLParagraphElement>(null);
  let [formStudents, setFormStudents] = React.useState<any[]>([]);
  let [subjectsTaught, setSubjectsTaught] = React.useState<any>({});
  //edit
  let [updated, setUpdated] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = React.useState<any>(null);
  const handleEditClick = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const handleSaveGrades = (editedGrades: any) => {
    (async () => {
      try {
        await axios.post(`${gradeUrl}/add/${selectedStudent.studentId}`, {
          ...editedGrades,
          subjectId: selectedStudent.subjectId,
        });
        setUpdated(!updated);
      } catch (error) {
        console.log(error);
        setUpdated(!updated);
      }
    })();

    handleCloseModal();
  };

  React.useEffect(() => {
    managedStudents();
    async function managedStudents() {
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
  React.useEffect(() => {
    studentsTaught();
    async function studentsTaught() {
      try {
        let res = await axios.get(`${baseUrl}/${_id}/get/students/taught`);
        ref.current ? (ref.current.textContent = res.data?.msg || "here") : "";
        console.log(res.data?.studentsTaught);
        setSubjectsTaught(res.data?.studentsTaught);
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
  }, [updated]);
  return (
    <div>
      <p className="text-center font-bold" ref={ref}>
        FORM students loading....
      </p>
      <div
        className={`border p-5 ${formStudents.length ? "h-[300px]" : "h-fit"}`}
      >
        {formStudents.length ? (
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
                    StudentId
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Parent Name
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Fees
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Percentage Paid
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {formStudents.map((student: any, index: number) => (
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
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student.gender === "M" ? "MALE" : "FEMALE"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student.parent || "nil"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student.isPaid ? "paid" : "unpaid"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student?.balance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student?.percentagePaid?.toFixed(2)}%
                    </td>
                    <td className="text-blue-500">Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">you dont have any form students</p>
        )}
      </div>
      <p className="text-center font-bold">Students Taught</p>
      {Object.keys(subjectsTaught).map((subject) => (
        <div className="border p-5 h-[300px] overflow-x-auto" key={subject}>
          <div className="overflow-x-auto">
            <h2>{subject}</h2>
            <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    1CA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    2CA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    3CA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    EXAMS
                  </th>
                </tr>
              </thead>
              <tbody
                className="divide-y divide-gray-200 dark:divide-gray-700"
                key={subject}
              >
                {subjectsTaught[subject].map((student: any) => (
                  <tr key={student._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {student.CA1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {student.CA2}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {student.CA3}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {student.examScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {student.grade}
                    </td>

                    <td>
                      <a
                        onClick={(_) => handleEditClick(student)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit Grades
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedStudent ? (
            <EditGradesModal
              isOpen={isModalOpen}
              currentGrades={{
                CA1: selectedStudent!.CA1,
                CA2: selectedStudent!.CA2,
                CA3: selectedStudent!.CA3,
                examScore: selectedStudent!.examScore,
                name: selectedStudent!.name,
              }}
              onClose={handleCloseModal}
              onSave={handleSaveGrades}
            />
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

const TeacherDashboard: React.FC = () => {
  let errRef = React.useRef<HTMLParagraphElement>(null);
  return (
    <>
      <Dashboard errRef={errRef} />
    </>
  );
};
export default TeacherDashboard;
