import React from "react";
import axios from "../../../api/axios";
import Loading from "../../Loading";
import WarningComponent from "../../../utils/WarningComponent";
import Button from "../../Button/Button";
const adminUrl = "/admin";
import DeleteGrade from "../DeleteGrade";
const VolatileSettings: React.FC = () => {
  const [confirmable, setConfirmable] = React.useState<boolean>(false);
  const [confirmModal, setConfirmModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  let [openDeleteGradeModal, setOpenDeleteGradeModal] =
    React.useState<boolean>(false);

  let msgRef = React.useRef<HTMLParagraphElement>(null);
  let [clear, setClear] = React.useState<number>(0);
  React.useEffect(() => {
    if (confirmable) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${adminUrl}/reset/student/transaction`);
          console.log(res);
          let curr = msgRef.current;
          curr ? (curr.textContent = res.data?.msg || "successful reset") : "";
        } catch (error: any) {
          console.error(error);
          if (
            error.name == "AbortController" ||
            error.name == "CanceledController"
          )
            return;
          let curr = msgRef.current;
          curr
            ? (curr.textContent =
                error?.response?.data?.msg ||
                error?.message ||
                "error generating")
            : "";
        } finally {
          setLoading(false);
        }
      })();
    } else {
      let curr = msgRef.current;
      curr ? (curr.textContent = "") : "";
    }
  }, [clear, confirmable]);
  if (confirmModal)
    return (
      <ClearModal confirmable={setConfirmable} confirmModal={setConfirmModal} />
    );
  if (loading) return <Loading />;
  if(openDeleteGradeModal)return <DeleteGrade setOpenDeleteGradeModal={setOpenDeleteGradeModal}/>
  return (
    <div className="ml-2">
    
      <h1 className="text-red-800 font-bold uppercase text-center">
        Volatile Settings
      </h1>
      <WarningComponent>
        {" "}
        proceeding beyond this point is risky as actions here are often volatile
      </WarningComponent>

      <p className="text-center font-bold text-lg" ref={msgRef}></p>
      <div>
        <label htmlFor="">
          Reset students financial details(new term prep)
        </label>
        <button
          onClick={() => {
            setClear(Date.now());
            setConfirmModal(true);
          }}
          className="bg-red-900 p-2 rounded text-gray-50 hover:rounded-none"
        >
          clear
        </button>
      </div>
      <div>
        <label htmlFor="" className="mr-2">
          Delete Student Grade
        </label>
        <Button
          buttontype={2}
          onClick={() => {
            setOpenDeleteGradeModal(true);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const ClearModal: React.FC<{
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
            Are you sure you want to proceed.this action is irreversible
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
export default VolatileSettings;
