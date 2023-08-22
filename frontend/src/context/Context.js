import { useContext } from "react";
import React from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const url = "https://greenits.onrender.com/api";
  return (
    <AppContext.Provider
      value={{
        url,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };