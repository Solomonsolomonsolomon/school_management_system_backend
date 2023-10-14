import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../../api/axios";
import Loading from "../Loading";
import Button from "../Button/Button";
import WarningComponent from "../../utils/WarningComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
const YearAndTerm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [years, setYears] = useState<any[]>([]);
  const [terms, setTerms] = useState<any[]>([]);
  let [confirmModal, setConfirmModal] = React.useState<boolean>(false);
  let [confirmed, setConfirmable] = React.useState<boolean>(false);
  let [tracker, setTracker] = React.useState<number>(0);
  const { register: yearRegister, handleSubmit: handleYearSubmit } = useForm();
  const {
    register: termRegister,
    handleSubmit: handleTermSubmit,
    reset,
  } = useForm();
  const addYearRef = useRef<HTMLParagraphElement>(null);
  const addTermRef = useRef<HTMLParagraphElement>(null);
  const postUrl = "/admin";

  const handleYearFormSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      addTermRef.current
        ? (addTermRef.current.textContent = "please wait...")
        : "....";
      const res = await axios.post(`${postUrl}/year/add`, data);
      //update UI
      let updateOnYearAddition = years.map((year) => {
        year.isCurrent = false;
        return year;
      });
      setYears([...updateOnYearAddition, res.data?.year]);

      addYearRef.current
        ? (addYearRef.current.textContent = res.data?.msg)
        : "";
    } catch (error: any) {
      addYearRef.current
        ? (addYearRef.current.textContent =
            error.response?.data?.msg || error?.config?.message)
        : "";
      console.error(error);
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
      setConfirmModal(true);
      setTracker(Date.now());
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSetPromotionTerm = async (termId: string) => {
    try {
      setLoading(true);
      const res = await axios.put(`${postUrl}/term/${termId}/set/promotion`);
      console.log(res);
      // Implement logic to update UI or refetch terms data
      const refreshAfterSettingTerm = terms.map((term) => {
        if (term.isCurrent == true) term.isCurrent = false;
        if (term._id === termId) term.isPromotionTerm = true;

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

  React.useEffect(() => {
    async function clearAllTransactions() {
      if (confirmed) {
        try {
          let res = await axios.put(`${postUrl}/term/transactions/reset`);
          console.log(res);
        } catch (error) {}
      } else {
        console.log("canceled by user");
      }
    }
    clearAllTransactions();
  }, [confirmed, tracker]);
  if (loading) return <Loading />;
  if (confirmModal)
    return (
      <PopUpBot confirmModal={setConfirmModal} confirmable={setConfirmable} />
    );
  return (
    <>
      {/* Year Form */}
      <h1 className="dark:bg-gray-900 text-lg text-center font-semibold">
        Add Year
      </h1>
      <p ref={addYearRef} className="dark:bg-gray-900 font-bold text-center">
        ...
      </p>
      <div className="dark:bg-gray-900 flex justify-center">
        <form
          onSubmit={handleYearSubmit(handleYearFormSubmit)}
          className="dark:bg-gray-900 grid justify-center justify-items-start border w-fit py-6 p-2 border-black rounded-xl"
        >
          <label htmlFor="fromYear" className="dark:bg-gray-900 opacity-[.5]">
            FROM
          </label>
          <input
            type="number"
            className="dark:bg-gray-900 border  border-black  rounded p-1 w-fit"
            placeholder="e.g 2022"
            {...yearRegister("fromYear", { required: true, min: 2000 })}
          />
          <label htmlFor="toYear" className="dark:bg-gray-900 opacity-[.5]">
            TO
          </label>
          <input
            className="dark:bg-gray-900 border  border-black rounded p-1"
            type="number"
            placeholder="e.g 2023"
            {...yearRegister("toYear", { required: true, min: 2000 })}
          />

          <Button buttontype={0}>Add Year</Button>
        </form>
      </div>

      {/* Term Form */}
      <h1 className="dark:bg-gray-900 text-lg mt-2 font-bold  text-center">
        Add Term
      </h1>
      <p ref={addTermRef} className="dark:bg-gray-900 font-bold text-center">
        ...
      </p>
      <div className="dark:bg-gray-900 flex justify-center">
        <form
          onSubmit={handleTermSubmit(handleTermFormSubmit)}
          className="dark:bg-gray-900 grid justify-center justify-items-start border w-fit p-2 border-black rounded-xl text-gray-600 "
        >
          <label htmlFor="termName">Name</label>
          <input
            type="text"
            id="termName"
            placeholder="e.g 1st term"
            className="dark:bg-gray-900  border w-fit  border-black rounded p-1"
            {...termRegister("name", { required: true })}
          />
          <Button buttontype={0}>Add Term</Button>
        </form>
      </div>

      {/* Display List of Years */}
      <div className="dark:bg-gray-900 grid justify-items- border justify-center my-3">
        <div className="dark:bg-gray-900 w-[200px]sm:w-[400px] lg:w-[100%] md:w-[100%] w-[300px]">
          <div className="dark:bg-gray-900  sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px] h-[400px] overflow-y-auto">
            <h1 className="dark:bg-gray-900 font-bold text-center">
              List of Years
            </h1>
            <table className="dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
              <thead className="dark:bg-gray-900 ">
                <tr>
                  {/* <th className="dark:bg-gray-900 py-3 px-4 pr-0">Checkbox input</th> */}
                  <th className="dark:bg-gray-900 px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase">
                    Year Name
                  </th>
                  <th className="dark:bg-gray-900 px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase">
                    IS CURRENT
                  </th>
                  <th className="dark:bg-gray-900 px-6 py-3  text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {years.map((year: any, index: number) => (
                  <tr key={index}>
                    <td>{year.name}</td>
                    <td>{`${year.isCurrent}`}</td>
                    {/* ... Your years table cells ... */}

                    <td
                      className="dark:bg-gray-900 px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleSetCurrentYear(year._id)}
                    >
                      Set Current
                    </td>
                    <td
                      className="dark:bg-gray-900 px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleDeleteYear(year._id)}
                    >
                      Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <WarningComponent>
            If you do not set a Promotion term ,Auto promotion is Disabled
          </WarningComponent>
          {/* Display List of Terms */}
          <div className="dark:bg-gray-900 w-[200px] sm:w-[400px] lg:w-[100%] md:w-[100%] w-[350px] h-[400px] overflow-y-auto">
            <h1 className="dark:bg-gray-900 text-center font-bold">
              List of Terms
            </h1>
            <table className="dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border">
              <thead className="dark:bg-gray-900 bg-gray-50">
                <tr>
                  {/* ... Your terms table headers ... */}
                  <th className="dark:bg-gray-900 px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase">
                    Term Name
                  </th>
                  <th className="dark:bg-gray-900 px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase">
                    Current Term
                  </th>
                  <th className="dark:bg-gray-900 px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase">
                    Promotion Term
                  </th>
                  <th className="dark:bg-gray-900 px-6 py-3  text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {terms.map((term: any, index: number) => (
                  <tr key={index}>
                    {/* ... Your terms table cells ... */}
                    <td>{term.name}</td>
                    <td>{`${term.isCurrent}`}</td>
                    <td>{`${term.isPromotionTerm}`}</td> 
                    <td
                      className="dark:bg-gray-900 px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleSetCurrentTerm(term._id)}
                    >
                      Set Current
                    </td>

                    <td
                      className="dark:bg-gray-900 px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleSetPromotionTerm(term._id)}
                    >
                      Set As Promotion Term
                    </td>
                    <td
                      className="dark:bg-gray-900 px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer"
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
      </div>
    </>
  );
};

export default YearAndTerm;

const PopUpBot: React.FC<{
  confirmable: React.SetStateAction<any>;
  confirmModal: React.SetStateAction<any>;
}> = ({ confirmable, confirmModal }) => {
  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmable */}
      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh] dark:bg-gray-800 bg-white ">
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-50 rounded-2xl shadow-2xl h-fit box-border p-20">
          <h1 className="p-5 text-sm">
            Hey there.👋.It's me solaceBot{" "}
            <FontAwesomeIcon icon={faRobot} className="text-blue-600 mx-2" />
            ,I noticed you just set current term,will you like to reset all
            transaction(school fees,bus fees,etc) in prep for the new term
          </h1>
          <span className="absolute right-2">
            <button
              className="bg-blue-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(true);
                confirmModal(false);
              }}
            >
              Yes
            </button>
          </span>
          <span className="absolute left-2">
            {" "}
            <button
              className="bg-red-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(false);
                confirmModal(false);
              }}
            >
              No
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
