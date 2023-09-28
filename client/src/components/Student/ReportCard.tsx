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
  console.log(reportCardDetails.grades);
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
  console.log(reportCardDetails)
  return (
    <div className="h-full font-mono   ">
      <h1 className="text-xl uppercase text-center">Report Card</h1>
      <h1 className="text-lg uppercase text-center">
        {reportCardDetails?.school||"SCHOOL"}
      </h1>
      <h1 className="text-md uppercase text-center">
        {selectedReportDetails.termName} RESULT
      </h1>
      <img src={logo || imgDefault} alt="" className="w-[3.4em]" />
      <div className="p-3">
        <p>
          <span className="font-bold ">STUDENTS NAME:</span>
          <span className="underline capitalize">{reportCardDetails.name}</span>
        </p>
        <p>
          <span className="font-bold ">SCHOOL YEAR:</span>
          <span className="underline capitalize">
            {selectedReportDetails.yearName}
          </span>
        </p>
        <p>
          <span className="font-bold ">CLASS NAME:</span>
          <span className="underline capitalize">
            {reportCardDetails.class}
          </span>
        </p>
        <p>
          <span className="font-bold ">AVERAGE:</span>
          <span className="underline capitalize">
            {reportCardDetails.average}
          </span>
        </p>
      </div>

      <div>
        <h1 className="text-2xl text center w-full border text-center bg-gray-500  mb-[25px] text-white rounded">
          SUBJECTS
        </h1>
        <div>
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="truncate text-xs sm:text-base md:text-lg lg:text-xl text-white py-2 ">
                  Subject
                </th>
                <th className="truncate text-xs sm:text-base md:text-lg lg:text-xl text-white py-2 ">
                  CA1
                </th>
                <th className="truncate text-xs sm:text-base md:text-lg lg:text-xl text-white py-2 ">
                  CA2
                </th>
                <th className="truncate text-xs sm:text-base md:text-lg lg:text-xl text-white py-2 ">
                  CA3
                </th>
                <th className="truncate text-xs sm:text-base md:text-lg lg:text-xl text-white py-2 ">
                  Exam Score
                </th>
                <th className="truncate text-xs sm:text-base md:text-lg lg:text-xl text-white py-2 ">
                  Total
                </th>
                <th className="truncate text-xs sm:text-base md:text-lg lg:text-xl text-white py-2 ">
                  Letter Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {reportCardDetails?.grades?.map((grade: any) => {
                {
                  console.log(grade?.subjectId);
                }
                return (
                  <tr>
                    <td className="truncate text-xs  text-center sm:text-base md:text-lg lg:text-xl">
                      {grade?.subjectId?.subject || "subjectName"}
                    </td>
                    <td className="truncate text-xs text-center py-1 sm:text-base md:text-lg lg:text-xl">
                      {grade?.CA1}
                    </td>
                    <td className="truncate text-xs text-center sm:text-base md:text-lg lg:text-xl">
                      {grade?.CA2}
                    </td>
                    <td className="truncate text-xs text-center sm:text-base md:text-lg lg:text-xl">
                      {grade?.CA3}
                    </td>
                    <td className="truncate text-xs text-center sm:text-base md:text-lg lg:text-xl">
                      {grade?.examScore}
                    </td>
                    <td className="truncate text-xs text-center sm:text-base md:text-lg lg:text-xl">
                      {grade?.total}
                    </td>
                    <td className="truncate text-xs text-center sm:text-base md:text-lg lg:text-xl">
                      {grade?.letterGrade}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
