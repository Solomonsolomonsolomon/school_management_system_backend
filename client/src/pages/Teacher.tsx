import Profile from "../components/Admin/Profile";
import Sidebar from "../components/Teacher/Navbar";
import AddStudent from "../components/Admin/AddStudent";
import React from "react";
import RegisterClass from "../components/Teacher/RegisterSubject";
import Dashboard from "../components/Teacher/Dashboard";
let components: any = {
  dashboard: Dashboard,
  addstudent: AddStudent,
  registerclass: RegisterClass,
};
function Teacher() {
  let [view, setView] = React.useState("dashboard");

  let Selected = components[view];

  return (
    <div className="text-sm">
      <Profile />
      <Sidebar setView={setView} />
      <Selected />
    </div>
  );
}

export default Teacher;
