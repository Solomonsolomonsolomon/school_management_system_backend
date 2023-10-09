import React from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
let baseUrl = "/subject";
interface State {
  loading: boolean;
  msg: any;
  data: any; // Update this type to match the actual shape of your data
}
interface Action {
  type: string;
  payload?: any;
  msg?: string | undefined;
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "saveData":
      return { ...state, data: action.payload, loading: false };
    case "startLoading":
      return { ...state, loading: true };
    case "stopLoading":
      return { ...state, loading: false };
    case "msg": {
      return { ...state, loading: false, msg: action.msg };
    }
    default:
      return state;
  }
}
const initialState = { loading: true, msg: "", data: {} };
const AllSubjects: React.FC = () => {
  let [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );
  React.useEffect(() => {
    let controller = new AbortController();
    allSubjects();

    async function allSubjects() {
      dispatch({ type: "startLoading" });
      try {
        let res = await axios.get(`${baseUrl}/get/all`, {
          signal: controller.signal,
        });
        console.log(res.data?.subjects);
        dispatch({ type: "saveData", payload: res.data?.subjects });
        const className = Object.keys(res.data?.subjects);
        console.log(className);
        console.log(state.data);
      } catch (error: any) {
        if (error.name == "AbortError" || error.name == "CanceledError") return;
        dispatch({
          type: "msg",
          msg: error?.response?.data?.msg || error.message,
        });
      }
    }
    return () => {
      controller.abort();
    };
  }, []);

  function handleSubjectDeletion(id: string) {
    let confirm = window.confirm(
      "Are you sure you want to delete subject.this action is irreversible"
    );
    async function deleteIt() {
      try {
        dispatch({ type: "startLoading" });
        let res = await axios.delete(`${baseUrl}/delete/${id}`);
        // Add this function inside your component
        updateUIAfterDeletion(id);
        function updateUIAfterDeletion(deletedSubjectId: string) {
          // Create a copy of the state data
          const newData = { ...state.data };

          // Loop through the classes in the data
          for (const className in newData) {
            if (newData.hasOwnProperty(className)) {
              // Filter out the deleted subject from the class's subjects
              newData[className] = newData[className].filter(
                (subject: any) => subject._id !== deletedSubjectId
              );

              // If the class is empty after deletion, you can remove the class key
              if (newData[className].length === 0) {
                delete newData[className];
              }
            }
          }

          // Update the component state with the modified data
          dispatch({ type: "saveData", payload: newData });
        }

        dispatch({ type: "msg", msg: res.data?.msg });
        // dispatch({ type: "stopLoading" });
      } catch (error: any) {
        dispatch({
          type: "msg",
          msg: error?.response?.data?.msg || error?.message,
        });
      }
    }
    if (confirm) deleteIt();
  }
  if (state.loading) return <Loading />;
  return (
    <>
      <div className="w-[200px]sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px] grid gap-5 justify-items-center">
        {/* <p className="text-center">
          please note subjects are view-only you cannot edit or delete
        </p> */}

        <p className="text-center  capitalize font-bold mt-2">
          all subjects sorted by class
        </p>
        <p className="text-center font-bold">{state.msg}</p>
        {/* Table */}
        {Object.entries(state.data).map<any>((_, index, arr: any[]) => {
          // console.log(arr[index]);
          return (
            <>
              <div className="overflow-x-auto">
                <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    {/* table head */}
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {arr[index][0]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {arr[index][1]
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

                                <td
                                  className="px-6  py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 "
                                  onClick={() => {
                                    handleSubjectDeletion(subject._id);
                                  }}
                                >
                                  <a className="text-blue-600">Delete</a>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default AllSubjects;
