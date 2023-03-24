import { Routes, Route } from "react-router-dom";

import {
  Doctor,
  AddDoctor,
  GenerateBill,
  Print,
  PrintRemark,
  Bill,
} from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" Component={Doctor} />
      <Route path="/addDoctor" Component={AddDoctor} />
      <Route path="/addDoctor/:id" Component={AddDoctor} />
      <Route path="/generateBill/:doctorId" Component={GenerateBill} />
      <Route path="/print/:id" Component={Print} />
      <Route path="/printRemark" Component={PrintRemark} />
      <Route path="/bill" Component={Bill} />
    </Routes>
  );
}
