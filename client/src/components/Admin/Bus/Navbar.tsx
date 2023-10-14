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
        School's bus Details
      </p>
    
  
    </section>
  );
};
export default BusNavBar;
