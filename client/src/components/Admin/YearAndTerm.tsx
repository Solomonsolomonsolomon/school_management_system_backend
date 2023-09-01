import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../../api/axios";
import Loading from "../Loading";

const YearAndTerm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [years, setYears] = useState<any[]>([]);
  const [terms, setTerms] = useState<any[]>([]);
  const { register: yearRegister, handleSubmit: handleYearSubmit } = useForm();
  const {
    register: termRegister,
    handleSubmit: handleTermSubmit,
    reset,
  } = useForm();
  const addYearRef = useRef<HTMLParagraphElement>(null);
  const addTermRef = useRef<HTMLParagraphElement>(null);
  const postUrl = "/admin";
  interface IYear {
    fromYear: string;
    toYear: string;
  }

  interface ITerm {
    name: string;
  }

  const handleYearFormSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      addTermRef.current
        ? (addTermRef.current.textContent = "please wait...")
        : "";
        const res = await axios.post(`${postUrl}/year/add`, data);
    //update UI
    let updateOnYearAddition=years.map((year)=>{
        year.isCurrent=false;
        return year;
    })
    setYears([...updateOnYearAddition,res.data?.year])

      addYearRef.current
        ? (addYearRef.current.textContent = res.data?.msg)
        : "";
      console.log(res);
    } catch (error: any) {
      addYearRef.current
        ? (addYearRef.current.textContent =
            error.response?.data?.msg || error?.config?.message)
        : "";
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTermFormSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      addTermRef.current
        ? (addTermRef.current.textContent = "please wait....")
        : "";
      const res = await axios.post(`${postUrl}/term/add`, data);
      addTermRef.current
        ? (addTermRef.current.textContent = res.data?.msg)
        : "";
      console.log(res);
     
        setTerms([...terms, res.data?.term]);
      reset(); // Reset the form
    } catch (error: any) {
      addTermRef.current
        ? (addTermRef.current.textContent =
            error.response?.data?.msg || error?.config?.message)
        : "";
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetCurrentYear = async (yearId: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${postUrl}/year/${yearId}/set/current`);
      console.log(res);

      // Implement logic to update UI or refetch years data
      const refreshAfterSettingYear = years.map((year) => {
        if (year.isCurrent == true) year.isCurrent = false;
        if (year._id === yearId) year.isCurrent = true;

        return year;
      });
      setYears(refreshAfterSettingYear);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetCurrentTerm = async (termId: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${postUrl}/term/${termId}/set/current`);
      console.log(res);
      // Implement logic to update UI or refetch terms data
      const refreshAfterSettingTerm = terms.map((term) => {
        if (term.isCurrent == true) term.isCurrent = false;
        if (term._id === termId) term.isCurrent = true;

        return term;
      });
      setYears(refreshAfterSettingTerm);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteYear = async (yearId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this year? This action is permanent."
    );

    if (confirmDelete) {
      try {
        setLoading(true);
        const res = await axios.delete(`${postUrl}/year/${yearId}/delete`);
        console.log(res);
        // Implement logic to update UI or refetch years data
        let updateOnDeleteYear = years.filter((year) => {
          return year._id != yearId;
        });
        setYears(updateOnDeleteYear);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteTerm = async (termId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this term? This action is permanent."
    );

    if (confirmDelete) {
      try {
        setLoading(true);
        const res = await axios.delete(`${postUrl}/term/${termId}/delete`);
        console.log(res);
        // Implement logic to update UI or refetch terms data
        let updateOnDeleteTerm = terms.filter((term) => {
          return term._id != termId;
        });
        setTerms(updateOnDeleteTerm);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    async function getAllYears() {
      try {
        setLoading(true);
        const res = await axios.get(`${postUrl}/year/get/all`, {
          signal: controller.signal,
        });
        setYears(res.data?.years);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    async function getAllTerms() {
      try {
        setLoading(true);
        const res = await axios.get(`${postUrl}/term/get/all`, {
          signal: controller.signal,
        });
        setTerms(res.data?.terms);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getAllYears();
    getAllTerms();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1>Year and Term</h1>

      {/* Year Form */}
      <h1 className="text-[20px] text-center">Add Year</h1>
      <p ref={addYearRef}>...</p>
      <div className="flex justify-center">
        <form
          onSubmit={handleYearSubmit(handleYearFormSubmit)}
          className="grid justify-center justify-items-center border w-[350px] p-6  border-black rounded text-gray-600 "
        >
          <label htmlFor="fromYear">FROM</label>
          <input
            type="number"
            className="border w-[250px] border-black"
            {...yearRegister("fromYear", { required: true, min: 2000 })}
          />
          <label htmlFor="toYear">TO</label>
          <input
            className="border w-[250px] border-black"
            type="number"
            {...yearRegister("toYear", { required: true, min: 2000 })}
          />
          <button className="border bg-gray-500 p-2 rounded text-white">
            Add Year
          </button>
        </form>
      </div>

      {/* Term Form */}
      <h1 className="text-[20px] text-center">Add Term</h1>
      <p ref={addTermRef}>...</p>
      <div className="flex justify-center">
        <form
          onSubmit={handleTermSubmit(handleTermFormSubmit)}
          className="grid justify-center justify-items-center border w-[350px] p-6  border-black rounded text-gray-600 "
        >
          <label htmlFor="termName">Name</label>
          <input
            type="text"
            id="termName"
            className="border w-[250px] border border-black"
            {...termRegister("name", { required: true })}
          />
          <button className="border bg-gray-500 p-2 rounded text-white">
            Add Term
          </button>
        </form>
      </div>

      {/* Display List of Years */}
      <div className="w-[200px]sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px]">
        <div className="w-[200px] sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px] h-[400px] overflow-y-auto">
          <h1>List of Years</h1>
          <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {/* <th className="py-3 px-4 pr-0">Checkbox input</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Year Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  IS CURRENT
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {years.map((year: any, index: number) => (
                <tr key={index}>
                  <td>{year.name}</td>
                  <td>{`${year.isCurrent}`}</td>
                  {/* ... Your years table cells ... */}

                  <td
                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleSetCurrentYear(year._id)}
                  >
                    Set Current
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleDeleteYear(year._id)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Display List of Terms */}
        <div className="w-[200px] sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px] h-[400px] overflow-y-auto">
          <h1>List of Terms</h1>
          <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {/* ... Your terms table headers ... */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Term Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Current Term
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {terms.map((term: any, index: number) => (
                <tr key={index}>
                  {/* ... Your terms table cells ... */}
                  <td>{term.name}</td>
                  <td>{`${term.isCurrent}`}</td>

                  <td
                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleSetCurrentTerm(term._id)}
                  >
                    Set Current
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleDeleteTerm(term._id)}
                  >
                    Delete
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

export default YearAndTerm;
