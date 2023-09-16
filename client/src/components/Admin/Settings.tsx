import React from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
let payUrl = "/paystack";
let schoolUrl = "/school";
import { useForm, SubmitHandler } from "react-hook-form";
interface ITheme {
  button: string;
  buttonText: string;
  header: string;
  text: string;
  sideBar: string;
  background: string;
  loginImg: string;
  sideBarText: string;
}
let initialTheme = {
  button: "",
  buttonText: "",
  header: "",
  text: "",
  sideBar: "",
  background: "",
  loginImg: "",
  sideBarText: "",
};
const Settings = () => {
  let [allBanks, setAllBanks] = React.useState<any[]>([]);
  let [msg, setMsg] = React.useState<string>("");
  let [loading, setLoading] = React.useState<boolean>(true);
  const { register, reset, handleSubmit } = useForm();
  let [themeData, setThemeData] = React.useState<ITheme>(initialTheme);
  let [settingsState, setSettingsState] = React.useState<any>({
    configureVisibility: false,
    showThemes: false,
  });
  React.useEffect(() => {
    let controller = new AbortController();
    async function fetchThemes() {
      setLoading(true);
      try {
        let res = await axios.get(`${schoolUrl}/theme/current`);
        setThemeData(res.data?.themes);
      } catch (error: any) {
        if (error.name == "CanceledError" || error.name == "AbortError") return;
      } finally {
      
        setLoading(false);
      }
    }
    fetchThemes();
    return () => {
      controller.abort();
    };
  }, []);

  const submitThemeColor: SubmitHandler<any> = async (data: any) => {
    const controller = new AbortController();
    const { sideBar, sideBarText, headers, button, buttonText } = data;
    console.log(data);
    async function submitColors() {
      try {
        const colors = {
          sideBar,
          sideBarText,
          headers,
          button,
          buttonText,
        };
        console.log(colors);
        const res = await axios.post(`${schoolUrl}/theme/set`, colors, {
          signal: controller.signal,
        });
        setMsg(res.data?.msg + " ,refresh to see changes");
      } catch (error: any) {
        if (
          error.name == "AbortController" ||
          error.name == "CanceledController"
        )
          return;
        setMsg(
          error?.response?.data?.msg ||
            error?.message ||
            "error updating themes"
        );
      }
    }
    submitColors();
    return () => {
      controller.abort();
    };
  };
  const submitBankConfigData: SubmitHandler<any> = async (data) => {
    let controller = new AbortController();

    try {
      let res = await axios.post(`${payUrl}/create/subaccount`, data, {
        signal: controller.signal,
      });
      reset();
      setSettingsState({ ...settingsState, configureVisibility: false });
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
  if (loading) return <Loading />;
  return (
    <div>
      <p className="font-bold text-center italic">{msg}</p>
      <span>Configure Payment Info</span>
      <button
        onClick={() => {
          setSettingsState({
            ...settingsState,
            configureVisibility: !settingsState.configureVisibility,
          });
          setMsg("");
        }}
        className="border m-2 p-2 bg-gray-900 text-white text-sm rounded"
      >
        configure
      </button>
      <div
        className={`${settingsState.configureVisibility ? "border" : "hidden"}`}
      >
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

      <div>
        <span>set themes</span>{" "}
        <button
          onClick={() => {
            setSettingsState({
              ...settingsState,
              showThemes: !settingsState.showThemes,
            });
            setMsg("");
          }}
          className="border m-2 p-2 w-[90px] bg-gray-900 text-white text-sm rounded"
        >
          SET
        </button>
        <div className={`${settingsState.showThemes ? "border" : "hidden"}`}>
          <form onSubmit={handleSubmit(submitThemeColor)}>
            <label htmlFor="" className="block">
              Sidebar
            </label>
            <input
              type="color"
              defaultValue={themeData.sideBar || "#edf2f7"}
              {...register("sideBar")}
              id=""
            />
            <label htmlFor="" className="block">
              Sidebar text
            </label>
            <input
              type="color"
              defaultValue={themeData.sideBarText || "#ffffff"}
              {...register("sideBarText")}
              id=""
            />
            <label htmlFor="" className="block">
              Buttons
            </label>
            <input
              type="color"
              defaultValue={themeData.button || "#abbbab"}
              {...register("button")}
              id=""
            />
            <label htmlFor="" className="block">
              login image
            </label>
            <input
              type="color"
              defaultValue={themeData.loginImg || "#aaaaaa"}
              {...register("loginImg")}
              className="border"
              id=""
            />
            <label htmlFor="" className="block">
              Text
            </label>
            <input
              type="color"
              defaultValue={themeData.text || "#aaaaaa"}
              {...register("text")}
              className="border"
              id=""
            />
            <label htmlFor="" className="block">
              Header
            </label>
            <input
              type="color"
              defaultValue={themeData.header || "#aaaaaa"}
              {...register("header")}
              className="border"
              id=""
            />
            <button className="p-2 bg-green-800 text-white rounded w-fit">
              APPLY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
