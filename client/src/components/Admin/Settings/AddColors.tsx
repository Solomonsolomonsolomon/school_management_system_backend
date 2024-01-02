import React from "react";
import { SubmitHandler } from "react-hook-form";
import axios from "../../../api/axios";

interface IAddColors {
  setGeneralSettingsState: React.Dispatch<React.SetStateAction<any>>;
  GeneralSettingsState: any;
  setMsg: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: any;
 
  themeData: any;
  register: any;
}
let schoolUrl = "/school";
const AddColors: React.FC<IAddColors> = ({
  setGeneralSettingsState,
  GeneralSettingsState,
  setMsg,
  handleSubmit,
  themeData,
  register,
}) => {
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
  return (
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
            defaultValue={themeData.sideBar || "#ffffff"}
            {...register("sideBar")}
            className="dark:bg-gray-900"
          />
          <label htmlFor="" className="block">
            Sidebar text
          </label>
          <input
            type="color"
            defaultValue={themeData.sideBarText || "#454545"}
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
            defaultValue={themeData.header || "#4a5568"}
            {...register("header")}
            className="dark:bg-gray-900 border"
          />
          <button className="p-2 bg-green-800 mb-4 text-white rounded w-fit">
            APPLY
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColors;
