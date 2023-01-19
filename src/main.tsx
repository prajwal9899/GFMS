import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import DashboardLayout from "./layouts/DashboardLayout";
import AddGoats from "./pages/Add Goats/AddGoats";
import { ViewGoats } from "./pages/View Goats/ViewGoats";
import AddEmployee from "./pages/Add Employee/AddEmployee";
import { ViewEmployee } from "./pages/View Employee/ViewEmployee";
import { GoatDetails } from "./pages/Goat Details/GoatDetails";
import { ConfigProvider, Button } from "antd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    > */}
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/add-goats" element={<AddGoats />} />
          <Route path="/view-goats" element={<ViewGoats />} />
          <Route path="//goat-details/:id" element={<GoatDetails />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/view-employee" element={<ViewEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </ConfigProvider> */}
  </React.StrictMode>
);
