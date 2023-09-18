import React from "react";
let user = sessionStorage.getItem("user");
import axios from "../../api/axios";
let payUrl = "/paystack";
import { useForm, SubmitHandler } from "react-hook-form";
let details: any;
if (user) details = JSON.parse(user);

const PayFees: React.FC = () => {
  const { register, handleSubmit } = useForm();
  let [msg, setMsg] = React.useState<string>("");
  const onsubmit: SubmitHandler<any> = async (data) => {
    let controller = new AbortController();
    try {
      let res = await axios.post(`${payUrl}/pay`, data, {
        signal: controller.signal,
      });
      setMsg("transaction initialized..please wait");
      window.location.replace(res.data?.url);
    } catch (error: any) {
      setMsg(
        error?.response?.data?.message ||
          "An error Occured,confirm details and try again"
      );
    }

    return () => {
      controller.abort();
    };
  };
  return (
    <div>
      <p className="font-bold text-center">{msg}</p>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="grid justify-center p-2 gap-2"
      >
        <label htmlFor=""></label>
        <input
          type="email"
          placeholder="email"
          defaultValue={details?.email}
          {...register("email")}
          className="border border-l-0 border-r-0 border-t-0 border-black border-bottom-2"
        />
        <input
          type="number"
          placeholder="amount"
          defaultValue={details?.balance}
          {...register("amount")}
          className="border border-l-0 border-r-0 border-t-0 border-black border-bottom-2"
        />
        <button className="bg-gray-900 p-2 rounded text-white">Proceed</button>
      </form>
    </div>
  );
};

export default PayFees;
