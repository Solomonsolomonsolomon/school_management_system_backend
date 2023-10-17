import Navbar from "../components/Admin/Navbar";
import Profile from "../components/Admin/Profile";
import SubAdmin from "../components/Admin/SubAdmin";
import React from "react";
import AddStudent from "../components/Admin/AddStudent";
import AllStudents from "../components/Admin/AllStudents";
import AddTeacher from "../components/Admin/AddTeacher";
import AllTeachers from "../components/Admin/AllTeachers";
import Subjects from "../components/Admin/Subjects";
import ClassLevel from "../components/ClassLevel";
import YearAndTerm from "../components/Admin/YearAndTerm";
import AddAdmin from "../components/Admin/AddAdmin";
import AllAdmin from "../components/Admin/AllAdmin";
import Settings from "../components/Admin/Settings";
import Hamburger from "../components/Admin/Hamburger";
import Expense from "../components/Admin/Expense";
import Subscription from "../components/Admin/Subscriptions";
import Bus from "../components/Admin/BusMangement";
import Messages from "../components/Messages";
//const GET_URL = "/admin";
let components: any = {
  subadmin: SubAdmin,
  addstudent: AddStudent,
  allstudents: AllStudents,
  classlevel: ClassLevel,
  addteacher: AddTeacher,
  allteachers: AllTeachers,
  yearandterm: YearAndTerm,
  subjects: Subjects,
  addadmin: AddAdmin,
  alladmin: AllAdmin,
  settings: Settings,
  expenses: Expense,
  subscription:Subscription,
  busmanagement:Bus,
  messages:Messages
};
const Admin = () => {
  let [view, setView] = React.useState("subadmin");

  let Selected = components[view];

  return (
    <>
      <div
        id="adminpage"
        className="grid  md:grid-cols-[12%_87%] lg:grid-cols-[23%_77%] xl:grid-cols-[18%_82%] w-full overflow-y-hidden"
      >
        <div className="mx-1  hidden lg:block md:block xl:block relative">
          {" "}
          <Navbar setView={setView} />
        </div>
        <main className="container">
          <section className="overflow-y-auto h-[100vh] flex flex-col  ">
            <header className=" border-b-2 border-gray-200 py-4 shadow  ">
              <div className=" mx-auto px-2 py-0  w-full  ">
                <Profile />
              </div>
            </header>
            <div className="overflow-x-hidden">
              {" "}
              <Selected />
            </div>
          </section>
        </main>
        <Hamburger setView={setView} />
      </div>
    </>
  );
};

export default Admin;
