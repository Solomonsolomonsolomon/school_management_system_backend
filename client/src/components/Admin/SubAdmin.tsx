import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildren } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
import EarningChart from "./charts/EarningChart";
import banner from "./../../assets/undraw_pair_programming_re_or4x.svg";
// import ExpenseChart from "./charts/ExpenseChart";
// import { useNavigate , useLocation} from 'react-router-dom'
import React, { useEffect, useRef, useState } from "react";
// import AuthContext from '../context/AuthProvider'
// import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import Loading from "../Loading";

import DoughnutChart from "./charts/RatioChart";
import EarningsTOExpense from "./charts/EarningsToExpense";

const POST_URL = "/admin";
let transactionUrl = "/transaction";
const SubAdmin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const noOfStudents = useRef<HTMLParagraphElement>(null);
  const teachersCount = useRef<HTMLParagraphElement>(null);
  let parentsCount = useRef<HTMLParagraphElement>(null);
  let earningsCount = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    let controller = new AbortController();
    inner();
    async function inner() {
      setIsLoading(true);
      try {
        let genderDivideResponse = await axios.get(
          `${POST_URL}/gender/divide`,
          {
            signal: controller.signal,
          }
        );
        let number = genderDivideResponse?.data;
        let studentsNumber = noOfStudents.current;
        studentsNumber
          ? (studentsNumber.textContent = number?.totalStudents)
          : "";
        parentsCount.current
          ? (parentsCount.current.textContent = number?.totalStudents)
          : "";
      
      } catch (error: any) {
        console.error(error);
        noOfStudents.current ? (noOfStudents.current.textContent = "xxx") : "";
      } finally {
        setIsLoading(false);
      }
    }
    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    let controller1 = new AbortController();
    getTeachersNumber();
    async function getTeachersNumber() {
      setIsLoading(true);
      try {
        let teachersNumber = await axios.get(`${POST_URL}/get/count/teachers`, {
          signal: controller1.signal,
        });
        let count = teachersCount?.current;
        count ? (count.textContent = teachersNumber.data.noOfTeachers) : "";
      } catch (error) {
        console.error(error);
        teachersCount.current
          ? (teachersCount.current.textContent = "xxx")
          : "";
      } finally {
        setIsLoading(false);
      }
    }

    return () => {
      controller1.abort();
    };
  });
  //get earnings data
  useEffect(() => {
    let controller = new AbortController();
    async function earnings() {
      setIsLoading(true);
      try {
        let res = await axios.get(`${transactionUrl}/get/total`, {
          signal: controller.signal,
        });
        let earnings = earningsCount.current;
        earnings ? (earnings.textContent = res.data?.amount) : "xxx";
      } catch (error: any) {
        if (error.name == "AbortError" || error.name == "CanceledError") return;
        let earnings = earningsCount.current;
        earnings ? (earnings.textContent = "xxx") : "";
      } finally {
        setIsLoading(false);
      }
    }
    earnings();
    return () => {
      controller.abort();
    };
  });
  if (isLoading) return <Loading />;
  return (
    <div className="lg:p-10  md:p-2 sm:p-1  border-slate-200 shadow-2xl box-border grid gap-10 w-full ">
      <h1 className="text-2xl ">Admin Dashboard</h1>

      <div
        className="w-full flex justify-center flex-wrap 
      bg-gray-200 dark:bg-gray-700 p-5 rounded-2xl"
      >
        <div className="flex flex-col justify-center flex-wrap opacity-60">
          <p className="uppercase ">
            Manage and Monitor your entire school's activites
          </p>
          <p className="uppercase "> from anywhere</p>
          <p>Never be out of the loop again</p>
        </div>

        <img src={banner} alt="" className="h-[250px] z-4" />
      </div>

      <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-0 h-auto  ">
        <div className=" p-10 shadow-gray-500 shadow-lg border  box-content flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 ">
          <div className="flex border "></div>
          <section className="bg-green-100 p-5 rounded-full">
            <FontAwesomeIcon
              icon={faChildren}
              size="xl"
              className="text-green-500"
            />
          </section>
          <section className="mt-3">
            <h2 className="text-l text-slate-400">Students</h2>
            <p className="text-lg font-semibold" ref={noOfStudents}>
              xxx
            </p>
          </section>
        </div>
        <div className="  p-10 shadow-gray-500 shadow-lg border  box-content flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 ">
          <section className="bg-sky-100 p-5 px-7 rounded-full">
            <FontAwesomeIcon
              icon={faUserTie}
              size="xl"
              className="text-sky-500"
            />
          </section>
          <section className="mt-3">
            <h2 className=" text-slate-400 text-md">Teachers</h2>
            <p className="text-lg font-semibold" ref={teachersCount}>
              xxx
            </p>
          </section>
        </div>
        <div className=" p-10 shadow-gray-500 shadow-lg border  box-content flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 ">
          <section className="bg-orange-100 p-5 rounded-full">
            <FontAwesomeIcon
              icon={faUserGroup}
              size="xl"
              className="text-orange-400"
            />
          </section>
          <section className="mt-3">
            <h2 className=" text-slate-400 rounded text-md">Parents</h2>
            <p className="text-lg font-semibold" ref={parentsCount}>
              xxx
            </p>
          </section>
        </div>
        <div className=" p-10 shadow-gray-500 shadow-lg border  box-content flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 ">
          <section className="bg-red-100 p-5 rounded-full">
            <FontAwesomeIcon
              icon={faMoneyBill1}
              size="xl"
              className="text-red-700"
            />
          </section>
          <section className="mt-3">
            <h2 className=" text-slate-400">Earnings(NGN)</h2>
            <p className="text-lg font-semibold" ref={earningsCount}>
              xxx
            </p>
          </section>
        </div>
        <div className=" p-10 shadow-gray-500 shadow-lg border  box-content flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 ">
          <section className="mt-3">
            <DoughnutChart />
          </section>
        </div>
        <div className=" p-10 shadow-gray-500 shadow-lg border  box-content flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 ">
          <section className="mt-3">
            <EarningsTOExpense />
          </section>
        </div>
      </section>

      <section className="grid  gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  ">
        <div className=" shadow-lg p-5 grid grid-rows-[5%_95%] gap-5">
          <h2>Finances</h2>
          <div className="w-[99%]">
            <EarningChart />
          </div>
        </div>
        {/* 
        <div className="shadow-lg p-5 grid grid-rows-[5%_95%] gap-5">
          <h2>Expenses</h2>
          <div className="w-[99%]"></div>
        </div> */}
      </section>
      <footer className="bg-slate-200 grid justify-center p-4 opacity-80 ">
        <p>copyright &copy; 2023</p>
        <p>All rights Reserved</p>
      </footer>
    </div>
  );
};

export default SubAdmin;
