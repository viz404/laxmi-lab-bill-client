import React, { useEffect, useRef, useState } from "react";
import { workApis, doctorApis } from "../apiHelpers";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

let defaultDoctor = {
  name: "",
  works: [],
};

export default function EditDoctor() {
  const [doctor, setDoctor] = useState(defaultDoctor);
  const [works, setWorks] = useState([]);

  const { doctorId } = useParams();
  const navigate = useNavigate();
  const newWorkRef = useRef();

  useEffect(() => {
    workApis
      .fetchWorks()
      .then((response) => setWorks(response.data))
      .catch((error) => toast.error(error.message));
    if (doctorId) {
      doctorApis
        .fetchDoctorById(doctorId)
        .then((response) => setDoctor(response.data))
        .catch((error) => toast.error(error.message));
    }

    return () => {
      setDoctor({ ...defaultDoctor });
      setWorks([]);
    };
  }, []);

  const handleFormInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    doctor[name] = value;
    setDoctor({ ...doctor });
  };

  const handleWorkSelect = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;

    if (checked) {
      doctor.works.push({
        title: name,
        price_distribution: "SINGLE-UNIT",
      });
    } else {
      let filtered =
        doctor.works.filter((element) => element.title != name) || [];
      doctor.works = filtered;
    }
    setDoctor({ ...doctor });
  };

  const handleWorkPrice = (event, isMisc) => {
    const type = event.target.type;
    const value = event.target.value;
    const name = event.target.name;
    let updatedWorks = [];

    switch (type) {
      case "number": {
        updatedWorks =
          doctor.works.map((element) => {
            if (element.title == name) {
              if (isMisc) {
                element.misc = { rest_price: value };
              } else {
                element.price = value;
              }
            }
            return element;
          }) || [];
        break;
      }
      case "select-one": {
        updatedWorks =
          doctor.works.map((element) => {
            if (element.title == name) {
              element.price_distribution = value;
              if (value == "FIRST-UNIT") {
                element.misc = 0;
              } else {
                delete element.misc;
              }
            }
            return element;
          }) || [];
        break;
      }
    }
    doctor.works = updatedWorks;
    setDoctor({ ...doctor });
  };

  const handleNewWork = async () => {
    try {
      const work = newWorkRef.current.value;
      if (work == "") return;

      const response = await workApis.addNewWork(work);

      works.push(response.data);
      setWorks([...works]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      newWorkRef.current.value = "";
    }
  };

  const handleDeleteWork = async (id) => {
    try {
      if (id == "") return;

      await workApis.deleteWork(id);

      let filteredWorks = works.filter((element) => element.id != id);
      setWorks([...filteredWorks]);

      filteredWorks = doctor.works.filter((element) => element.id != id);
      doctor.works = filteredWorks;
      setDoctor({ ...doctor });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      if (doctor.works.length == 0) {
        throw new Error("Please select a work");
      }

      if (doctor.name == "") {
        throw new Error("Please select a name");
      }

      if (doctorId) {
        await doctorApis.updateDoctor(doctorId, doctor);
        toast.success(`Doctor ${doctor.name} was updated successfully`);
      } else {
        await doctorApis.addNewDoctor(doctor);
        toast.success(`Doctor ${doctor.name} was added successfully`);
      }
      navigate("/doctors");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReset = () => {
    setDoctor({
      name: "",
      works: [],
    });
  };

  const handleDeleteDoctor = async () => {
    try {
      if (doctorId) {
        await doctorApis.deleteDoctor(doctorId);
        toast.success(`Doctor ${doctor.name} was deleted successfully`);
        navigate("/doctors");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleWorkKeyDown = (event) => {
    if (event.key == "Enter") {
      handleNewWork();
    }
  };

  return (
    <main className="min-h-[95vh]">
      <div className=" flex items-start gap-3 px-4 mt-4">
        <div className="w-[30%] border-2 border-slate-300 rounded-xl">
          <p className="text-lg font-bold text-center border-b p-4">Works</p>
          {works.map((element, index) => (
            <div
              className={
                "flex justify-between items-center p-2" +
                (index + 1 < works.length ? " border-b" : "")
              }
              key={element.id}
            >
              <button onClick={() => handleDeleteWork(element.id)}>❌</button>
              <label htmlFor={element.title}>{element.title}</label>
              <input
                type="checkbox"
                className="w-5 h-5"
                name={element.title}
                id={element.title}
                onChange={handleWorkSelect}
                checked={doctor.works
                  .map((ele) => ele.title)
                  .includes(element.title)}
              />
            </div>
          ))}
          <div className="flex justify-between items-center p-2 gap-2">
            <input
              type="text"
              placeholder="Add new work"
              className="dark:bg-gray-700 dark:text-white text-lg border rounded p-1"
              ref={newWorkRef}
              onKeyDown={handleWorkKeyDown}
            />
            <button
              className="bg-primary text-white px-3 py-1 rounded-lg"
              onClick={handleNewWork}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="border-2 border-slate-300 overflow-hidden mx-auto mb-4 rounded-xl">
            <table className="table-auto w-full text-left">
              <tbody>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Name</th>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="w-full h-14 outline-none text-lg text-text-light dark:bg-gray-700 dark:text-white px-2"
                      autoFocus
                      placeholder="Enter name"
                      value={doctor.name}
                      required
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Phone</th>
                  <td>
                    <input
                      type="number"
                      name="phone"
                      className="w-full h-14 outline-none text-lg text-text-light dark:bg-gray-700 dark:text-white px-2"
                      placeholder="Enter phone number"
                      value={doctor?.phone || ""}
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Area</th>
                  <td>
                    <input
                      type="text"
                      name="area"
                      className="w-full h-14 outline-none text-lg text-text-light dark:bg-gray-700 dark:text-white px-2"
                      placeholder="Enter area"
                      value={doctor?.area || ""}
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Address</th>
                  <td>
                    <input
                      type="text"
                      name="address"
                      className="w-full h-14 outline-none text-lg text-text-light dark:bg-gray-700 dark:text-white px-2"
                      placeholder="Enter address"
                      value={doctor?.address || ""}
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
                {doctor.works.map((element, index) => (
                  <tr
                    key={index}
                    className={index < doctor.works.length ? "border-b" : ""}
                  >
                    <th className="p-4 border-r text-lg">{element.title}</th>
                    <td className="flex gap-4">
                      <select
                        className="text-text-light dark:bg-gray-700 dark:text-white px-2 h-14"
                        name={element.title}
                        id={element.title}
                        onChange={handleWorkPrice}
                        value={element.price_distribution}
                      >
                        <option value="SINGLE-UNIT">Single Unit</option>
                        <option value="FIRST-UNIT">First Unit</option>
                        <option value="ALL-UNIT">All Unit</option>
                      </select>
                      <input
                        type="number"
                        className="border text-text-light dark:bg-gray-700 dark:text-white h-14 px-2"
                        name={element.title}
                        onInput={handleWorkPrice}
                        value={element.price || ""}
                        placeholder="Enter price"
                        required
                      />
                      {Object.keys(element).includes("misc") && (
                        <input
                          type="number"
                          className="border text-text-light dark:bg-gray-700 dark:text-white"
                          name={element.title}
                          onInput={(event) => handleWorkPrice(event, true)}
                          value={element?.misc.rest_price || ""}
                          placeholder="Enter rest price"
                          required
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-4 w-1/2 m-auto">
            <button
              className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400"
              onClick={handleSubmit}
            >
              {doctorId ? "Update" : "Submit"}
            </button>
            {doctorId && (
              <button
                className="bg-red-600 text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                onClick={handleDeleteDoctor}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
