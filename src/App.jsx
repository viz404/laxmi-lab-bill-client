import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import pages from "./pages";
import { Navbar } from "./components/common";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={pages.Home} />
        <Route path="/doctors" Component={pages.Doctors} />
        <Route path="/doctors/new" Component={pages.NewDoctor} />
      </Routes>
    </BrowserRouter>
  );
}
