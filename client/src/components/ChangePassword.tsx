import React from "react";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../api/axios";
import Loading from "./Loading";
let parsed: any = {
  role: "",
  email: "",
};
let user = sessionStorage.getItem("user");
if (user) {
  parsed = JSON.parse(user);
}
let role: string = parsed.role;
let email = parsed.email;
let authUrl = "/auth";
interface SetMsgObjType {
  success: string;
  err: string;
}
const ChangePassword = () => {
  let navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    // location.href='/'
    navigate("/", { replace: true });
  };
  const { register, handleSubmit } = useForm();
  const [msgObj, setMsgObj] = React.useState<SetMsgObjType>({
    success: "",
    err: "",
  });
  let [loading, setLoading] = React.useState<boolean>(false);
  const onSubmit: SubmitHandler<any> = (data) => {
   
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        let res = await axios.post(`${authUrl}/password/change`, data, {
          signal: controller.signal,
        });
        setMsgObj({
          err: "",
          success: res.data?.msg || "successful edit",
        });
        logout();
      } catch (error: any) {
        setMsgObj({
          err: error?.response?.data?.msg || "failed to change password",
          success: "",
        });
      } finally {
        setLoading(false);
      }
    })();
    () => {
      return controller.abort();
    };
  };
  if (loading) return <Loading />;
  return (
    <main className="h-full  grid justify-center items-center place-content-center gap-4 ">
      <FontAwesomeIcon
        icon={faLongArrowAltLeft}
        onClick={() => {
          navigate("/");
        }}
      ></FontAwesomeIcon>

      <p className=" text-center font-bold">Change password</p>
      <p className={`${!msgObj.err ? "hidden" : ""}text-red-600`}>
        {msgObj.err}
      </p>
      <p className={`${!msgObj.success ? "hidden" : ""}text-green-500`}>
        {msgObj.success}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grid grid-cols-1 border border-gray-200 p-5 rounded justify-center items-center place-content-center gap-2"
      >
        <input
          type="email"
          className="bg-inherit border p-2 "
          placeholder="email"
          {...register("email")}
          defaultValue={email}
          required
        />
        <select
          {...register("role")}
          className="bg-inherit border p-2 border-inherit rounded dark:bg-gray-900 "
          defaultValue={role}
          required
        >
          <option value="">Select</option>
          <option value="admin">admin</option>
          <option value="student">student</option>
          <option value="teacher">teacher</option>
        </select>
        <input
          {...register("oldPassword")}
          type="password"
          className="bg-inherit border p-2 "
          placeholder="old password"
          required
        />
        <input
          type="password"
          {...register("newPassword")}
          className="bg-inherit border p-2 "
          placeholder="new password"
          required
        />
        <input
          {...register("passwordRepeat")}
          type="password"
          className="bg-inherit border p-2"
          placeholder="repeat password"
          required
        />
        <div className="h-full grid justify-center items-center place-content-center">
          <button className="block p-3 text-inherit mt-5 w-full rounded bg-green-700 ">
            Change
          </button>
        </div>
      </form>
    </main>
  );
};

export default ChangePassword;
