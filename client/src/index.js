import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Router from "./utils/Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);
