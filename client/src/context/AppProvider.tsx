import React, { ReactNode, createContext } from "react";
// import axios from "./../api/axios";
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
 
};
console.log('every rerender')
export const AppContext = createContext<AppContextProps>(contextValue);
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // let [themeData, setThemeData] = React.useState({});

  //# fetch theme data



  // React.useEffect(() => {
  //   (async () => {
  //     let res = await axios.get(`${endpoint}/theme/current`);
  //     console.log(res);
  //     try {
  //       Object.assign(contextValue.colors, res?.data?.themes);
  //     } catch (error) {
  //       console.log(error);

  //     }
  //   })();
  // }, []);
  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
};

export default AppProvider;
