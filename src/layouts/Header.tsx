// layouts/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
const Header: React.FC = () => (
  <header className="bg-white shadow px-4 py-3 flex justify-between items-center dark:bg-gray-800">
    <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-yellow-300">PopcornGo</Link>
    <nav>
      <Link to="/movies" className="mr-4">Movies</Link>
      <Link to="/booking" className="mr-4">Booking</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  </header>
);
export default Header;
