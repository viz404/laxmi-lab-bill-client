import { Link } from "react-router-dom";
import { SearchBar } from "../components/common";
import { useEffect, useState } from "react";
import { billApis } from "../apiHelpers";
import { calculationHelpers } from "../helpers";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doctor_name, setDoctor_name] = useState("");

  useEffect(() => {
    billApis
      .fetchBills({ page, doctor_name })
      .then((data) => {
        setBills(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [page, doctor_name]);

  return (
    <main className="min-h-[95vh]">
      <div className="flex justify-center gap-4 my-4">
        <SearchBar placeholder="Search doctor name" onClick={setDoctor_name} />
        <Link to="/bills/new">
          <button className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2">
            New Bill
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
                  Date
                </th>
                <th className="p-5 border-b-2 border-r border-slate-300">
                  Bill no
                </th>
                <th className="p-5 border-b-2 border-r border-slate-300">
                  Doctor
                </th>
                <th className="p-5 border-b-2 border-slate-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((element, index) => (
                <tr key={element.id}>
                  <td className="p-4 border-r">{index + 1 + (page - 1) * 0}</td>
                  <td className="p-4 border-r">
                    {calculationHelpers.formatDate(element.createdAt)}
                  </td>
                  <td className="p-4 border-r">
                    <Link to={`/bills/id/${element.id}`}>{element.id}</Link>
                  </td>
                  <td className="p-4 border-r">
                    <Link to={`/doctors/${element.doctor.id}`}>{element.doctor.name}</Link>
                  </td>
                  <td className="p-4">{`₹ ${element.total_amount}`}</td>
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
