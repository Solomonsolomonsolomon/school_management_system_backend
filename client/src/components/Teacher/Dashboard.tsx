import React from "react";
const userId = sessionStorage.getItem("user");
import axios from "./../../api/axios";
let id = { _id: "" };
if (userId) {
  id = JSON.parse(userId ? userId : "{_id:``}");
}
let _id = id._id;

let baseUrl = "/teacher";
("/teacher/:id/get/students/taught");
const Dashboard: React.FC<{
  errRef: React.RefObject<HTMLParagraphElement>;
}> = ({ errRef }) => {
  let ref = React.useRef<HTMLParagraphElement>(null);
  let [formStudents, setFormStudents] = React.useState<any[]>([]);
  let [subjectsTaught, setSubjectsTaught] = React.useState<any[]>([]);
  console.log(errRef);
  React.useEffect(() => {
    managedStudents();
    async function managedStudents() {
      try {
        let res = await axios.get(`${baseUrl}/${_id}/get/students`);
        ref.current
          ? (ref.current.textContent = res.data?.msg || "Form Students here")
          : "";
        setFormStudents(res.data?.formStudents);
        console.log(res.data?.formStudents);
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
        ref.current
          ? (ref.current.textContent = res.data?.msg || "Form Students here")
          : "";
        console.log(res.data?.studentsTaught);
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
  return (
    <div>
      <p className="text-center font-bold" ref={ref}>
        FORM students loading....
      </p>
      <div className="border p-5 h-[300px]">
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
                  Class Level
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Action
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

                  <td className="text-blue-500">Edit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-center font-bold">Students Taught</p>
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
