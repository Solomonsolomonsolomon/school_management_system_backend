interface ReactProps {
  setView: React.SetStateAction<any>;
}
const BusNavBar: React.FC<ReactProps> = ({ setView }) => {
  function setComponent(str: string) {
    setView(str);
  }
  return (
    <section className="grid justify-center items-center h-[60vh] text-blue-500 cursor-pointer">
      <p onClick={() => setComponent("registerstudentforbus")}>
        Register Student for bus
      </p>
      <p onClick={() => setComponent("allstudentstakingbus")}>All Students</p>
      <p onClick={() => setComponent("registerschooldetails")}>
        Register School's bus Details
      </p>
      <p>Check Student Bus Eligibility</p>
  
    </section>
  );
};
export default BusNavBar;
