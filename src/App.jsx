import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import * as pages from "./pages";
import { Navbar } from "./components/common";

export default function App() {
  return (
    <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark font-sans">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={pages.Home} />
          <Route path="/doctors" Component={pages.Doctors} />
          <Route path="/doctors/new" Component={pages.EditDoctor} />
          <Route path="/doctors/:doctorId" Component={pages.EditDoctor} />
          <Route path="/doctors/:doctorId/job" Component={pages.EditJob} />
          <Route
            path="/doctors/:doctorId/job/:jobId"
            Component={pages.EditJob}
          />
          <Route path="/jobs/new" Component={pages.EditJob} />
          <Route path="/account" Component={pages.Account} />
          <Route path="/account/:id" Component={pages.Account} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
  );
}
