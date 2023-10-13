import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import WarningComponent from "../../utils/WarningComponent";
import Loading from "../Loading";
let gradeUrl = "/grades";

const DeleteGrade: React.FC<{ setOpenDeleteGradeModal: any }> = ({
  setOpenDeleteGradeModal,
}) => {
  let [loading, setLoading] = React.useState<boolean>(false);
  interface Iform {
    studentId: string;
    className: string;
  }

  let [details, setDetails] = React.useState<Iform>({
    studentId: "",
    className: "",
  });
  interface IMsg {
    error: string;
    success: string;
  }
  let [msg, setMsg] = React.useState<IMsg>({
    error: "",
    success: "",
  });
  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        let res = await axios.delete(
          `${gradeUrl}/delete/${
            details.studentId
          }/${details.className?.toUpperCase()}`,
          {
            signal: controller.signal,
          }
        );
        setMsg({ error: "", success: res.data?.msg });
      } catch (error: any) {
        setMsg({
          error: error?.response?.data?.msg || error?.message,
          success: "",
        });
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  };

  function handleFormInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  if (loading) return <Loading />;
  return (
    <div className="">
      {" "}
      <p className="text-green-600 text-center">{msg.success}</p>
      <p className="text-red-500 text-center">{msg.error}</p>
      <section className="flex justify-center items-center place-items-center relative border ">
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => {
            setOpenDeleteGradeModal(false);
          }}
          className="hover:bg-red-500 dark:text-white text-black hover:text-white  absolute top-0  left-0  p-3 rounded border"
        />

        <form action="" className="grid p-5 gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="enter student Id"
            name="studentId"
            required
            onChange={handleFormInput}
            className="bg-inherit border border-gray-500 p-3 rounded "
          />
          <input
            type="text"
            placeholder="enter class grade to delete"
            name="className"
            required
            onChange={handleFormInput}
            className="bg-inherit border border-gray-500 p-3 rounded "
          />
          <div className="flex justify-center">
            <Button buttontype={0}>Delete</Button>
          </div>
        </form>
      </section>
      <WarningComponent>
        Grade is deleted for Current Term and Current Year
      </WarningComponent>
    </div>
  );
};
export default DeleteGrade;
