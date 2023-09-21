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
  headerText: string;
  sideBarText: string;
}
let initialTheme = {
  button: "",
  buttonText: "",
  header: "",
  text: "",
  sideBar: "",
  background: "",
  headerText: "",
  sideBarText: "",
};

export async function tobase64(blob: Blob) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}
const Settings = () => {
  let [allBanks, setAllBanks] = React.useState<any[]>([]);
  let [msg, setMsg] = React.useState<string>("");
  let [loading, setLoading] = React.useState<boolean>(true);
  const { register, reset, handleSubmit } = useForm();
  let [themeData, setThemeData] = React.useState<ITheme>(initialTheme);
  let [settingsState, setSettingsState] = React.useState<any>({
    configureVisibility: false,
    showThemes: false,
    showInsertLogo: false,
    showGradePoints: false,
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
    const { sideBar, sideBarText, header, button, buttonText, headerText } =
      data;

    async function submitColors() {
      try {
        const colors = {
          sideBar,
          sideBarText,
          header,
          button,
          headerText,
          buttonText,
        };
        console.log(colors);
        const res = await axios.post(`${schoolUrl}/theme/set`, colors, {
          signal: controller.signal,
        });
        setMsg(res.data?.msg + " ,refresh to see changes");
        setSettingsState({
          ...settingsState,
          showThemes: !settingsState.showThemes,
        });
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
      let bankData = {
        account_number: data?.account_number,
        business_name: data?.business_name,
        settlement_bank: data?.settlement_bank,
      };
      let res = await axios.post(`${payUrl}/create/subaccount`, bankData, {
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
  const submitLogoData: SubmitHandler<any> = async (data) => {
    let { logo } = data;
    if (!logo[0].type.startsWith("image")) return setMsg("please select image");
    let pic = await tobase64(logo[0]);

    (async () => {
      try {
        await axios.post(`${schoolUrl}/logo/insert`, { logo: pic });
        setMsg("updated logo successfully,refresh to see changes");
      } catch (error: any) {
        setMsg(
          error?.response?.data?.msg || error?.message || "error updating logo"
        );
      }
    })();
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
    <div className="mx-3">
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
              defaultValue={themeData.sideBar || "#4a5568"}
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
              defaultValue={themeData.button || "#4B5563"}
              {...register("button")}
              id=""
            />
            <label htmlFor="" className="block">
              header text
            </label>
            <input
              type="color"
              defaultValue={themeData.headerText || "#000000"}
              {...register("headerText")}
              className="border"
              id=""
            />
            <label htmlFor="" className="block">
              Text
            </label>
            <input
              type="color"
              defaultValue={themeData.text || "#000000"}
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
      <div>
        <span>
          insert logo{" "}
          <button
            className="capitalize bg-gray-900 w-[100px] text-white p-2 rounded"
            onClick={() => {
              setSettingsState({
                ...settingsState,
                showInsertLogo: !settingsState.showInsertLogo,
              });

              setMsg("");
            }}
          >
            insert
          </button>
        </span>
        <div className={`${settingsState.showInsertLogo ? "block" : "hidden"}`}>
          <form onSubmit={handleSubmit(submitLogoData)}>
            <input type="file" {...register("logo")} id="" required />
            <button className="p-2 bg-green-800 text-white rounded w-fit">
              save
            </button>
          </form>
        </div>
      </div>
      <div className="mt-2">
        <span>
          set grade points{" "}
          <button
            className="capitalize bg-gray-900 w-[100px] text-white p-2 rounded"
            onClick={() => {
              setSettingsState({
                ...settingsState,
                showGradePoints: !settingsState.showGradePoints,
              });

              setMsg("");
            }}
          >
            SET
          </button>
        </span>
        <div
          className={`${settingsState.showGradePoints ? "block" : "hidden"}`}
        >
          <div>
            <span>A:</span>
            <input type="number" />
          </div>
          <div>
            <span>B:</span>
            <input type="number" />
          </div>
          <div>
            <span>C:</span>
            <input type="number" />
          </div>
          <div>
            <span>D:</span>
            <input type="number" />
          </div>
          <div>
            <span>F:</span>
            <input type="number" />
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Settings;
