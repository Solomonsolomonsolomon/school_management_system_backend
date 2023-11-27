import React from "react";
import axios from "../../api/axios";
import Button from "../Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
let baseUrl = "/admin";
const AddAdmin = () => {
  const { register, handleSubmit, reset } = useForm<any>();
  let msgRef = React.useRef<HTMLParagraphElement>(null);
  const onsubmit: SubmitHandler<any> = async (data) => {
    const controller = new AbortController();
    try {
      await axios.post(`${baseUrl}/add/admin`, data, {
        signal: controller.signal,
      });

      msgRef.current
        ? (msgRef.current.textContent = "registered_successfully")
        : "";
      reset();
    } catch (error: any) {
      if (error.name == "AbortError" || error.name == "CanceledError") return;
      msgRef.current
        ? (msgRef.current.textContent =
            error?.response?.data?.err ||
            error?.message ||
            "failed to register")
        : "";
    }
    return () => {
      controller.abort();
    };
  };

  return (
    <>
      <h1 className="font-bold text-center"> Add Admin</h1>
      <p
        ref={msgRef}
        className={`${
          msgRef.current?.textContent !== "registered_successfully" &&
          msgRef.current?.textContent !== "Required fields"
            ? "text-red-500"
            : "text-green-500"
        } text-center w-[100%]`}
      ></p>
      <div className="justify-items-center grid rounded ">
        <div className="grid grid-cols-1 justify-center justify-items-center self-center place-content-center  border-gray-600 border rounded-lg bg-gray w-fit">
          <form
            className="grid grid-cols-1 sm:w-[100%] md:w-fit lg:w-fit p-5 rounded "
            action=""
            onSubmit={handleSubmit(onsubmit)}
          >
            <label htmlFor=""> Full Name</label>
            <input
              className="border p-2 w-fit dark:bg-gray-900
 rounded border-gray-400 "
              type="text"
              {...register("name", { required: true })}
            />

            <label htmlFor="">Email</label>
            <input
              className="border w-fit dark:bg-gray-900 p-2 rounded border-gray-400"
              type="email"
              {...register("email", { required: true })}
            />

            <label htmlFor="">Password</label>
            <input
              className="border w-fit dark:bg-gray-900 p-2 rounded  border-gray-400"
              type="password"
              {...register("password", { required: true })}
            />

            <Button buttontype={0}>Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
  //     const [error, setError] = useState(null);
  //     const [name, setName] = useState("");
  //     const [email, setEmail] = useState("");
  //     const [password, setPassword] = useState("");
  //     const errRef = useRef<HTMLParagraphElement>(null);
  // async function Submit(){

  // }
  //     return (
  //         <div>
  //             <form onSubmit={Submit}>
  //                 <p className={error ? "text-red-700 text-center block": "none"} ref={errRef} aria-live='assertive'>{error}</p>
  //                 <section>
  //                     <label htmlFor="name">Name</label>
  //                     <input type="text" id='name'
  //                      placeholder="Enter Name"
  //                      value={name}
  //                      onChange={(e)=> setName(e.target.value)}
  //                      required />
  //                 </section>
  //                 <section>
  //                     <label htmlFor="email">Email</label>
  //                     <input type="email" id='email'
  //                      placeholder="Enter Email"
  //                      value={email}
  //                      onChange={(e)=> setEmail(e.target.value)}
  //                       required />
  //                 </section>
  //                 <section>
  //                     <label htmlFor="password">Password</label>
  //                     <input type="password" id='password'
  //                     value={password}
  //                     placeholder="Enter Password"
  //                     onChange={(e)=> setPassword(e.target.value)}
  //                     required />
  //                 </section>
  //                 <Button>ADD ADMIN</Button>
  //             </form>
  //         </div>
  //     )
};

export default AddAdmin;
