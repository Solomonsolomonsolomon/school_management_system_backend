import axios from "../../api/axios";
import Button from "../Button/Button";
import React from "react";
let expenseUrl = "/expense";
const Expense: React.FC = () => {
  let [addInput, setAddInput] = React.useState<{
    name: string;
    amount: number;
  }>({ name: "", amount: 0 });

  function handleAddInput(e: React.ChangeEvent<HTMLInputElement>) {
    setAddInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handelAddSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let controller = new AbortController();
    (async () => {
     try {
         let res = await axios.post(`${expenseUrl}/new`, addInput, {
           signal: controller.signal,
         });
         console.log(res);
         setAddInput({ name: "", amount: 0 });
     } catch (error) {
        
     }
    })();
    return () => {
      controller.abort();
    };
  }
  return (
    <>
      <p>Welcome to the Expense Tracker</p>
      <p>Track your expense and monitor your spending</p>
      <form onSubmit={handelAddSubmit} className="grid justify-center  p-5 gap-2">
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
    </>
  );
};
export default Expense;
