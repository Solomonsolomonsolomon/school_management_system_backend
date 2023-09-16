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
      <h1 className="italic">
        Please contact admin if any of the information below is incorrect or
        outdated
      </h1>
      <p className="italic underline uppercase">basic information</p>
      <div>
        <p className="flex justify-evenly">
          <span>FULL NAME</span>
          <span>{student.name}</span>
        </p>

        <p className="flex justify-evenly">
          <span>EMAIL</span>
          <span>{student.email}</span>
        </p>
        <p className="flex">{student.password}</p>
        <p className="flex"></p>
        <p className="flex"></p>
      </div>
    <p className="italic underline uppercase">transactions</p>
    
    </div>
  );
};

export default SubStudent;
