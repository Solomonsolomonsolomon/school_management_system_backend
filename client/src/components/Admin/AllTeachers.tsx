import React, { useReducer, useState } from "react";
import Loading from "../Loading";
import axios from "../../api/axios";
let baseUrl = "/admin";
interface Action {
  type: string;
  msg?: any;
  payload?: any;
}
interface State {
  loading: boolean;
  msg: string;
  teachers: any[];
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "startLoading":
      return { ...state, loading: true };
    case "stopLoading":
      return { ...state, loading: false };
    case "msg":
      return { ...state, loading: false, msg: action.msg };
    case "msg+saveTeacher":
      return {
        ...state,
        loading: false,
        msg: action.msg,
        teachers: action.payload,
      };
    default:
      return { ...state };
  }
}
const initialState = { loading: true, msg: "", teachers: [] };
const AllTeachers: React.FC = () => {
  let [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );
  React.useEffect(() => {
    allTeachers();
    let controller=new AbortController();
    async function allTeachers() {
      try {
        dispatch({ type: "startLoading" });
        let res = await axios.get(`${baseUrl}/get/teacher`,{
            signal:controller.signal
        });
        console.log(res.data?.teacher);
        dispatch({
          type: "msg+saveTeacher",
          msg: res.data?.msg || "teachers fetched successfully",
          payload: res.data?.teacher,
        });
      } catch (error: any) {
        dispatch({
          type: "msg",
          msg: error.response?.data || error?.message || "error in fetching",
        });
      }
    
    }
    return ()=>{
    controller.abort()
    }
  }, []);
  if (state.loading) return <Loading />;
  return (
    <>
      <h1 className="text-center font-bold">{state.msg}</h1>
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
          <thead className="bg-gray-50 dark:bg-gray-700">
            {/* table head */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                TeacherId
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Form Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Subjects Taught
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                EMPLOYMENT DATE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {state.teachers
              ? state.teachers.map((teacher: any, i: number, array: any[]) => {
                  return (
                    <>
                      {" "}
                      <tr key={teacher._id}>
                        <div className="flex items-center justify-between h-5">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {teacher.name}
                          </td>
                        </div>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {teacher.teacherId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {teacher.formTeacher||"nil"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {[
                            ...new Set(
                              teacher.subjects.map(
                                (subject: any) => subject.subject
                              )
                            ),
                          ]
                            .join(",")
                            .toLowerCase()||"nil"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {teacher.dateEmployed || "nil"}
                        </td>

                        <td
                          className="px-6  py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 "
                          //   onClick={(e) => {
                          //     handleSubjectDeletion(subject._id);
                          //   }}
                        >
                          <a className="text-blue-600">Delete</a>
                        </td>
                        <td
                          className="px-6  py-1 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 "
                         
                        >
                          <a className="text-blue-600">Edit</a>
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
};
export default AllTeachers;
