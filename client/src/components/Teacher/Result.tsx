import React from "react";
import Loading from "../Loading";
import { noTimeOutInstance as axios } from "../../api/axios";
let resultUrl = "/result";

let parsed: any = {
  id: "",
};
let user = sessionStorage.getItem("user");
if (user) {
  parsed = JSON.parse(user);
}
let id: string = parsed._id;
interface Cummulative {
  name: string;
  totalScore: number;
  studentId: string;
  average: number;
  totalTerms: number;
}
interface Preview {
  cummulativeData?: Cummulative[];
  groupedData?: any[];
}
const Result = () => {
  const [confirmable, setConfirmable] = React.useState<boolean>(false);
  const [confirmModal, setConfirmModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  let [savePreview, setSavePreview] = React.useState<Preview>({
    cummulativeData: [],
    groupedData: [],
  });
  let [track, setTracker] = React.useState<number>(0);

  let [msg, setMsg] = React.useState<string>("");
  let [err, setErr] = React.useState<string>("");
  React.useEffect(() => {
    if (confirmable) {
      console.log(confirmable);
      (async () => {
        try {
          setLoading(true);
          let res = await axios.get(`${resultUrl}/teacher/generate/${id}`);
          console.log(res);
          setMsg(res.data?.msg);
          setErr("");
          console.log(res?.data?.results.cummulativeScore);
          setSavePreview({
            cummulativeData: res?.data?.results?.cummulativeScore?.sort(
              (a: any, b: any) => b.totalScore - a.totalScore
            ),
            groupedData: Object.values(res.data?.results?.groupedData).flat(),
          });
        } catch (error: any) {
          setErr(error?.response?.data?.msg || error.message);
          setMsg("");
        } finally {
          setLoading(false);
          setConfirmable(false);
          console.log(savePreview);
        }
      })();
    } else {
    }
  }, [confirmable, track]);
  if (loading) return <Loading />;
  if (confirmModal)
    return (
      <ConfirmModal
        confirmModal={setConfirmModal}
        confirmable={setConfirmable}
      />
    );
  return (
    <>
      <p className="uppercase font-bold text-center">Result here</p>
      <p className="text-center text-green-500">{msg}</p>
      <p className="text-center text-red-500">{err}</p>
      {/* <p
        className="font-bold italic capitalize text-blue-500 cursor-pointer "
        onClick={() => {
          if (savePreview.groupedData?.length) {
            console.log("already populated");
            console.log(savePreview.groupedData);
          } else {
            //calculate only if grouped data is empty
            setConfirmable(true);
          }
        }}
      >
        preview results
      </p> */}
      <p
        onClick={() => {
          setMsg("");
          setErr("");
          setConfirmModal(true);
          setTracker(Date.now());
        }}
        className="font-bold  capitalize text-blue-50 cursor-pointer p-3 border bg-green-500 w-fit rounded-xl"
      >
        compute and view results
      </p>

      {/* //preview */}
      {savePreview.cummulativeData?.length && (
        <>
          <p className="capitalize text-center font-bold">
            cummulative Average(all terms Average)
          </p>
          {savePreview.cummulativeData?.map((data, i) => {
            return (
              <>
                <p>
                  {data.name}{" "}
                  <span>
                    <span className="font-bold px-3">{data.average}</span> :
                    <span>
                      {" "}
                      <span className="opacity-50">
                        in {data.totalTerms}
                      </span>{" "}
                      {data.totalTerms === 1 ? "term" : "terms"}
                    </span>
                    <span className="text-green-500 p-2 ml-1">
                      {" "}
                      {i === 0 ? "HIGHEST" : ""}
                    </span>
                  </span>
                </p>
              </>
            );
          })}
          {/* terms result */}
          {savePreview.groupedData?.map<any>((_, index: number, arr: any[]) => {
            // console.log(arr[index]);
            return (
              <>
                <div className="overflow-x-auto">
                  <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      {/* table head */}
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {arr[index]?.studentId?.name}
                        </th>
                        {arr[index]?.grades?.map((grade:any,index:number) => {
                          return (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              {/* {arr[index].subjectId[]} */}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {/* {arr[index][1]
                        ? arr[index][1].map((subject: any) => {
                            return (
                              <>
                                {" "}
                                <tr
                                  key={subject._id}
                                  className="flex items-center justify-between h-5"
                                >
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {subject.subject}
                                  </td>

                                 
                                </tr>
                              </>
                            );
                          })
                        : ""} */}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

const ConfirmModal: React.FC<{
  confirmable: React.SetStateAction<any>;
  confirmModal: React.SetStateAction<any>;
}> = ({ confirmable, confirmModal }) => {
  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmable */}
      {/* const [confirmable,setConfirmable]=React.useState<boolean>(false);
    const [confirmModal,setConfirmModal]=React.useState<boolean>(false); */}

      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh]  ">
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-2xl h-fit box-border p-20">
          <h1 className="p-5 ">
            Are you sure you want to Compute Results for your classRoom
          </h1>

          <span className="absolute right-2">
            <button
              className="bg-blue-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(true);
                confirmModal(false);
              }}
            >
              Continue
            </button>
          </span>
          <span className="absolute left-2">
            {" "}
            <button
              className="bg-red-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(false);
                confirmModal(false);
              }}
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
export default Result;
