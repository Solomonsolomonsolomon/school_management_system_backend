import axios from "../api/axios";
import Navbar from "./Admin/Navbar";
import Profile from "./Admin/Profile";
import SubAdmin from "./Admin/SubAdmin";
import React from "react";
import AddStudent from "./Admin/AddStudent";
import AllStudents from "./Admin/AllStudents";
import AddTeacher from "./Admin/AddTeacher";

import ClassLevel from "./ClassLevel";
import YearAndTerm from "./Admin/YearAndTerm";
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
