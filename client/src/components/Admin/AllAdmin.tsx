import React from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
let baseUrl = "/admin";
const AllAdmin: React.FC = () => {
  let [loading, setLoading] = React.useState<boolean>(true);
  let [msg, setMsg] = React.useState<string>("");
  let [alladmin, setAllAdmin] = React.useState<any[]>([]);
  React.useEffect(() => {
    let controller = new AbortController();
    async function call() {
      try {
        setLoading(true);
        let res = await axios.get(`${baseUrl}/get/admin`, {
          signal: controller.signal,
        });
        setMsg(res.data?.msg || "All Admin");
        setAllAdmin(res.data?.admins);
        setLoading(false);
      } catch (error: any) {
        if (error.name == "AbortError" || error.name == "CanceledError") return;
        setMsg(
          error?.response?.data?.msg || error?.message || "Error fetching Admin"
        );
        setLoading(false);
      }
    }
    call();
    return () => {
      controller.abort();
    };
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <p className="font-bold text-center">{msg || "All Admin"}</p>
      <p className="italic underline p-3">
        Please note.Admin is view only and cannot be deleted
      </p>
      <div>
        <div className="overflow-x-auto">
          <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 pr-0">{/* Checkbox input */}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  schoolId
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  schoolName
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {alladmin.map((admin: any, index: number) => (
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
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {admin.schoolId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {admin.school}
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

export default AllAdmin;
