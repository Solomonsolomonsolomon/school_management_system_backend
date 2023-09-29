import React, { PropsWithChildren, useEffect, useState } from "react";
import Loading from "../Loading";
import axios from "../../api/axios";

let schoolUrl = "/school";

enum EButton {
  "default",
  "green",
  "close",
  "update",
}

interface IButton {
  onClick?: any;
  buttontype: EButton;
}

const Button: React.FC<PropsWithChildren<IButton>> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [colors, setColors] = useState<any>({
    button: "#4a5565",
    buttonText: "#ffffff",
  });

  useEffect(() => {
    async function getColor() {
      try {
        const res = await axios.get(`${schoolUrl}/theme/current`);
        const fetchedColors = res.data?.themes;
        if (fetchedColors) {
          setColors({
            ...fetchedColors,
          });
        }
      } catch (error) {
        error;
      } finally {
        setLoading(false);
      }
    }

    getColor();
  }, []);

  const buttonClass = (() => {
    switch (EButton[props.buttontype]) {
      case "default":
        console.log(colors);
        return `p-3 border text relative rounded w-[200px] mt-2`;
      case "green":
        return "bg-green-500 rounded p-2";
      case "update":
        return "px-4 py-2 bg-blue-500 text-white rounded";
      default:
        return "bg-red-700 text-white w-fit rounded p-2";
    }
  })();

  if (loading) return <Loading />;
  return (
    <button
      className={buttonClass}
      {...props}
      style={{
        backgroundColor: `${
          EButton[props.buttontype] == "default"
            ? colors.button || "#4a5365"
            : ""
        }`,
        color: `${
          EButton[props.buttontype] == "default" ? colors.buttonText : ""
        }`,
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
