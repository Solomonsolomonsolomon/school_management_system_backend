import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "../api/axios";
import Loading from "./Loading";

const Messages: React.FC = () => {
  let [isOpen, setIsOpen] = React.useState<boolean>(false);
  let [selectedContact, setSelectedContact] = React.useState<any>({});
  const [colors, setColors] = React.useState<any>({
    sideBar: "rgb(31 41 55)",
    sideBarText: "#ffffff",
  });
  const [loading, setLoading] = React.useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  let schoolUrl = "/school";
  React.useEffect(() => {
    async function getColor() {
      try {
        const res = await axios.get(`${schoolUrl}/theme/current`);
        const fetchedColors = res.data?.themes;
        if (fetchedColors) {
          setColors({
            ...fetchedColors,
          });
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
      } finally {
        setLoading(false);
      }
    }

    getColor();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="overflow-y-hidden w-full h-full px-5">
      {" "}
      <h1 className="text-left p-3 text-2xl">Solace Chat..</h1>
      <div
        className="wrapper w-full lg:grid-cols-[20%_80%] sm:grid-cols-1 md:grid-cols-[20%_80%]
      "
      >
        <button
          onClick={toggleSidebar}
          className="m-2 absolute right-4 top-3"
          style={{
            color: /*colors?.sideBar || */ "black",
          }}
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
        <div
          style={{
            backgroundColor: colors.sideBar || "rgb(31 41 55) ",
            color: colors?.sideBarText || "black",
          }}
          className={` fixed h-full lg:block  left-0 top-0  bg-gray-800 text-white transition-transform transform ${
            isOpen ? "translate-x-0 sm:w-full" : "-translate-x-full"
          } w-64 overflow-y-auto ease-in-out duration-300 z-30`}
        >
          <button className="absolute top-3 right-3 " onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4" onClick={toggleSidebar}>
              Menu
            </h2>
            <div className="h-[96vh] scrollbar-hide overflow-y-auto">
              <p>Your Chats</p>
              <p>Hello</p>
              <p>Groups</p>
              <p>Back to main menu</p>
              <p>Logout</p>
            </div>
          </div>
        </div>
        {Object.keys(selectedContact).length ? (
          <SelectedChat />
        ) : (
          <AllContacts />
        )}
      </div>
    </main>
  );
};

export default Messages;

const SelectedChat = () => {
  return (
    <div>
      <p>chat name</p>
      <div
        className="chat-window border h-[80vh] mt-2 overflow-y-auto w-[100vw]"
        id="b"
        onLoad={(_event: React.SyntheticEvent<HTMLDivElement, Event>) => {
          document.getElementById("b")?.scroll(500, 500);
        }}
      >
        {" "}
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
        <p>history</p>
      </div>

      <div className="absolute w-full bottom-0 flex">
        {" "}
        <textarea
          name=""
          className="border border-black rounded-xl  w-[80%] p-2"
        ></textarea>
        <button className="w-[20%]  rounded border p-2  bg-green-500">
          send
        </button>
      </div>
    </div>
  );
};

function AllContacts() {
    React.useEffect(()=>{},[])
  return (
    <section>
      <p className="text-center font-bold">All Contacts</p>
      <div>
       
        <input type="text" placeholder="search ..." className="p-2 border border-black" /> <button className="border p-2 rounded bg-blue-600">Search</button>
        <div id="contacts p-2" className="mt-3">cas</div>
      </div>
    </section>
  );
}
