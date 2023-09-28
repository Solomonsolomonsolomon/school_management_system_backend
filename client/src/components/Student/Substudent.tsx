import React from "react";
//import axios from "../../api/axios";
import Loading from "../Loading";

const SubStudent: React.FC = () => {
  let [student, setStudent] = React.useState<any>({
    name: "",
    email: "",
    className: "",
    age: "",
  });
  let [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    // let controller = new AbortController();
    async function getStudentInfo() {
      let studentInfo = sessionStorage.getItem("user");
      if (studentInfo) {
        let info = JSON.parse(studentInfo);
        console.log(student);
        setStudent(info);
      }
      setLoading(false);
    }
    getStudentInfo();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="dark:bg-gray-700 dark:text-white">
      <p className="font-bold text-center text-xl">
        Hello there {student?.name} 👋{" "}
      </p>
      <p className="font-bold text-center text-xl">
        what will you like to do today ❓{" "}
      </p>
      <div>
      
       
      </div>
    </div>
  );
};

export default SubStudent;
