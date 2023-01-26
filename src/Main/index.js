import React from "react";
import ReactDOM from "react-dom/client";
import MainState from "../Context/MainState.js";
import UserState from "../Context/UserState.js";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainState >
    <UserState>
      <App />
    </UserState>
  </MainState>
);