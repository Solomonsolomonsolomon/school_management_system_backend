import React from "react";
import Profile from "../components/Admin/Profile";
import Sidebar from "../components/Teacher/Navbar";

let components: any = {
  dashboard: Profile,
};
function Student() {
  let [view, setView] = React.useState("dashboard");
  let Selected = components[view];

  return (
    <div>
      <Profile />
      <Sidebar setView={setView} />
      <Selected />
  
    </div>
  );
}

export default Student;
