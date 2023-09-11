import React from "react";
let user = sessionStorage.getItem("user");
let details: any;
if (user) details = JSON.parse(user);

const PayFees: React.FC = () => {
  return (
    <div>
      <p></p>
      <form action="" className="grid justify-center p-2 gap-2">
        <label htmlFor=""></label> 
        <input
          type="email"
          placeholder="email"
          defaultValue={details?.email}
          className="border border-l-0 border-r-0 border-t-0 border-black border-bottom-2"
        />
        <input
          type="number"
          placeholder="amount"
          className="border border-l-0 border-r-0 border-t-0 border-black border-bottom-2"
        />
        <button className="bg-gray-900 p-2 rounded text-white">Proceed</button>
      </form>
    </div>
  );
};

export default PayFees;
