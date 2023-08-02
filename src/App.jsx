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
          <Route path="/" Component={pages.Jobs} />
          <Route path="/jobs/:jobId" Component={pages.EditJob} />
          <Route path="/new/job/:doctorId" Component={pages.EditJob} />
          <Route path="/new/job" Component={pages.EditJob} />
          <Route path="/doctors" Component={pages.Doctors} />
          <Route path="/doctors/new" Component={pages.EditDoctor} />
          <Route path="/doctors/:doctorId" Component={pages.EditDoctor} />
          <Route path="/doctors/:doctorId/bill" Component={pages.EditBill} />
          <Route path="/account" Component={pages.Account} />
          <Route path="/account/:doctorId" Component={pages.Account} />
          <Route path="/bills" Component={pages.Bills} />
          <Route path="/bills/new" Component={pages.EditBill} />
          <Route path="/bills/id/:billId" Component={pages.ViewBill} />
          <Route path="/payments/new" Component={pages.EditPayment} />
          <Route
            path="/payments/doctors/:doctorId"
            Component={pages.EditPayment}
          />
          <Route
            path="/payments/doctors/:doctorId/payments/:paymentid"
            Component={pages.EditPayment}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
  );
}
