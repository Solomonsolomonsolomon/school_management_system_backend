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
  

    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setView={setView} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar/Header */}
        <header className="bg-white border-b border-gray-200 p-4 shadow-md">
          <Profile />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto py-6 px-4">
            <Selected />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Teacher;
