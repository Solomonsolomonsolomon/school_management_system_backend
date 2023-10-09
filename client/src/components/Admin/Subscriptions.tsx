import axios from "../../api/axios";
import WarningComponent from "../../utils/WarningComponent";
import Button from "../Button/Button";
interface ISubDetails {
  expiryDate: string;
  plan: string;
  time: string;
}
import React from "react";
let subscriptionUrl = "/subscription";

const Subscription: React.FC = () => {
  let [subscriptionDetails, setSubDetails] = React.useState<ISubDetails>({
    expiryDate: "xxxx-xx-xx",
    plan: "",
    time: "",
  });
  React.useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${subscriptionUrl}/details`);
        console.log(res);
        setSubDetails({
          expiryDate: res.data?.expiryDate.split("T")[0],
          time: res.data?.expiryDate.split("T")[1],
          plan: res.data?.plan,
        });
      } catch (error) {}
    })();
  });
  return (
    <>
      <div>
        <p>Subscription Details</p>

        <p>current plan:{subscriptionDetails.plan}</p>
        <p>expiry date:{subscriptionDetails.expiryDate}</p>
        <p>expiry time:{subscriptionDetails.time.split(".")[0]}(GMT)</p>
      </div>
      <p className="font-bold text-center ">Renew Subscription</p>
      <form action="">
        {" "}
        <label htmlFor="">Enter plan to renew</label>
        <select className="bg-inherit mb-3 border">
          <option className="dark:bg-gray-900" value="basic">
            basic
          </option>
          <option className="dark:bg-gray-900" value="standard">
            standard
          </option>
          <option className="dark:bg-gray-900" value="premium">
            premium
          </option>
        </select>
        <Button buttontype={1}>Renew</Button>
      </form>

      <div>Review Pricing</div>
      <p>250# per student(basic)</p>
      <p>350# per student(standard)</p>
      <p>500# per student(premium)</p>
      <WarningComponent>
        Please proceed carefully as there are NO REFUNDS
      </WarningComponent>
    </>
  );
};

export default Subscription;
