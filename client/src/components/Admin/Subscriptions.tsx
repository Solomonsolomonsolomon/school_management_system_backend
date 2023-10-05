import WarningComponent from "../../utils/WarningComponent";
import Button from "../Button/Button";
const Subscription: React.FC = () => {
  return (
    <>
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
