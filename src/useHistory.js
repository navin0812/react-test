import React, { createContext, useContext } from "react";

const LocationContext = createContext({});

export const LocationProvider = ({ children, value }) => {
  const { Provider } = LocationContext;
  return <Provider value={value}>{children}</Provider>;
};

export const useHistory = () => useContext(LocationContext);
