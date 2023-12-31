import React from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
import WarningComponent from "../../utils/WarningComponent";
import NotFoundComponent from "../../utils/404Component";
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
    <div className="w-[380px] lg:w-full md:w-full sm:w-full">
      {alladmin.length ? (
        <>
          <p className="font-bold text-center">{msg || "All Admin"}</p>
          <WarningComponent>
            please note admin is view only and cannot be deleted
          </WarningComponent>
          <div className="rounded ">
            <div className="overflow-x-auto w-full rounded">
              <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border rounded">
                <thead className="bg-gray-50 dark:bg-gray-700 rounded border">
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
      ) : (
        <NotFoundComponent>{msg||"No admins Found"}</NotFoundComponent>
      )}
    </div>
  );
};

export default AllAdmin;
