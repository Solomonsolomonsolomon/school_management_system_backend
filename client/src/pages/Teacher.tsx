import Profile from "../components/Admin/Profile";
import Sidebar from "../components/Teacher/Navbar";
import AddStudent from "../components/Admin/AddStudent";
import React from 'react'
import Loading from "../components/Loading";
interface IComponents{
    dashboard:React.FC
}
let components:any={
    dashboard:Loading,
     addstudent:AddStudent
}
function Teacher() {
    let [view, setView] =React.useState("dashboard");

    let Selected =components[view];

  return (
    <div>
      <Profile />
      <Sidebar setView={setView}/>
       <Selected/>
    </div>
  );
}

export default Teacher;
