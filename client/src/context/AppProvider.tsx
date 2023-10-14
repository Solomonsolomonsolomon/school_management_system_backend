import { ReactNode, createContext } from "react";

interface AppProviderProps {
  children: ReactNode;
}
interface AppContextProps {
  baseUrl: string;
}
const contextValue = {
  baseUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:2020"
      : "https://solacebackend.onrender.com",
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
