import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/common";
import { doctorApis } from "../apiHelpers";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    doctorApis
      .fetchDoctors({ page, name })
      .then((data) => {
        setDoctors(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [page, name]);

  const handleSearch = (text) => {
    setName(text);
  };

  return (
    <main className="min-h-[95vh]">
      <div className="flex justify-center gap-4 my-4">
        <SearchBar placeholder="Search doctor name" onClick={handleSearch} />
        <Link to="/doctors/new">
          <button className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2">
            New Doctor
          </button>
        </Link>
      </div>
      <div className="my-10">
        <div className="border-slate-300 border-2 rounded-xl m-auto w-2/3">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-5 border-b-2 border-r border-slate-300">Sr</th>
                <th className="p-5 border-b-2 border-r border-slate-300">
                  Name
                </th>
                <th className="p-5 border-b-2 border-r border-slate-300">
                  Phone
                </th>
                <th className="p-5 border-b-2 border-r border-slate-300">
                  Currrent Balance
                </th>
                <th className="p-5 border-b-2 border-r border-slate-300">
                  Previous Bill
                </th>
                <th className="p-5 border-b-2 border-slate-300">
                  Previous Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((element, index) => (
                <tr key={element.id}>
                  <td className="p-4 border-r">{index + 1 + (page - 1) * 20}</td>
                  <td className="p-4 border-r">
                    <Link to={`/doctors/${element.id}`}>{element.name}</Link>
                  </td>
                  <td className="p-4 border-r">{element.phone}</td>
                  <td className="p-4 border-r">
                    {`₹ ${element.account_details.balance}`}
                  </td>
                  <td className="p-4 border-r">
                    {`₹ ${element.account_details.previous_bill.amount}`}
                  </td>
                  <td className="p-4">
                    {`₹ ${element.account_details.previous_payment.amount}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between  w-2/3 m-auto">
        <button
          className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400"
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400"
          disabled={page == totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </main>
  );
}
