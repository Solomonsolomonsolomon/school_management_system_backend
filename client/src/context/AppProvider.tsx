import { ReactNode, createContext } from "react";
import axios from "./../api/axios";
interface AppProviderProps {
  children: ReactNode;
}
interface AppContextProps {
  baseUrl: string;
  theme: string;
}
const contextValue = {
  baseUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:2020"
      : "https://solacebackend.onrender.com",
  theme: window.matchMedia("(prefers-color-scheme:dark)").matches
    ? "dark"
    : "light",
  colors: {
    button: "#4B5563",
    header: "#4a5568",
    text: "#000000",
    sideBar: "#ffffff",
    sideBarText: "#4B5563",
    background: "#ffffff",
    headerText: "#000000",
    buttonText: "#ffffff",
  },
};

export const AppContext = createContext<AppContextProps>(contextValue);
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
};

export default AppProvider;
