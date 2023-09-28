import React from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
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
const Input: React.FC<Iinput> = (props, {}: Iinput) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [color, setColor] = React.useState<string>("#000000");
  const styleClass = (() => {
    switch (EInput[props.styletype]) {
      case "default":
        console.log(color);
        return ` dark:text-black border p-2 w-fit rounded border-gray-400`;
      case "underline":
        return "dark:text-black border border-b-2 border-x-0 border-y-0 ";
      case "update":
        return "dark:text-black px-4 py-2 bg-blue-500 text-white rounded";
      default:
        return "dark:text-black bg-red-700 text-white w-fit rounded p-2";
    }
  })();

  React.useEffect(() => {
    async function getColor() {
      try {
        const res = await axios.get(`${schoolUrl}/theme/current`);
        const fetchedColors = res.data?.themes;
        if (fetchedColors) {
          setColor(res.data?.themes.text);
        }
      } catch (error) {
        error;
      } finally {
        setLoading(false);
      }
    }

    getColor();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <input
        {...props}
        className={styleClass}
        style={{
          color: `${EInput[props.styletype] == "default" ? color : ""}`,
        }}
      />
    </>
  );
};
export default Input;
