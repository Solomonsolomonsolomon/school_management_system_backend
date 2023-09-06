import { useForm, SubmitHandler } from "react-hook-form";
import React, { useRef, useState } from "react";
import Input from "../Input/Input";
import axios from "./../../api/axios";
import { AxiosLoginInstance } from "../../api/axios";
import { AxiosError } from "axios";
import { prefix } from "@fortawesome/free-solid-svg-icons";

export async function tobase64(blob: Blob) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}

interface Iform {
  name: string;
  age: string;
  email: string;
  password: string;
  picture: any;
  parent: string;
  relationship: string;
  gender: string;
  currentClassLevel: string;
  currentClassArm: string;
}

let POST_URL = "/admin";

const AddStudent = () => {
  const msgRef = useRef<HTMLParagraphElement>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm<Iform>();

  const onsubmit: SubmitHandler<Iform> = async (data: Iform, e) => {
    e?.preventDefault();

    if (!data.picture || !data.picture.length) {
      setImageError("Please select an image");
      return;
    } else {
      setImageError(null);
    }

    let pic: any = tobase64(data.picture[0]).catch((error) => {
      console.error(error);
    });

    let picture = await pic;

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

        msgRef.current
          ? (msgRef.current.textContent = addStudent?.data?.msg)
          : "";
        reset();
      } catch (error: any) {
        console.log(error);

        msgRef.current
          ? (msgRef.current.textContent = error?.response?.data?.msg)
          : "";
      }
    }

    AddStudentForm();
  };

  return (
    <>
      <h1 className="text-center text-[20px] font-bold">Add Students</h1>
      <p
        ref={msgRef}
        className={`${
          msgRef.current?.textContent !== "registered student successfully" &&
          msgRef.current?.textContent !== "Required fields"
            ? "text-red-500"
            : "text-green-500"
        } text-center w-[100%]`}
      ></p>
      <div className="justify-items-center grid rounded">
        <div className="grid grid-cols-1 justify-center justify-items-center self-center place-content-center border bg-gray w-fit">
          <form
            className="grid grid-cols-1 sm:w-[100%] md:w-fit lg:w-[40%] p-5 rounded "
            action=""
            onSubmit={handleSubmit(onsubmit)}
          >
            {imageError && (
              <p className="text-red-500 text-center">{imageError}</p>
            )}

            <label htmlFor=""> Full Name</label>
            <input
              className="border p-2 w-fit rounded border-gray-400 "
              type="text"
              {...register("name", { required: true })}
            />
            <label htmlFor=""> guardian</label>
            <input
              className="border p-2 w-fit rounded border-gray-400 "
              type="text"
              {...register("parent", { required: true })}
            />
            <label htmlFor=""> Relationship with WARD</label>
            <input
              className="border p-2 w-fit rounded border-gray-400 "
              type="text"
              {...register("relationship", { required: true })}
            />

            <label htmlFor="">Age</label>
            <input
              className="border w-fit p-2 rounded border-gray-400 "
              type="text"
              {...register("age", { required: true })}
            />

            <label htmlFor="">Email</label>
            <input
              className="border w-fit p-2 rounded border-gray-400"
              type="email"
              {...register("email", { required: true })}
            />

            <label htmlFor="">Password</label>
            <input
              className="border w-fit p-2 rounded border-gray-400"
              type="password"
              {...register("password", { required: true })}
            />

            <label htmlFor="picture">Picture</label>
            <input
              type="file"
              className="border w-[100px] border-gray-400"
              {...register("picture")}
            />

            <label htmlFor="">Select Gender</label>
            <select
              id=""
              className="border w-fit p-2 rounded border-gray-400"
              {...register("gender", { required: true })}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>

            <label htmlFor="">Current Class Level</label>
            <select
              className="border w-fit p-2 rounded border-gray-400"
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

            <label htmlFor="">Current Class Arm</label>
            <select
              className="border w-fit p-2 rounded border-gray-400"
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

            <button className="mt-2 bg-gray-600 p-3 text-white rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
``;
