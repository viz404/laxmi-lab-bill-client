import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doctorApis, jobApis } from "../apiHelpers";
import { toast } from "react-toastify";

import { calculationHelpers } from "../helpers";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [doctor_name, setDoctor_name] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const timer = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      doctorApis
        .fetchDoctorNames(search)
        .then((data) => setDoctors(data.data))
        .catch((error) => toast.error(error.message));
    }, 500);
  }, [search]);

  useEffect(() => {
    jobApis
      .fetchJobs({ doctor_name, page })
      .then((data) => {
        setJobs(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => toast.error(error.message));
  }, [doctor_name, page]);

  const handleDoctorSelect = (event) => {
    const name = event.target.value;
    const checked = event.target.checked;

    setDoctor_name(checked == true ? name : "");
  };

  return (
    <main className="min-h-[95vh]">
      <div className=" flex items-start gap-5 px-4 mt-4">
        <div className="w-[30%]">
          <div className="border-2 border-slate-400 dark:border rounded-lg overflow-hidden p-4 flex flex-col gap-4 max-h-[40rem]">
            <input
              type="text"
              placeholder="Enter doctor name"
              className="text-xl outline-none p-2 border border-slate-300 dark:border rounded dark:text-text-dark dark:bg-background-dark"
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="flex flex-col gap-2 max-h-full overflow-auto">
              {doctors.map((element, index) => (
                <label
                  key={element.id}
                  className={
                    "flex gap-3 py-2 " +
                    (index + 1 < doctors.length ? " border-b" : "")
                  }
                >
                  <input
                    type="checkbox"
                    name="doctor"
                    value={element.name}
                    className="w-5"
                    checked={doctor_name == element.name}
                    onChange={handleDoctorSelect}
                  />
                  <p className="text-lg">{element.name}</p>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Link to="/jobs/new">
              <button className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400">
                New Job
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <div className="border-slate-400 border-2 rounded-xl">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Sr
                  </th>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Doctor
                  </th>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Patient
                  </th>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Date
                  </th>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Job no
                  </th>
                  <th className="p-5 border-b-2 border-b-slate-400">Works</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((element, index) => (
                  <tr
                    key={element.id}
                    className={index + 1 < jobs.length ? "border-b" : ""}
                  >
                    <td className="p-4 border-r">
                      {index + 1 + (page - 1) * 20}
                    </td>
                    <td className="p-4 border-r">
                      <Link to={`/doctors/${element.id}`}>
                        {element.doctor.name}
                      </Link>
                    </td>
                    <td className="p-4 border-r">
                      <Link
                        to={`/doctors/${element.doctor.id}/job/${element.id}`}
                      >
                        {element.patient_name}
                      </Link>
                    </td>
                    <td className="p-4 border-r">
                      {calculationHelpers.formatDate(element.date)}
                    </td>
                    <td className="p-4 border-r">
                    <Link
                        to={`/doctors/${element.doctor.id}/job/${element.id}`}
                      >
                        {element.job_number}
                      </Link>
                    </td>
                    <td className="p-4 flex flex-col gap-2">
                      {element?.works.map((ele, ind) => (
                        <div
                          className={"flex justify-between items-center"}
                          key={ind}
                        >
                          <p>{ele.title}</p>
                          <table>
                            <tbody>
                              <tr className="border-b border-slate-400">
                                <td className="border-r border-slate-400">
                                  {ele.upper_left}
                                </td>
                                <td>{ele.upper_right}</td>
                              </tr>
                              <tr>
                                <td className="border-r border-slate-400">
                                  {ele.lower_left}
                                </td>
                                <td>{ele.lower_right}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between w-full my-4">
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
        </div>
      </div>
    </main>
  );
}
