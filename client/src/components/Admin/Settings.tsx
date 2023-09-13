import React from "react";
import axios from "../../api/axios";
let payUrl = "/paystack";
import { useForm, SubmitHandler} from "react-hook-form";
const Settings = () => {
  const [configureVisibility, setConfigureVisibility] =
    React.useState<boolean>(false);
  let [allBanks, setAllBanks] = React.useState<any[]>([]);
  let [msg, setMsg] = React.useState<string>("");
  const { register, reset, handleSubmit } = useForm();
  const submitBankConfigData: SubmitHandler<any> = async (data) => {
    let controller = new AbortController();
    try {
      let res = await axios.post(`${payUrl}/create/subaccount`, data, {
        signal: controller.signal,
      });
      reset();
      setConfigureVisibility(false);
      setMsg(res.data?.msg || "successful");
    } catch (error: any) {
      console.log(error);
      setMsg(error.response?.data?.message || "error in configuring");
    }
    return () => {
      controller.abort();
    };
  };
  React.useEffect(() => {
    let controller = new AbortController();
    async function getBanks() {
      let res = await axios.get(`${payUrl}/get/bank`, {
        signal: controller.signal,
      });
      console.log(res?.data.banks);
      setAllBanks(res.data?.banks);
    }

    getBanks();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      <p className="font-bold text-center italic">{msg}</p>
      <span>Configure Payment Info</span>
      <button
        onClick={() => {
          setConfigureVisibility(!configureVisibility);
          setMsg("");
        }}
        className="border m-2 p-2 bg-gray-900 text-white text-sm rounded"
      >
        configure
      </button>
      <div className={`${configureVisibility ? "border" : "hidden"}`}>
        <form
          action=""
          className="grid gap-3  justify-center p-2 border rounded  "
          onSubmit={handleSubmit(submitBankConfigData)}
        >
          <input
            type="text"
            {...register("business_name")}
            placeholder="enter business name"
            className="border  border-t-0 border-l-0 border-r-0 border-b-2 border-black"
          />
          <input
            type="text"
            {...register("account_number")}
            placeholder="enter Account number "
            className="border  border-t-0 border-l-0 border-r-0 border-b-2 border-black"
          />
          <label htmlFor="">Select Bank</label>
          <select {...register("settlement_bank")} id="">
            {allBanks.map((bank) => {
              return <option value={bank?.code}>{bank?.name}</option>;
            })}
          </select>
          <button className="p-2 bg-green-800 text-white rounded w-fit">
            save
          </button>
        </form>
      </div>
      <div>set themes</div>
    </div>
  );
};

export default Settings;
