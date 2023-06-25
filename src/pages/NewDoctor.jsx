import React, { useEffect, useState } from "react";
import { fetchWorks } from "../apiHelpers";
import { toast } from "react-toastify";

export default function NewDoctor() {
  const [works, setWorks] = useState([]);
  const [selectedWorks, setSelectedWorks] = useState([]);

  useEffect(() => {
    fetchWorks()
      .then((response) => setWorks(response.data))
      .catch((error) => toast.error(error.message));
  }, []);

  const handleWorkSelect = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;

    if (checked) {
      selectedWorks.push({
        title: name,
        price_distribution: "SINGLE-UNIT",
      });
      setSelectedWorks([...selectedWorks]);
    } else {
      let filtered = selectedWorks.filter((element) => element.title != name);
      setSelectedWorks([...filtered]);
    }
  };

  const handleWorkPrice = (event, isMisc) => {
    const type = event.target.type;
    const value = event.target.value;
    const name = event.target.name;
    let updatedWorks = [];

    switch (type) {
      case "number": {
        updatedWorks = selectedWorks.map((element) => {
          if (element.title == name) {
            if (isMisc) {
              element.misc = value;
            } else {
              element.price = value;
            }
          }
          return element;
        });
        break;
      }
      case "select-one": {
        updatedWorks = selectedWorks.map((element) => {
          if (element.title == name) {
            element.price_distribution = value;
            if (value == "FIRST-UNIT") {
              element.misc = 0;
            } else {
              delete element.misc;
            }
          }
          return element;
        });
        break;
      }
    }

    setSelectedWorks([...updatedWorks]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
    // console.log(event.target.name.value);
    console.log(selectedWorks);
  };

  console.log(selectedWorks);

  return (
    <main className="h-[95vh]">
      <form onSubmit={handleFormSubmit}>
        <div className="w-2/3 border-2 border-slate-300 overflow-hidden mx-auto my-4 rounded-xl">
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
                    required
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
                  />
                </td>
              </tr>
              <tr>
                <th className="p-4 border-r text-lg">Works</th>
                <td className="flex gap-4 items-center h-14 px-2">
                  {works.map((element) => (
                    <div
                      key={element.id}
                      className="flex gap-4 justify-center border rounded-2xl px-2"
                    >
                      <input
                        type="checkbox"
                        name={element.title}
                        id={element.title}
                        onChange={handleWorkSelect}
                      />
                      <label htmlFor={element.title}>{element.title}</label>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 w-2/3 m-auto">
          {selectedWorks.map((element, index) => (
            <div
              key={index}
              className="border rounded-xl p-3 flex flex-col gap-2 my-3"
            >
              <p>{element.title}</p>
              <select
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
                className="border"
                name={element.title}
                onInput={handleWorkPrice}
              />
              {element.misc && <p>huhuhuhuhu</p>}
            </div>
            // <input
            //   type="number"
            //   className="border"
            //   name={element.title}
            //   onInput={(event) => handleWorkPrice(event, true)}
            // />
          ))}
        </div>
        <div className="flex justify-center gap-4 w-1/2 m-auto">
          <button
            className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400"
            type="reset"
            onClick={() => setSelectedWorks([])}
          >
            Reset
          </button>
          <button className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
