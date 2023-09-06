import Profile from "../components/Admin/Profile";
import Sidebar from "../components/Teacher/Navbar";
import AddStudent from "../components/Admin/AddStudent";
import React from "react";
import Loading from "../components/Loading";
import RegisterClass from "../components/Teacher/RegisterSubject";
interface IComponents {
  dashboard: React.FC;
}
let components: any = {
  dashboard: Loading,
  addstudent: AddStudent,
  registerclass: RegisterClass,
};
function Teacher() {
  let [view, setView] = React.useState("dashboard");

  let Selected = components[view];

  return (
    <div className="font-mono">
      <Profile />
      <Sidebar setView={setView} />
      <Selected />
    </div>
  );
}

export default Teacher;
