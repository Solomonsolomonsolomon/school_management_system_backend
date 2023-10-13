import React from "react";
import Profile from "../components/Admin/Profile";
import Sidebar from "../components/Student/Sidebar";
import Results from "../components/Student/Results";
import PayFees from "../components/Student/PayFees";
import SubStudent from "../components/Student/Substudent";
import AllResults from "../components/Student/AllResults";
import Transaction from "../components/Student/Transactions";
import Attendance from "../components/Student/Attendance";

let components: any = {
  dashboard: SubStudent,
  viewresult: Results,
  payfees: PayFees,
  allresults: AllResults,
  transactions:Transaction,
  attendance:Attendance
};

function Student() {
  const [view, setView] = React.useState("dashboard");
  const Selected = components[view];

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
        <main className="flex-1 overflow-x-hidden overflow-y-auto dark:text-white dark:bg-gray-700">
          <div className="container mx-auto py-6 px-4">
            <Selected />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Student;
