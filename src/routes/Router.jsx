import { Routes, Route } from "react-router-dom";

import {
  AddDoctor,
  GenerateBill,
  Print,
  PrintRemark,
  Bill,
  Jobs,
  AddJob,
  Doctors,
  EditJob,
  Accounts,
  Statement,
  AddPayment,
  Payments,
} from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" Component={Jobs} />
      <Route path="/addJob/:doctorId/:jobId?" Component={AddJob} />
      <Route path="/editJob/:jobId" Component={EditJob} />
      <Route path="/doctors" Component={Doctors} />
      <Route path="/account" Component={Accounts} />
      <Route path="/addDoctor" Component={AddDoctor} />
      <Route path="/addDoctor/:id" Component={AddDoctor} />
      <Route path="/generateBill/:doctorId" Component={GenerateBill} />
      <Route path="/print/:id" Component={Print} />
      <Route path="/printRemark" Component={PrintRemark} />
      <Route path="/bill" Component={Bill} />
      <Route path="/statement/:doctorId" Component={Statement} />
      <Route path="/addPayment/:doctorId" Component={AddPayment} />
      <Route path="/payments" Component={Payments} />
    </Routes>
  );
}
