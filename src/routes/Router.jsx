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
} from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" Component={Jobs} />
      <Route path="/addJob" Component={AddJob} />
      <Route path="/editJob/:jobId" Component={EditJob} />
      <Route path="/doctors" Component={Doctors} />
      <Route path="/addDoctor" Component={AddDoctor} />
      <Route path="/addDoctor/:id" Component={AddDoctor} />
      <Route path="/generateBill/:doctorId" Component={GenerateBill} />
      <Route path="/print/:id" Component={Print} />
      <Route path="/printRemark" Component={PrintRemark} />
      <Route path="/bill" Component={Bill} />
    </Routes>
  );
}
