import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Team from "../pages/Team";
import Privacy from "../pages/Privacy";
import Services from "../pages/Services";
import Signup from "../pages/Signup";
import UserDashboard from "../pages/userDashboard";
import AdminDashboard from "../pages/adminDashboard";
import RequestService from "../pages/RequestService";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/team" element={<Team />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route exact path="/SignUp" element={<Signup />} />
          <Route exact path="/userdashboard" element={<UserDashboard />} />
          <Route exact path="/admindashboard" element={<AdminDashboard />} />
          <Route exact path="/requestservice" element={<RequestService />} />
          {/* <Route exact path="/payment" element={<ProductDisplay />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
