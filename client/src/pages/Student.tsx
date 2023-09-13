import React from "react";
import Profile from "../components/Admin/Profile";
import Sidebar from "../components/Student/Sidebar";
import Results from "../components/Student/Results";
import PayFees from "../components/Student/PayFees";
let components: any = {
  dashboard: Profile,
  viewresult:Results,
  payfees:PayFees
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
