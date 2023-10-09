import Profile from "../components/Admin/Profile";
import Sidebar from "../components/Teacher/Navbar";
import AddStudent from "../components/Admin/AddStudent";
import React from "react";
import RegisterClass from "../components/Teacher/RegisterSubject";
import Dashboard from "../components/Teacher/Dashboard";
import AttendanceManagement from "../components/Teacher/Attendance";
import Result from "../components/Teacher/Result";
let components: any = {
  dashboard: Dashboard,
  addstudent: AddStudent,
  registerclass: RegisterClass,
  computeattendance:AttendanceManagement,
  computeresult:Result
};
function Teacher() {
  let [view, setView] = React.useState("dashboard");

  let Selected = components[view];

  return (
  

    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setView={setView} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar/Header */}
        <header className="bg-white border-b border-gray-200 p-4 shadow-md">
          <Profile />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto dark:bg-gray-900 bg-gray-50">
          <div className="container mx-auto py-6 px-4">
            <Selected />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Teacher;
