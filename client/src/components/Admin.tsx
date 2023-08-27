import axios from "../api/axios";
import Navbar from "./Admin/Navbar";
import Profile from "./Admin/Profile";
import SubAdmin from "./Admin/SubAdmin";
import React from "react";
import AddStudent from "./Admin/AddStudent";
import AllStudents from "./Admin/AllStudents";
const GET_URL = "/admin";
interface IComponents {
  subadmin: React.FC;
  profile?: string;
}
let components: any = {
  subadmin: SubAdmin,
  addstudent: AddStudent,
  allstudents:AllStudents
};
const Admin = () => {
 
  let [view, setView] = React.useState("subadmin");

  let Selected = components[view];
  console.log(Selected);

  return (
    <div className="grid md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%] w-screen ">
      <Navbar setView={setView} />
      <main className="container">
        <Profile />
        <Selected />
      </main>
    </div>
  );
};

export default Admin;
