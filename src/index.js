import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UniversityContextProvider from "./contexts/UniversityContext";

ReactDOM.render(
  <React.StrictMode>
    <UniversityContextProvider>
      <App />
    </UniversityContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
