import React from "react";
import ReactDOM from "react-dom/client";
import PortfolioState from "../Context/portfolio/PortfolioState"
import MainState from "../Context/MainState.js";
import UserState from "../Context/user/UserState.js";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainState >
    <UserState>
      <PortfolioState>
        <App />
      </PortfolioState>
    </UserState>
  </MainState>
);