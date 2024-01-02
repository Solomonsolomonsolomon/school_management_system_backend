import React from "react";
import axios from "../../../api/axios";
import Loading from "../../Loading";
import ConfirmModal from "./ConfigureModal";
let schoolUrl = "/school";
import { useForm, SubmitHandler } from "react-hook-form";
import WarningComponent from "../../../utils/WarningComponent";
import {
  // GradePoints,
  ITheme,
} from "./../../../interfaces/generalSettingsInterface";

import AddColors from "./AddColors";
import InsetLogo from "./InsetLogo";
import GradePointsComponent from "./GradePointsComponent";
import ConfigureBankDetails from "./ConfigureBankDetails";
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
  const { register, handleSubmit } = useForm();
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
  let [gradePoints, setGradePoints] = React.useState<any>({
    // A: 0,
    // B: 0,
    // C: 0,
    // D: 0,
    // F: 0,
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
      <ConfigureBankDetails
        GeneralSettingsState={GeneralSettingsState}
        allBanks={allBanks}
        setAllBanks={setAllBanks}
        setGeneralSettingsState={setGeneralSettingsState}
        setMsg={setMsg}
      />
      <AddColors
        GeneralSettingsState={GeneralSettingsState}
        handleSubmit={handleSubmit}
        register={register}
        setGeneralSettingsState={setGeneralSettingsState}
        setMsg={setMsg}
        themeData={themeData}
        
      />

      <InsetLogo
        GeneralSettingsState={GeneralSettingsState}
        handleSubmit={handleSubmit}
        register={register}
        setMsg={setMsg}
        setGeneralSettingsState={setGeneralSettingsState}
        submitLogoData={submitLogoData}
      />
      <GradePointsComponent
        GeneralSettingsState={GeneralSettingsState}
        gradePoints={gradePoints}
        setGeneralSettingsState={setGeneralSettingsState}
        setGradePoints={setGradePoints}
        setGradeTracker={setGradeTracker}
        setLoading={setLoading}
        setMsg={setMsg}
      />
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
export default GeneralSettings;
