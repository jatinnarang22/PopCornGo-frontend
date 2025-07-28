import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Events from "../pages/Events";
import Booking from "../pages/Booking";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movies" element={<Movies />} />
    <Route path="/events" element={<Events />} />
    <Route path="/booking" element={<Booking />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
