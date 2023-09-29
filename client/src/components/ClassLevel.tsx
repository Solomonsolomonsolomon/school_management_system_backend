import React from "react";
import axios from "./../api/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "./Loading";
import Button from "./Button/Button";
const getUrl = "/admin";
const ClassLevel: React.FC = () => {
  let [classes, setClasses] = React.useState<any[]>([]);
  let { register, handleSubmit } = useForm();
  let [loading, isLoading] = React.useState<boolean>(false);
  let errRef = React.useRef<HTMLParagraphElement>(null);
  let AddRef = React.useRef<HTMLParagraphElement>(null);
  let [searchQuery, setSearchQuery] = React.useState<any>("");

  React.useEffect(() => {
    let controller = new AbortController();
    fetchClasses();
    async function fetchClasses() {
      try {
        isLoading(true);
        const res = await axios.get(`${getUrl}/class/get/all`);

        res.data?.classes ? setClasses(res.data?.classes) : setClasses([]);
        isLoading(false);
        console.log("here");
      } catch (error) {
        console.log(error);
        isLoading(false);
      }
    }
    return () => {
      controller.abort();
    };
  }, []);
  if (loading) {
    return <Loading />;
  }

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data);
    let name = `${data.currentClassLevel}${data.currentClassArm}`;
    submitAddClassForm();

    async function submitAddClassForm() {
      try {
        let res = await axios.post(`${getUrl}/class/new`, {
          name,
          price: data?.price,
        });
        console.log(res);
        AddRef.current ? (AddRef.current.textContent = res.data?.msg) : "";
        setClasses([...classes, res.data?.newClassLevel]);
      } catch (error: any) {
        console.log(error);
        AddRef.current
          ? (AddRef.current.textContent =
              error.response?.data?.msg || error?.message)
          : "";
      }
    }
  };

  const filteredClasses = classes.filter((classname) =>
    classname.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[200px]sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px]">
      <p className="text-bold text-center text-[20px] bg-gray-100 text-gray-600 border rounded">
        Add Class Level
      </p>
      <p className="text-center" ref={AddRef}></p>
      <form
        className="grid mb-4 dark:bg-gray-900 grid-cols-1 place-content-center items-center self-center gap-2 justify-center justify-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <label htmlFor="">Enter Class Name</label>
        <select
          className="border rounded dark:bg-gray-900 border-gray-400 w-[200px]"
          {...register("currentClassLevel", { required: true })}
        >
          <option value="NUR1">NUR1</option>
          <option value="NUR2">NUR2</option>
          <option value="NUR3">NUR3</option>
          <option value="PRY1">PRY1</option>
          <option value="PRY2">PRY2</option>
          <option value="PRY3">PRY3</option>
          <option value="PRY4">PRY4</option>
          <option value="PRY5">PRY5</option>
          <option value="PRY6">PRY6</option>
          <option value="JSS1">JSS1</option>
          <option value="JSS2">JSS2</option>
          <option value="JSS3">JSS3</option>
          <option value="SSS1">SSS1</option>
          <option value="SSS2">SSS2</option>
          <option value="SSS3">SSS3</option>
        </select>
        <label htmlFor="">Enter Class Arm</label>
        <select
          className="border dark:bg-gray-900 rounded border-gray-400 w-[200px] "
          {...register("currentClassArm", { required: true })}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="H">H</option>
          <option value="I">I</option>
          <option value="J">J</option>
          <option value="K">K</option>
          <option value="L">L</option>
          <option value="M">M</option>
          <option value="N">N</option>
          <option value="O">O</option>
          <option value="P">P</option>
        </select>
        <input
          type="number"
          placeholder="enter school fees"
          {...register("price")}
          className="border-b-2 dark:bg-gray-900 border-t-0 border-l-0 border-r-0 border border-black"
        />
        <Button buttontype={0}>ADD CLASS</Button>
      </form>

      <div className="flex flex-col border p-10 ">
        {/* Search bar */}

        <p ref={errRef}></p>
        {/* Table */}
        <div className="overflow-x-auto">
          <input
            type="search"
            placeholder="Search for theClass..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="p-2 dark:bg-gray-900 border rounded  w-[45%]"
          />
          <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="py-3 px-4 pr-0">{/* Checkbox input */}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  No of Students
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredClasses.map((theClass: any, index: number) => (
                <tr key={index}>
                  <td className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      {/* ... Checkbox input ... */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {theClass.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {theClass.numberOfStudents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {theClass.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
                    <a
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        let confirmable = window.confirm(
                          "are you sure,this action is permanent"
                        );
                        async function deleteIt() {
                          try {
                            let del = await axios.delete(
                              `${getUrl}/class/${theClass._id}/delete`
                            );
                            errRef.current
                              ? (errRef.current.textContent = del?.data?.msg)
                              : "";
                            // Refresh the list of theClasss after deletion
                            const updatedtheClasss = classes.filter(
                              (s: any) => s._id !== theClass._id
                            );
                            setClasses(updatedtheClasss);
                          } catch (error: any) {
                            console.log(error);
                            errRef.current
                              ? (errRef.current.textContent =
                                  error.response?.data?.msg || error?.message)
                              : "";
                          }
                        }
                        if (confirmable) {
                          deleteIt();
                        } else {
                          console.log("user cancelled delete");
                        }
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ClassLevel;
