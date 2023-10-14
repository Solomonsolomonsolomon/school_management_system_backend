import React, { Suspense } from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
let attendanceUrl = "/attendance";
let parsed: any = {
  id: "",
};
let user = sessionStorage.getItem("user");
if (user) {
  parsed = JSON.parse(user);
}
let id: string = parsed._id;

const Attendance: React.FC = () => {
  let [attendanceDetails, setAttendanceDetails] = React.useState<any>({});
  React.useEffect(() => {
    async function attendeancePercentage() {
      try {
        const res = await axios.get(`${attendanceUrl}/percentage/${id}`);
        console.log(res);
for(let i=0;i<10000;i++){
    console.log(i)
}
        setAttendanceDetails({ percentage: res?.data?.percentage });
      } catch (error) {}
    }
    attendeancePercentage();
  }, []);
  return (
    <>
      <Suspense fallback={<Loading />}>
        {" "}
        <h1 className="text-center ">Attendance details</h1>
        <p>percentage:{attendanceDetails?.percentage?.toFixed(2)}%</p>
      </Suspense>
    </>
  );
};

export default Attendance;
