import axios from "../../api/axios";
import Button from "../Button/Button";
import React from "react";
import AllExpenses from "./Expense/AllExpenses";
let expenseUrl = "/expense";

const Expense: React.FC = () => {
  let [addInput, setAddInput] = React.useState<{
    name: string;
    amount: number;
  }>({ name: "", amount: 0 });
  interface IMsg {
    error: string;
    success: string;
  }
  let [msg, setMsg] = React.useState<IMsg>({
    error: "",
    success: "",
  });
  const [trigger, setRetrigger] = React.useState<number>(0);
  function handleAddInput(e: React.ChangeEvent<HTMLInputElement>) {
    setAddInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handelAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let controller = new AbortController();
    (async () => {
      try {
        let res = await axios.post(`${expenseUrl}/new`, addInput, {
          signal: controller.signal,
        });
        setMsg({ error: "", success: res.data?.msg });
        console.log(res);
        setAddInput({ name: "", amount: 0 });
        setRetrigger(Date.now())
      } catch (error: any) {
        setMsg({
          error: error?.response?.data?.msg || error?.message,
          success: "",
        });
      }
    })();
    return () => {
      controller.abort();
    };
  }
  return (
    <>
      <p className="text-center text-xl">Welcome to the Expense Tracker</p>
      <p className="text-center ">
        Track your expense and monitor your spending
      </p>
      <p className="text-red-500 text-center">{msg.error}</p>
      <p className="text-green-500 text-center">{msg.success}</p>
      <form
        onSubmit={handelAddSubmit}
        className="grid justify-center  p-5 gap-2"
      >
        <input
          type="text"
          name="name"
          onChange={handleAddInput}
          className="bg-inherit p-1 border rounded w-fit"
          placeholder="expense name "
          value={addInput.name}
        />
        <input
          type="number"
          name="amount"
          className="bg-inherit p-1 border rounded w-fit"
          placeholder="amount"
          onChange={handleAddInput}
          required
          min="1"
          value={addInput.amount}
        />

        <Button buttontype={0}>Add Expense</Button>
      </form>

      <div>
        
        <AllExpenses retrigger={trigger} />
      </div>
    </>
  );
};
export default Expense;
