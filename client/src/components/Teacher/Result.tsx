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
  React.useEffect(() => {
    if (confirmable) {
      console.log(confirmable);
      (async () => {
        try {
          setLoading(true);
          let res = await axios.get(`${resultUrl}/teacher/generate/${id}`);
          console.log(res);
          setMsg(res.data?.msg);
          console.log(res?.data?.results.cummulativeScore);
          setSavePreview({
            cummulativeData: res?.data?.results?.cummulativeScore?.sort(
              (a: any, b: any) => b.totalScore - a.totalScore
            ),
            groupedData: Object.values(res.data?.results?.groupedData).flat(),
          });
        } catch (error: any) {
          setMsg(error?.response?.data?.msg || error.message);
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
      <p>{msg}</p>
      <p
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
      </p>
      <p
        onClick={() => {
          setConfirmModal(true);
          setTracker(Date.now());
        }}
        className="font-bold italic capitalize text-blue-500 cursor-pointer"
      >
        compute results
      </p>

      {/* //preview */}
      {savePreview.cummulativeData?.length && (
        <>
          <p className="capitalize text-center font-bold">
            cummulative scores(all terms sum)
          </p>
          {savePreview.cummulativeData?.map((data, i) => {
        
            return (
              <>
                <p>
                  {data.name}{" "}
                  <span>
                    {data.totalScore}
                    <span className="text-green-500 p-2 ml-1"> {i === 0 ? "HIGHEST" : ""}</span>
                  </span>
                </p>
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
