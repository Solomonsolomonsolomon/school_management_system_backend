import AddStudent from "./Bus/AddStudentToBus";
import React from "react";
import BusNavBar from "./Bus/Navbar";
import RegisterSchoolDetails from "./Bus/RegisterSchoolDetails";
import AllStudentsTakingBus from "./Bus/AllStudentsTakingBus";
let component: any = {
  navbar:BusNavBar,
  registerstudentforbus: AddStudent,
  registerschooldetails:RegisterSchoolDetails,
  allstudentstakingbus:AllStudentsTakingBus
};
const Bus = () => {
  let [view, setView] = React.useState<string>("navbar");
  let Selected = component[view];
  return (
    <>
      <p className="text-center font-bold">
        Welcome to the bus Management System
      
      </p>
  
     
      <Selected setView={setView} />
    </>
  );
};
export default Bus;
