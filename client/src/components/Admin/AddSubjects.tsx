import React, { useState } from "react";
import Loading from "../Loading";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "./../../api/axios";
import Button from "../Button/Button";
function reducer(state: any, action: any) {
  switch (action.type) {
    case "startLoading":
      return { ...state, loading: true };
    case "stopLoading":
      return { ...state, loading: false };
    case "msg": {
      return { ...state, loading: false, msg: action.msg };
    }
  }
}
let initialState = { loading: true, msg: "" };
const AddSubject: React.FC = () => {
  let [state, dispatch] = React.useReducer<React.Reducer<any, any>>(
    reducer,
    initialState
  );
  const { register, handleSubmit } = useForm();
  let [classes, setClasses] = React.useState<any[]>([]);
  let [syncUi, setSyncUi] = useState<any>(null);
  let subjectUrl = "/subject";
  let baseUrl = "/admin";
  React.useEffect(() => {
    let controller = new AbortController();
    try {
      fetchClassList();
      dispatch({ type: "startLoading" });
      async function fetchClassList() {
        let res = await axios.get(`${baseUrl}/class/get/all`, {
          signal: controller.signal,
        });

        setClasses(res.data?.classes);
        dispatch({ type: "msg", msg: "Add Subjects" });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "msg",
        msg: "failed to get please contact the developer or try again later",
      });
    }
    return () => {
      controller.abort();
    };
  }, [syncUi]);

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    const call = async () => {
      try {
        dispatch({ type: "startLoading" });
        const res = await axios.post(`${subjectUrl}/add`, data);
        console.log(res);
        setSyncUi(Date.now());
        dispatch({ type: "stopLoading" });

        dispatch({ type: "msg", msg: res.data?.msg });
      } catch (error: any) {
        dispatch({ type: "stopLoading" });
        dispatch({
          type: "msg",
          msg: error?.response?.data?.msg || error?.message,
        });
      } finally {
      }
    };
    call();
  };

  if (state.loading) return <Loading />;

  return (
    <>
      <p className="text-center font-bold">{state.msg}</p>
      <div className="w-[200px]sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px]">
        
        <div className="grid gap-0 justify-items-center">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="border grid justify-items-center p-4 
             border-gray-500 placeholder:text-center gap-0 rounded-lg w-fit"
          >
            <input
              type="text"
              {...register("subject")}
              required
              placeholder="subject name"
              className="placeholder:text-center border p-1 border-black border-x-0 border-t-0 border-b-[2px] "
            />
            <label className="text-center font-bold">Select Class</label>
            <label className="text-center font-bold opacity-[0.5]">
              You can select multiple
            </label>
            <select
              multiple
              {...register("className")}
              required
              className="placeholder:text-center border-y border-black "
            >
              {classes.map((classLevel, index) => {
                return (
                  <option key={index} value={classLevel.name}>
                    {classLevel.name}
                  </option>
                );
              })}
            </select>

            <Button buttonType={0}>ADD SUBJECT</Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddSubject;
