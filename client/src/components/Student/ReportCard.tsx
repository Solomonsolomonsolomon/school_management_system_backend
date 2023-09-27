import React from "react";
let schoolUrl = "/school";
import axios from "../../api/axios";
import imgDefault from "./../../assets/undraw_real_time_sync_re_nky7.svg";
interface Ivalues {
  reportCardDetails: any;
  selectedReportDetails: any;
}
const ReportCard: React.FC<Ivalues> = ({
  reportCardDetails,
  selectedReportDetails,
}) => {
  let [logo, setLogo] = React.useState<string>("");
  React.useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${schoolUrl}/logo/current`);
        console.log(res);
        setLogo(res.data?.logo);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <div className="flex gap-8 justify-between border-y-0 border-x-0 border border-b-2 border-gray-800 p-1">
        <p>School Name here Lorem ipsum dolor sit amet.</p>
        <img src={logo || imgDefault} alt="" className="w-[3.4em]" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <p>
          <span>Year:{selectedReportDetails.yearName}</span>
        </p>
        <p>
          <span>Class:{reportCardDetails.class}</span>
        </p>
        <p>
          <span>Term:{selectedReportDetails.termName}</span>
        </p>
        <div className="grid">
          <p>Name:{reportCardDetails.name?.toUpperCase()}</p>
        </div>
        <div>
          <p>
            <span>Total Obtainable Average:100.00</span>
          </p>
          <div className="flex justify-between gap-6">
            <p>
              <span>obtained Average: {reportCardDetails.average}</span>
            </p>
            <p>
              <span>OverAll Grade: {reportCardDetails.overallGrade}</span>
            </p>
          </div>
        </div>
        <div>
          <h1>GRADES BREAKDOWN</h1>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
