import { useForm, SubmitHandler } from "react-hook-form";
import React, { useRef } from "react";
import Input from "../Input/Input";
import axios from "./../../api/axios";
import { AxiosLoginInstance } from "../../api/axios";
import { AxiosError } from "axios";
import { prefix } from "@fortawesome/free-solid-svg-icons";
async function tobase64(blob: Blob) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
      //resolve("payload too large");
    };
  });
}
interface Iform {
  name: string;
  age: string;
  email: string;
  password: string;
  picture: any;
  gender: string;
  currentClassLevel: string;
  currentClassArm: string;
}
let POST_URL = "/admin";
const AddStudent = () => {
  const msgRef = useRef<HTMLParagraphElement>(null);
  const isError = useRef(false);
  const { register, handleSubmit, watch, reset } = useForm<Iform>();
  const onsubmit: SubmitHandler<Iform> = async (data: Iform, e) => {
    e?.preventDefault();
    console.log(data.picture);
    let pic: any = tobase64(data.picture[0]);
    let picture = "";
    picture = await pic;
    AddStudentForm();
    async function AddStudentForm() {
      try {
        let controller = new AbortController();
        let addStudent = await axios.post(
          `${POST_URL}/add/student/`,
          { ...data, picture },
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(addStudent);
        isError.current = false;
        msgRef.current
          ? (msgRef.current.textContent = addStudent?.data?.msg)
          : "";
     
      } catch (error: any) {
        console.log(error);
        console.log("here");
        isError.current = true;
        msgRef.current
          ? (msgRef.current.textContent = error?.response?.data?.msg)
          : "";
      }
    }
  };

  return (
    <>
      <h1 className="text-center text-[20px]">add students</h1>

      <div className="flex grid-cols-1 justify-center items-center self-center place-content-center border border-black ">
        <form
          className="grid grid-cols-1 sm:w-[100%] md:w-[50%] lg:w-[40%] justify-center item-center self-center place-content-center"
          action=""
          onSubmit={handleSubmit(onsubmit)}
        >
          <p
            ref={msgRef}
            className={`${
              msgRef.current?.textContent !==
                "registered student successfully" &&
              msgRef.current?.textContent !== "Required fields"
                ? "text-red-500"
                : "text-green-500"
            } text-center`}
          >
            {msgRef.current?.textContent}
            Required fields
          </p>
          <label htmlFor="">name</label>
          <input
            className="border border-black "
            type="text"
            {...register("name", { required: true })}
          />

          <label htmlFor="">email</label>
          <input
            className="border border-black"
            type="email"
            {...register("email", { required: true })}
          />

          <label htmlFor="">password</label>
          <input
            className="border border-black"
            type="text"
            {...register("password", { required: true })}
          />
          <label htmlFor="picture">picture</label>
          <input
            type="file"
            className="border border-black"
            {...register("picture")}
          />
          <label htmlFor="">select gender</label>
          <select id="" className="border border-black" {...register("gender")}>
            <option value="M">male</option>
            <option value="F">female</option>
          </select>
          <label htmlFor="">current class Level</label>
          <select
            className="border border-black"
            {...register("currentClassLevel")}
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
          <label htmlFor="">current class arm</label>
          <select
            className="border border-black"
            {...register("currentClassArm")}
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
            <option value="K">M</option>
            <option value="K">N</option>
            <option value="O">O</option>
            <option value="P">P</option>
          </select>
          <button className=" mt-2 bg-blue-500 bozrder border-blue-500 p-3 text-white">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default AddStudent;
