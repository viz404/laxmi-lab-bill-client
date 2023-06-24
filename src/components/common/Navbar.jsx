import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-2 items-center bg-blue-600 text-white">
      <p className="text-2xl font-bold">Shree Laxmi Dental Lab</p>
      <div className="flex gap-4 text-lg">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/doctors/new">New Doctor</Link>
      </div>
    </nav>
  );
}
