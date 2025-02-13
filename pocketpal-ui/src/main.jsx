import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
// import DataContextProvider from "./context/DataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        {/* <DataContextProvider> */}
        <App />
        {/* </DataContextProvider> */}
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
