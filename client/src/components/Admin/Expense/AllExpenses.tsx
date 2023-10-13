interface IExpenses {
  retrigger: number;
}
import React from "react";
import axios from "../../../api/axios";
const expenseUrl = "/expense";

const AllExpenses: React.FC<IExpenses> = ({ retrigger }) => {
  let [expenses, setExpenses] = React.useState<any[]>([]);
  let [page, setCurrentPage] = React.useState<number>(1);
  let [totalPages, setTotalPages] = React.useState<number>(1);
  function pagesRender() {
    let el = [];
    for (let i = 1; i <= totalPages; i++) {
      el.push(
        <span
          key={i}
          className={`1ml-2  px-2 ${
            page === i ? "bg-blue-900 text-white" : ""
          } bg-blue-50  rounded-full`}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </span>
      );
    }
    return el;
  }
  React.useEffect(() => {
    (async () => {
      try {
        console.log(page)
        let res = await axios.get(
          `${expenseUrl}/school?month=true&term=true&year=true&pageSize=5&page=${page}`
        );
        setTotalPages(res?.data?.totalPages);
        setExpenses(res?.data?.expenses);
      } catch (error) {}
    })();
  }, [retrigger,page]);
  return (
    <>
      <h1 className="font-bold text-center text-xl ">All Expenses</h1>
      <div className="rounded mb-20 ">
        <div className="overflow-x-auto w-[100vw] rounded relative">
          <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border rounded">
            <thead className="bg-gray-50 dark:bg-gray-700 rounded border">
              <tr>
                <th className="py-3 px-4 pr-0">{/* Checkbox input */}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  schoolName
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.map((admin: any, index: number) => (
                <tr key={index}>
                  <td className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      {/* ... Checkbox input ... */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {admin.amountPaid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {admin?.createdBy?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {admin.school}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className="flex flex-wrap justify-start mt-20 gap-4 bg-white dark:bg-gray-900 p-4  absolute bottom-0 ">
          {" "}
          pages:{pagesRender()}
        </section>
      </div>
    </>
  );
};
export default AllExpenses;
