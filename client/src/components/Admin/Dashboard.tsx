import { faChildren } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
import EarningChart from "./charts/EarningChart";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Loading from "../Loading";
import DoughnutChart from "./charts/RatioChart";
import EarningsTOExpense from "./charts/EarningsToExpense";
import HeroSection from "./Dashboard/HeroSection";
import Card from "./Dashboard/Card";
import CardContent from "./Dashboard/CardContent";
import CardIcon from "./Dashboard/CardIcon";
const POST_URL = "/admin";
let transactionUrl = "/transaction";
let subscrptionUrl = "/subscription";
const SubAdmin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [studentsNumber, setStudentsNumber] = React.useState<number>(0);
  const [teachersNumber, setTeachersNumber] = React.useState<number>(0);
  const [parentsNumber, setParentsNumber] = React.useState<number>(0);
  const [earningsNumber, setEarningsNumber] = React.useState<number>(0);
  let subscriptionRef = React.useRef<any>(null);
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

        setStudentsNumber(number?.totalStudents);
        setParentsNumber(number?.totalStudents);
      } catch (error: any) {
        console.error(error);
        setStudentsNumber(0);
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
        let teachers = await axios.get(`${POST_URL}/get/count/teachers`, {
          signal: controller1.signal,
        });

        setTeachersNumber(teachers.data?.noOfTeachers);
      } catch (error) {
        console.error(error);
        setTeachersNumber(0);
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
        setEarningsNumber(res.data?.amount);
      } catch (error: any) {
        if (error.name == "AbortError" || error.name == "CanceledError") return;
        setEarningsNumber(0);
      } finally {
        setIsLoading(false);
      }
    }
    earnings();
    return () => {
      controller.abort();
    };
  });
  //check subscription status
  React.useEffect(() => {
    (async () => {
      try {
        await axios.get(`${subscrptionUrl}/check/active`);
        return;
      } catch (error: any) {
        if (error?.response?.status >= 400 && error.response?.status <= 499) {
          if (subscriptionRef.current)
            subscriptionRef.current.textContent = "SUBSCRIPTION EXPIRED";
        }
      }
    })();
  }, []);
  if (isLoading) return <Loading />;
  const dashboarditems = [
    {
      icon: {
        name: faChildren,
        size: "xl",
        className: "text-green-500 shadow-lg p-5 bg-green-200 rounded-full",
      },
      content: [
        { text: "Students", className: "" },
        { text: studentsNumber, className: "" },
      ],
    },
    {
      icon: {
        name: faUserTie,
        size: "xl",
        className: "text-blue-400 shadow-lg p-5 bg-blue-300 rounded-full",
      },
      content: [
        { text: "Teachers", className: "" },
        { text: teachersNumber, className: "" },
      ],
    },
    {
      icon: {
        name: faUserGroup,
        size: "xl",
        className: "text-yellow-400 shadow-lg p-5 bg-yellow-100 rounded-full",
      },
      content: [
        { text: "Parents", className: "" },
        { text: parentsNumber, className: "" },
      ],
    },
    {
      icon: {
        name: faMoneyBill1,
        size: "xl",
        className: "text-red-500 shadow-lg p-5 bg-red-200 rounded-full",
      },
      content: [
        { text: "Earnings(NGN)", className: "" },
        { text: earningsNumber, className: "" },
      ],
    },
  ];
  return (
    <div className="lg:p-10  md:p-2 sm:p-1  border-slate-200 shadow-2xl box-border grid gap-10 w-full ">
      <h1 className="text-2xl ">Admin Dashboard</h1>
      <p ref={subscriptionRef} className="text-red-800"></p>
      <HeroSection />
      <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-0 h-auto  ">
        {dashboarditems.map((item: any) => {
          return (
            <>
              <Card key={item.icon.name + item.icon.className}>
                <CardIcon
                  icon={item.icon.name}
                  className={item.icon.className}
                  size="xl"
                />
                <div>
                  {" "}
                  {item.content.map((content: any) => (
                    <CardContent
                      content={content.text}
                      className={content.className}
                    />
                  ))}
                </div>

                {/* <CardContent content={noOfStudents}/> */}
              </Card>
            </>
          );
        })}
        <Card>
          <section className="mt-3">
            <DoughnutChart />
          </section>
        </Card>
        <Card>
          <section className="mt-3">
            <EarningsTOExpense />
          </section>
        </Card>
      </section>

      <section className="grid  gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  ">
        <div className=" shadow-lg p-5 grid grid-rows-[5%_95%] gap-5">
          <h2>Finances</h2>
          <div className="w-[99%]">
            <EarningChart />
          </div>
        </div>
      </section>
      <footer className="bg-slate-200 dark:bg-gray-900 dark:border grid justify-center p-4 opacity-80 ">
        <p>copyright &copy; {new Date().getFullYear()}</p>
        <p>All rights Reserved</p>
      </footer>
    </div>
  );
};

export default SubAdmin;
