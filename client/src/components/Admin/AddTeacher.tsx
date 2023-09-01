import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
const AddTeacher: React.FC = () => {
  const { register, reset, handleSubmit } = useForm();
  return (
    <>
      <h1>Add teacher</h1>
      <form>
        <input
          type="text"
          {...register("name")}
          className="border border-black"
          required
          placeholder="full name"
        />
        <input
          type="email"
          {...register("email")}
          className="border border-black"
          required
          placeholder="email address"
        />
        <input
          type="password"
          {...register("password")}
          className="border border-black"
          required
          placeholder="password"
        />
        <input
          type="date"
          {...register("dateEmployed")}
          className="border border-black"
          
        />
        <select id="" {...register("formTeacher")}>
          <option value=""></option>
        </select>
        <input type="text" />
        <input type="text" />
      </form>
    </>
  );
};
export default AddTeacher;
