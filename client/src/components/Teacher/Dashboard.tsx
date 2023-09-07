import React from "react";
const userId = sessionStorage.getItem("user");
import axios from "./../../api/axios";
let id = { _id: "" };
if (userId) {
  id = JSON.parse(userId ? userId : "{_id:``}");
}
let _id = id._id;

let baseUrl = "/teacher";

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
        setSubjectsTaught(res.data?.setSubjectsTaught);
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
        {formStudents.map((students: any, index) => {
          return (
            <>
              <p key={students.name + index}>{students.name}</p>
            </>
          );
        })}
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
