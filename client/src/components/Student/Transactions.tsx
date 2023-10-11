import React from "react";
import axios from "../../api/axios";
const transaction = "/transaction";
let parsed: any = {
  id: "",
};
let user = sessionStorage.getItem("user");

if (user) {
  parsed = JSON.parse(user);
}

let id = parsed._id;
const Transaction: React.FC = () => {
  let [transactions, setTransactions] = React.useState<any[]>([]);
  React.useEffect(() => {
    async function yourTransactions() {
      try {
        const res = await axios.get(
          `${transaction}/get/student/${id}?term=true&status=success`
        );
        console.log(res);
        setTransactions(res?.data?.transactions);
      } catch (error) {}
    }
    yourTransactions();
  }, []);
  return (
    <>
      <h1 className="text-center font-bold text-lg">
        All Transactions this Term
      </h1>
      <div className="rounded ">
        <div className="overflow-x-auto w-full rounded">
          <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border rounded">
            <thead className="bg-gray-50 dark:bg-gray-700 rounded border">
              <tr>
                <th className="py-3 px-4 pr-0">{/* Checkbox input */}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  FOR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((admin: any, index: number) => (
                <tr key={index}>
                  <td className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      {/* ... Checkbox input ... */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {admin?.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {admin.amountPaid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {admin.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Transaction;
