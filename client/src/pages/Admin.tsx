import axios from "../api/axios";
import Navbar from "../components/Admin/Navbar";
import Profile from "../components/Admin/Profile";
import SubAdmin from "../components/Admin/SubAdmin";
import React from "react";
import AddStudent from "../components/Admin/AddStudent";
import AllStudents from "../components/Admin/AllStudents";
import AddTeacher from "../components/Admin/AddTeacher";
import Subjects from "../components/Admin/Subjects";
import ClassLevel from "../components/ClassLevel";
import YearAndTerm from "../components/Admin/YearAndTerm";
const GET_URL = "/admin";
interface IComponents {
  subadmin: React.FC;
  profile?: string;
}
let components: any = {
  subadmin: SubAdmin,
  addstudent: AddStudent,
  allstudents: AllStudents,
  classlevel: ClassLevel,
  addteacher: AddTeacher,
  yearandterm: YearAndTerm,
  subjects: Subjects,
};
const Admin = () => {
  let [view, setView] = React.useState("subadmin");

  let Selected = components[view];

  return (
    <div className="grid md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%] w-full ">
      <Navbar setView={setView} />
      <main className="container">
        <Profile />
        <Selected />
      </main>
    </div>
  );
};

export default Admin;