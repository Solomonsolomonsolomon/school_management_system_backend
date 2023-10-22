import React from "react";
import axios from "../../../api/axios";
import Loading from "../../Loading";
let payUrl = "/paystack";
let schoolUrl = "/school";
import { useForm, SubmitHandler } from "react-hook-form";
import WarningComponent from "../../../utils/WarningComponent";
interface GradePoints {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}
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
let resultUrl = "/results";

export async function tobase64(blob: Blob) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}
const GeneralSettings = () => {
  let [allBanks, setAllBanks] = React.useState<any[]>([]);
  let [msg, setMsg] = React.useState<string>("");
  let [loading, setLoading] = React.useState<boolean>(true);
  const { register, reset, handleSubmit } = useForm();
  let [themeData, setThemeData] = React.useState<ITheme>(initialTheme);
  let [GeneralSettingsState, setGeneralSettingsState] = React.useState<any>({
    configureVisibility: false,
    showThemes: false,
    showInsertLogo: false,
    showGradePoints: false,
  });
  let [confirmModal, setConfirmModal] = React.useState<boolean>(false);
  let [confirmable, setConfirmable] = React.useState<boolean>(false);
  const [generateResults, setGenerateResults] = React.useState<number>(0);
  let [gradeTracker, setGradeTracker] = React.useState<number>(0);
  let [gradePoints, setGradePoints] = React.useState<GradePoints>({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
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
        setGeneralSettingsState({
          ...GeneralSettingsState,
          showThemes: !GeneralSettingsState.showThemes,
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
  const handleGradePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGradePoints({ ...gradePoints, [e.target.name]: e.target.value });
  };
  const updateGradePoints = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(gradePoints);
    try {
      setLoading(true);
      let res = await axios.put(`${schoolUrl}/set/gradePoint`, gradePoints);
      setMsg(res.data?.msg);
      setGeneralSettingsState({
        ...GeneralSettingsState,
        showGradePoints: false,
        
      });
      setGradeTracker(Date.now());
    } catch (error: any) {
      setMsg(error?.response?.data?.msg || error?.message);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (confirmable) {
      (async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${resultUrl}/generate`);
          console.log(res);
          setMsg(res.data?.msg || "results generated");
        } catch (error: any) {
          console.error(error);
          if (
            error.name == "AbortController" ||
            error.name == "CanceledController"
          )
            return;
          setMsg(
            error?.response?.data?.msg || error?.message || "error generating"
          );
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setMsg("");
    }
  }, [generateResults, confirmable]);

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
  ///getting gradePoints
  React.useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${schoolUrl}/get/gradepoint`);

        console.log(res);

        setGradePoints(res.data?.gradePoints);
      } catch (error: any) {
        setMsg(error?.response?.data?.msg || error?.message);
      } finally {
      }
    })();
  }, [gradeTracker]);
  if (loading) return <Loading />;

  if (confirmModal)
    return (
      <ConfirmModal
        confirmable={setConfirmable}
        confirmModal={setConfirmModal}
      />
    );
  return (
    <div className="mx-3">
      <p className="font-bold text-center italic">{msg}</p>
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

      <div>
        <span>set themes</span>{" "}
        <button
          onClick={() => {
            setGeneralSettingsState({
              ...GeneralSettingsState,
              showThemes: !GeneralSettingsState.showThemes,
            });
            setMsg("");
          }}
          className="border m-2 p-2 w-[90px] bg-gray-900 text-white text-sm rounded"
        >
          SET
        </button>
        <div
          className={`${GeneralSettingsState.showThemes ? "border" : "hidden"}`}
        >
          <form onSubmit={handleSubmit(submitThemeColor)}>
            <label htmlFor="" className="block">
              Sidebar
            </label>
            <input
              type="color"
              defaultValue={themeData.sideBar || "#4a5568"}
              {...register("sideBar")}
              className="dark:bg-gray-900"
            />
            <label htmlFor="" className="block">
              Sidebar text
            </label>
            <input
              type="color"
              defaultValue={themeData.sideBarText || "#ffffff"}
              {...register("sideBarText")}
              className="dark:bg-gray-900"
            />
            <label htmlFor="" className="block">
              Buttons
            </label>
            <input
              type="color"
              defaultValue={themeData.button || "#4B5563"}
              {...register("button")}
              className="dark:bg-gray-900"
            />
            <label htmlFor="" className="block">
              header text
            </label>
            <input
              type="color"
              defaultValue={themeData.headerText || "#000000"}
              {...register("headerText")}
              className="dark:bg-gray-900 border"
            />
            <label htmlFor="" className="block">
              Text
            </label>
            <input
              type="color"
              defaultValue={themeData.text || "#000000"}
              {...register("text")}
              className="dark:bg-gray-900 border"
            />
            <label htmlFor="" className="block">
              Header
            </label>
            <input
              type="color"
              defaultValue={themeData.header || "#aaaaaa"}
              {...register("header")}
              className="dark:bg-gray-900 border"
            />
            <button className="p-2 bg-green-800 mb-4 text-white rounded w-fit">
              APPLY
            </button>
          </form>
        </div>
      </div>
      <div>
        <span>
          insert logo{" "}
          <button
            className="capitalize bg-gray-900 w-[100px] text-white p-2 rounded border"
            onClick={() => {
              setGeneralSettingsState({
                ...GeneralSettingsState,
                showInsertLogo: !GeneralSettingsState.showInsertLogo,
              });

              setMsg("");
            }}
          >
            insert
          </button>
        </span>
        <div
          className={`${
            GeneralSettingsState.showInsertLogo ? "block" : "hidden"
          }`}
        >
          <form onSubmit={handleSubmit(submitLogoData)}>
            <input
              type="file"
              {...register("logo")}
              className="dark:bg-gray-900"
              required
            />
            <button className="p-2 bg-green-800 text-white rounded w-fit border">
              save
            </button>
          </form>
        </div>
      </div>
      <div className="mt-2">
        <span>
          set grade points{" "}
          <button
            className="capitalize bg-gray-900 w-[100px] text-white p-2 rounded border"
            onClick={() => {
              setGeneralSettingsState({
                ...GeneralSettingsState,
                showGradePoints: !GeneralSettingsState.showGradePoints,
              });

              setMsg("");
            }}
          >
            SET
          </button>
        </span>
        <form
          onSubmit={updateGradePoints}
          className={`${
            GeneralSettingsState.showGradePoints ? "block" : "hidden"
          }`}
        >
          <div>
            <span>A:</span>
            <input
              type="number"
              onChange={handleGradePoints}
              name="A"
              className="border mt-2 border-black rounded bg-inherit w-fit text-center "
              value={gradePoints.A}
            />
          </div>
          <div>
            <span>B:</span>
            <input
              type="number"
              onChange={handleGradePoints}
              name="B"
              className="border mt-2 border-black rounded bg-inherit w-fit text-center "
              value={gradePoints.B}
            />
          </div>
          <div>
            <span>C:</span>
            <input
              type="number"
              onChange={handleGradePoints}
              name="C"
              className="border mt-2 border-black rounded bg-inherit w-fit text-center "
              value={gradePoints.C}
            />
          </div>
          <div>
            <span>D:</span>

            <input
              type="number"
              onChange={handleGradePoints}
              name="D"
              className="border mt-2 border-black rounded bg-inherit w-fit text-center "
              value={gradePoints.D}
            />
          </div>
          <div>
            <span>F:</span>
            <input
              type="number"
              onChange={handleGradePoints}
              name="F"
              className="border mt-2 border-black rounded bg-inherit w-fit text-center "
              value={gradePoints.F}
            />
          </div>
          <button className="p-2 bg-green-800 mb-4 text-white rounded w-fit">
            SET
          </button>
        </form>
      </div>
      <WarningComponent>
        Please Auto promotion only works when current term is promotion term and
        teacher generates result{" "}
      </WarningComponent>
      {/* generate results */}
      <button
        className="bg-blue-500 mt-5 hover:bg-blue-600 hover:text-gray-500  p-[1.0em] text-white  hover:text "
        onClick={() => {
          setGenerateResults(Date.now());
          setConfirmModal(true);
        }}
      >
        Generate Results
      </button>
    </div>
  );
};
const ConfirmModal: React.FC<{
  confirmable: React.SetStateAction<any>;
  confirmModal: React.SetStateAction<any>;
}> = ({ confirmable, confirmModal }) => {
  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmable */}
      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh] dark:bg-gray-800 bg-white ">
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-2xl h-fit box-border p-20">
          <h1 className="p-5 ">Are you sure you want to generate Results</h1>
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
export default GeneralSettings;
