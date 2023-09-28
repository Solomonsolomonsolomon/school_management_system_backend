import React from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
import Input from "./Input";
interface Iinput {

  type: any;
  styletype: number;
  placeholder?: string;
}

enum EInput {
  "default",
  "underline",
  "close",
  "update",
}
const schoolUrl = "/school";
const UseFormInput: React.FC = (props, {}: Iinput) => {
  return <></>;
};
export default UseFormInput;
