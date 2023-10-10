import React from "react";
import axios from "../../../api/axios";
import Loading from "../../Loading";
import NotFoundComponent from "../../../utils/404Component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
let busUrl = "/bus";

const AllStudentsTakingBus: React.FC<any> = ({ setView }) => {
  let [loading, setLoading] = React.useState<boolean>(false);
  let [students, setStudents] = React.useState<any[]>([]);
  let [page, setCurrentPage] = React.useState<number>(1);
  let [totalPages, setTotalPages] = React.useState<number>(1);
  let [selected, setSelected] = React.useState<any>({
    studentId: "",
    address: "",
  });
  let [confirmEditModal, setconfirmEditModal] = React.useState<boolean>(false);
  let [_, setconfirmed] = React.useState<boolean>(false);
  let [Deletemodal, setDeletemodal] = React.useState<boolean>(false); //for delete
  let [confirmable, setConfirmable] = React.useState<boolean>(false);
  let [retrigger, setRetrigger] = React.useState<number>(0);
  let [payFeesModal, setPayFeesModal] = React.useState<boolean>(false);
  let [_confirmablePay, setConfirmablePay] = React.useState<boolean>(false);
  interface IMsg {
    error: string;
    success: string;
  }
  let [msg, setMsg] = React.useState<IMsg>({
    error: "",
    success: "",
  });
  React.useEffect(() => {
    let controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        let res = await axios.get(
          `${busUrl}/students/all?pageSize=4&page=${page}`,
          {
            signal: controller.signal,
          }
        );
        setStudents(res.data?.bus);
        setTotalPages(res?.data?.totalPages);
        setLoading(false);
        setMsg({ error: "", success: res.data?.msg });
      } catch (error: any) {
        if (error.name === "CanceledError" || error.name === "AbortError")
          return;
        setMsg({
          error: error?.response?.data?.msg || error?.message,
          success: "",
        });
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [page, retrigger]);

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
    if (confirmable) {
      handleDelete();
    } else {
      console.log("user canceled request");
    }
    async function handleDelete() {
      try {
        setLoading(true);
        let res = await axios.delete(`${busUrl}/delete/${selected.studentId}`);
        setMsg({ error: "", success: res.data?.msg });
        let updateUI = students.filter(
          (student) => student.studentId !== selected.studentId
        );
        setStudents(updateUI);
      } catch (error: any) {
        setMsg({
          error: error?.response?.data?.msg || error?.message,
          success: "",
        });
      } finally {
        setLoading(false);
      }
    }
  }, [confirmable]);
  if (!loading && !students.length)
    return (
      <>
        <button
          className="border p-2 mx-2 bg-blue-700 text-white rounded "
          onClick={() => setView("navbar")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <NotFoundComponent>{msg.error}</NotFoundComponent>
      </>
    );
  if (loading) return <Loading />;
  if (confirmEditModal)
    return (
      <EditModal
        confirmEditModal={setconfirmEditModal}
        confirmed={setconfirmed}
        selected={selected}
        retrigger={setRetrigger}
      />
    );
  if (Deletemodal)
    return (
      <DeleteModal
        confirmable={setConfirmable}
        Deletemodal={setDeletemodal}
        selected={selected}
      />
    );
  if (payFeesModal)
    return (
      <BusFees
        confirmablePay={setConfirmablePay}
        payFeesModal={setPayFeesModal}
        selected={selected}
        retrigger={setRetrigger}
      />
    );
  return (
    <>
      {" "}
      <button
        className="border p-2 bg-blue-700 text-white rounded"
        onClick={() => setView("navbar")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <main>
        <p className="text-green-600 text-center">{msg.success}</p>
        <p className="text-red-500 text-center">{msg.error}</p>

        <div className="w-[380px] lg:w-full md:w-full sm:w-full mb-10">
          <div className="overflow-x-auto w-full rounded">
            <table className="divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto border rounded">
              <thead className="bg-gray-50 dark:bg-gray-700 rounded border">
                <tr>
                  <th className="py-3 px-4 pr-0">{/* Checkbox input */}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>{" "}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    studentId
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Bus Fees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Percentage Paid
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {students.map((student: any, index: number) => (
                  <tr key={index}>
                    <td className="py-3 pl-4">
                      <div className="flex items-center h-5">
                        {/* ... Checkbox input ... */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {student?.id?.name}
                    </td>{" "}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student.isPaid ? "paid" : "unpaid"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student.balance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {student.percentagePaid?.toFixed(2)}%
                    </td>
                    <td
                      onClick={() => {
                        console.log(student.id.name);

                        setconfirmEditModal(true);
                        setSelected(student);
                      }}
                      className="px-6 py-4 whitespace-nowrap text-sm dark:text-blue-900 text-blue-500"
                    >
                      edit
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm dark:text-blue-900 text-blue-500"
                      onClick={() => {
                        setPayFeesModal(true);
                        setSelected(student);
                      }}
                    >
                      pay fees
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm dark:text-blue-900 text-blue-500"
                      onClick={() => {
                        setDeletemodal(true);
                        setSelected(student);
                      }}
                    >
                      Remove from bus line
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <section className="flex flex-wrap justify-start mt-20 gap-4 bg-white dark:bg-gray-900 p-4  absolute bottom-0 ">
            {" "}
            pages:{pagesRender()}
          </section>
        </div>
      </main>
    </>
  );
};
export default AllStudentsTakingBus;
//edit modal
const EditModal: React.FC<{
  confirmed: React.SetStateAction<any>;
  confirmEditModal: React.SetStateAction<any>;
  selected: any;
  retrigger: any;
}> = ({ confirmed, confirmEditModal, selected, retrigger }) => {
  interface Iform {
    studentId: string;
    address: string;
  }
  let [details, setDetails] = React.useState<Iform>({
    address: selected.address,
    studentId: selected.studentId,
  });
  interface IMsg {
    error: string;
    success: string;
  }
  let [msg, setMsg] = React.useState<IMsg>({
    error: "",
    success: "",
  });

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(details);
    (async () => {
      try {
        let res = await axios.put(
          `${busUrl}/modify/student/details/${selected.studentId}`,
          details
        );
        console.log(res);
        setMsg({ error: "", success: res.data?.msg });
        setDetails({ address: "", studentId: "" });
        confirmEditModal(false);
        retrigger(Date.now());
      } catch (error: any) {
        setMsg({
          error: error?.response?.data?.msg || error?.message,
          success: "",
        });
      }
    })();
  };

  function handleFormInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  // React.useEffect(() => {
  //   if (confirmed) {
  //     editStudent();
  //   } else {
  //     console.log("canceled by user");
  //   }
  //   async function editStudent() {
  //     try {
  //       let res = await axios.put(
  //         `${busUrl}/modify/student/details/${selected.studentId}`
  //       );
  //       console.log(res);
  //     } catch (error) {}
  //   }
  // }, [track]);
  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmed */}
      {/* const [confirmed,setconfirmed]=React.useState<boolean>(false);
    const [confirmEditModal,setconfirmEditModal]=React.useState<boolean>(false); */}

      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh]  ">
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-2xl h-fit box-border p-20">
          <h1 className="p-5 ">Edit Student Information</h1>
          <p className="text-center text-green-500">{msg.success}</p>
          <p className="text-center text-red-500">{msg.error}</p>
          <form
            action=""
            className="p-6 border rounded  border-gray-600"
            onSubmit={handleSubmit}
          >
            <input
              className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600  "
              type="text"
              name="studentId"
              placeholder="enter studentId"
              onChange={handleFormInput}
              defaultValue={selected.studentId}
              value={details.studentId}
              readOnly
            />
            <textarea
              className="border w-fit block mt-2 p-2 rounded bg-inherit border-gray-600 "
              name="address"
              id=""
              placeholder="enter address"
              onChange={handleFormInput}
              value={details.address}
              defaultValue={selected.address}
            ></textarea>
            <Button buttontype={0} onClick={() => {}}>
              Edit
            </Button>
          </form>
          {/* <span className="absolute right-2">
            <button
              className="bg-blue-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmed(true);
                confirmEditModal(false);
              }}
            >
              Continue
            </button>
          </span> */}
          <span className="absolute left-2">
            {" "}
            <button
              className="bg-red-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmed(false);
                confirmEditModal(false);
              }}
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
//deleteModal

const DeleteModal: React.FC<{
  confirmable: React.SetStateAction<any>;
  Deletemodal: React.SetStateAction<any>;
  selected: any;
}> = ({ confirmable, Deletemodal, selected }) => {
  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmable */}
      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh] dark:bg-gray-800 bg-white ">
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-2xl h-fit box-border p-20">
          <h1 className="p-5 ">
            Are you sure you want to remove {selected?.id?.name}
          </h1>
          <span className="absolute right-2">
            <button
              className="bg-blue-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(true);
                Deletemodal(false);
              }}
            >
              Continue
            </button>
          </span>
          <span className="absolute left-2">
            {" "}
            <button
              className="bg-red-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(false);
                Deletemodal(false);
              }}
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

//payfees
const BusFees: React.FC<{
  confirmablePay: React.SetStateAction<any>;
  payFeesModal: React.SetStateAction<any>;
  selected: any;
  retrigger: React.SetStateAction<any>;
}> = ({ confirmablePay, payFeesModal, selected, retrigger }) => {
  interface Iform {
    isPaid: string;
    amountPaid: number;
  }
  let [details, setDetails] = React.useState<Iform>({
    isPaid: "",
    amountPaid: 0,
  });
  interface IMsg {
    error: string;
    success: string;
  }
  let [msg, setMsg] = React.useState<IMsg>({
    error: "",
    success: "",
  });

  async function PayFees(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      let res = await axios.put(
        `${busUrl}/pay/fees/${selected.studentId}`,
        details
      );
      setMsg({ error: "", success: res.data?.msg });

      setDetails({ amountPaid: 0, isPaid: "" });
      payFeesModal(false);
      retrigger(Date.now());
    } catch (error: any) {
      setMsg({
        error: error?.response?.data?.msg || error?.message,
        success: "",
      });
    }
  }
  function handleFormInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmable */}

      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh] dark:bg-gray-800 bg-white ">
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-2xl h-fit box-border p-20">
          <p className="text-green-600 text-center">{msg.success}</p>
          <p className="text-red-500 text-center">{msg.error}</p>
          <h1 className="p-5 ">Pay school fees for {selected?.id?.name}</h1>
          <p className="px-5 pb-2 ">balance:{selected?.balance}</p>
          <span className="absolute right-2"></span>
          <form action="" className="  border-black w-full" onSubmit={PayFees}>
            <input
              type="number"
              name="amountPaid"
              placeholder=" amount deposited"
              className="bg-inherit border  p-2 rounded border-b-4 border-y-0 border-r-0 border-l-0 border-black"
              value={details.amountPaid}
              onChange={handleFormInput}
            />
            <div>
              <label htmlFor="" className="w-full mr-1">
                Or Toggle Pay
              </label>
              <select
                name="isPaid"
                onChange={handleFormInput}
                value={details.isPaid}
                id=""
                className="bg-inherit border border-black p-1 rounded mt-2"
                // onChange={}
              >
                <option value="">select</option>
                <option value="true" className="bg-inherit dark:bg-gray-900">
                  paid
                </option>
                <option value="false" className="bg-inherit dark:bg-gray-900">
                  unpaid
                </option>
              </select>
            </div>
            <div className="flex justify-center mt-2">
              <Button buttontype={3}>Submit</Button>
            </div>
          </form>

          <span className="absolute right-[85%] top-2">
            {" "}
            <button
              className="bg-red-700 p-3 z-10  text-white rounded"
              onClick={() => {
                confirmablePay(false);
                payFeesModal(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
