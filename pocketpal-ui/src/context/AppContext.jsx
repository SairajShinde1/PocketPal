import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [selectedBarGraph, setSelectedBarGraph] = useState("");
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [currencyChanged, setCurrencyChanged] = useState(false);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASE_URL}/api/pocketpal/get-user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setUserData(result.data.user);
      })
      .catch((err) => console.log(err));
  }, [token, currencyChanged]);

  return (
    <AppContext.Provider
      value={{
        selectedBarGraph,
        setSelectedBarGraph,
        userData,
        setToken,
        setCurrencyChanged,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
