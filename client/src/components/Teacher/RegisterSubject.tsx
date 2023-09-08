import React from "react";
import axios from "../../api/axios";
import { useForm } from "react-hook-form";
const RegisterClass: React.FC = () => {
  const AddRef = React.useRef<HTMLParagraphElement>(null);
  const { handleSubmit, register } = useForm();
  let baseUrl = "/class";
  async function onSubmit(data: any) {
    let name = `${data.currentClassLevel}${data.currentClassArm}`;
    let controller = new AbortController();

    try {
      let res = await axios.post(
        `${baseUrl}/new`,
        { ...data, name },
        {
          signal: controller.signal,
        }
      );
      AddRef.current
        ? (AddRef.current.textContent = res.data?.msg || "successful")
        : "";
    } catch (error: any) {
      if (error.name == "CanceledError" || error.name == "AbortError") return;
      AddRef.current
        ? (AddRef.current.textContent =
            error?.response?.data?.msg || error.message || "failed to register")
        : "";
    }
    return () => {
      controller.abort();
    };
  }

  return (
    <>
      <div className="w-[200px]sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px]">
        <p className="text-bold text-center text-[20px] bg-white text-gray-900 border rounded">
          Add Class Level
        </p>
        <p className="text-center" ref={AddRef}></p>
        <div className="grid mt-4 justify-items-center">
          <form
            className="grid mb-4 grid-cols-1 place-content-center items-center self-center gap-2 justify-center border border-black w-fit p-5 justify-items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            {" "}
            <label htmlFor="">Enter Class Name</label>
            <select
              className="border rounded border-gray-900 w-[200px]"
              {...register("currentClassLevel", { required: true })}
            >
              <option value="NUR1">NUR1</option>
              <option value="NUR2">NUR2</option>
              <option value="NUR3">NUR3</option>
              <option value="PRY1">PRY1</option>
              <option value="PRY2">PRY2</option>
              <option value="PRY3">PRY3</option>
              <option value="PRY4">PRY4</option>
              <option value="PRY5">PRY5</option>
              <option value="PRY6">PRY6</option>
              <option value="JSS1">JSS1</option>
              <option value="JSS2">JSS2</option>
              <option value="JSS3">JSS3</option>
              <option value="SSS1">SSS1</option>
              <option value="SSS2">SSS2</option>
              <option value="SSS3">SSS3</option>
            </select>
            <label htmlFor="">Enter Class Arm</label>
            <select
              className="border rounded border-gray-900 w-[200px] "
              {...register("currentClassArm", { required: true })}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
              <option value="K">K</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="N">N</option>
              <option value="O">O</option>
              <option value="P">P</option>
            </select>
            <button className=" p-3 border bg-gray-900 text-white rounded w-[200px]">
              ADD CLASS
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default RegisterClass;
