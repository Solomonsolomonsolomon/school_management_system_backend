import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../../../api/axios";
const payUrl = "/paystack";
interface IConfigureBank {
  setGeneralSettingsState: any;
  GeneralSettingsState: any;
  setMsg: any;
  setAllBanks: any;
  allBanks: any[];
}
const ConfigureBankDetails: React.FC<IConfigureBank> = ({
  setGeneralSettingsState,
  GeneralSettingsState,
  setMsg,
  setAllBanks,
  allBanks,
}) => {
  const { handleSubmit, register, reset } = useForm();
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
  const submitBankConfigData: SubmitHandler<any> = async (data) => {
    let controller = new AbortController();

    try {
      let bankData = {
        account_number: data?.account_number,
        business_name: data?.business_name,
        settlement_bank: data?.settlement_bank,
      };
      let res = await axios.post(`${payUrl}/create/subaccount`, bankData, {
        signal: controller.signal,
      });
      reset();
      setGeneralSettingsState({
        ...GeneralSettingsState,
        configureVisibility: false,
      });
      setMsg(res.data?.msg || "successful");
    } catch (error: any) {
      console.log(error);
      setMsg(error.response?.data?.message || "error in configuring");
    }
    return () => {
      controller.abort();
    };
  };

  return (
    <>
      <span>Configure Payment Info</span>
      <button
        onClick={() => {
          setGeneralSettingsState({
            ...GeneralSettingsState,
            configureVisibility: !GeneralSettingsState.configureVisibility,
          });
          setMsg("");
        }}
        className="border m-2 p-2 bg-gray-900 text-white text-sm rounded"
      >
        configure
      </button>
      <div
        className={`${
          GeneralSettingsState.configureVisibility ? "border" : "hidden"
        }`}
      >
        <form
          action=""
          className="dark:bg-gray-900 grid gap-3  justify-center p-2 border rounded  "
          onSubmit={handleSubmit(submitBankConfigData)}
        >
          <input
            type="text"
            {...register("business_name")}
            placeholder="enter business name"
            className="dark:bg-gray-900 border  border-t-0 border-l-0 border-r-0 border-b-2 border-black"
          />
          <input
            type="text"
            {...register("account_number")}
            placeholder="enter Account number "
            className="dark:bg-gray-900 border  border-t-0 border-l-0 border-r-0 border-b-2 border-black"
          />
          <label htmlFor="">Select Bank</label>
          <select {...register("settlement_bank")} className="dark:bg-gray-900">
            {allBanks.map((bank) => {
              return <option value={bank?.code}>{bank?.name}</option>;
            })}
          </select>
          <button className="p-2 bg-green-800 text-white rounded w-fit">
            save
          </button>
        </form>
      </div>
    </>
  );
};

export default ConfigureBankDetails;
