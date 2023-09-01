import { UseFormRegister, useForm, Path } from "react-hook-form";

interface Iinput {
  type?: string;
  register?: UseFormRegister<any>;
  label?: Path<any>;
  required?: boolean;
}
const Input: React.FC<Iinput> = (props, { register }: Iinput) => {
  return (
    <>
      <input {...props} />
    </>
  );
};
export default Input;
