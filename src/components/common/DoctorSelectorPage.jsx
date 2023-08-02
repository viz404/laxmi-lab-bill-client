import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorApis } from "../../apiHelpers";
import { toast } from "react-toastify";

export default function DoctorSelectorPage({ path, replace }) {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
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

  const handleSearchForm = (event) => {
    event.preventDefault();

    const id = event.target.doctor.value;
    navigate(path.replace(replace, id));
  };
  return (
    <main className="h-[95vh]">
      <form className="h-full" onSubmit={handleSearchForm}>
        <div className="flex flex-col gap-4 justify-center items-center h-[90%]">
          <div className="border-2 border-slate-400 dark:border rounded-lg overflow-hidden p-4 flex flex-col gap-4 h-1/2">
            <input
              type="text"
              placeholder="Enter doctor name"
              className="text-xl outline-none p-2 border border-slate-300 dark:border rounded dark:text-text-dark dark:bg-background-dark"
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="flex flex-col gap-2 max-h-full overflow-auto">
              {doctors.map((element) => (
                <label key={element.id} className="flex gap-3 border-b py-2">
                  <input
                    type="radio"
                    name="doctor"
                    value={element.id}
                    className="w-5"
                    required
                  />
                  <p className="text-lg">{element.name}</p>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2"
              type="reset"
            >
              Reset
            </button>
            <button
              className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2"
              type="submit"
            >
              Proceed
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
