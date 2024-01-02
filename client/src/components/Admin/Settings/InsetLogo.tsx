import React from "react";
interface IinsertLogo {
  setGeneralSettingsState: React.Dispatch<React.SetStateAction<any>>;
  GeneralSettingsState: any;
  setMsg: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: any;
  submitLogoData: any;
  register: any;
}
const InsetLogo: React.FC<IinsertLogo> = ({
  setGeneralSettingsState,
  GeneralSettingsState,
  setMsg,
  handleSubmit,
  submitLogoData,
  register,
}) => {
  return (
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
  );
};

export default InsetLogo;
