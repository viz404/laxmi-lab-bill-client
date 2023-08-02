import { useNavigate, useParams } from "react-router-dom";
import { DoctorSelectorPage } from "../components/common";
import { useEffect, useState } from "react";
import { doctorApis, jobApis } from "../apiHelpers";
import { toast } from "react-toastify";

const defaultDoctor = {
  name: "",
  phone: "",
  works: [],
};

const defaultJob = {
  date: new Date().toISOString().split("T")[0],
  job_number: "",
  patient_name: "",
  works: [],
};

export default function EditJob() {
  const [doctor, setDoctor] = useState(defaultDoctor);
  const [job, setJob] = useState(defaultJob);

  const { jobId, doctorId } = useParams();

  // const { doctorId, jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorId) {
      updateDoctor(doctorId);
    }

    if (jobId) {
      updateJob(jobId);
    }

    return () => {
      setDoctor({ ...defaultDoctor, works: [] });
      setJob({ ...defaultJob, works: [] });
    };
  }, [doctorId, jobId]);

  const updateJob = async (jobId) => {
    try {
      const response = await jobApis.fetchJob(jobId);
      setJob(response.data);
      updateDoctor(response.data.doctor.id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateDoctor = async (doctorId) => {
    try {
      const response = await doctorApis.fetchDoctorById(doctorId);
      setDoctor(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFormInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    job[name] = value;
    setJob({ ...job });
  };

  const handleWorkSelect = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;

    if (checked) {
      job.works.push({
        title: name,
      });
    } else {
      let filtered = job.works.filter((element) => element.title != name);
      job.works = filtered;
    }

    setJob({ ...job });
  };

  const handleWorkInput = (event) => {
    const position = event.target.name;
    const value = event.target.value.replace(/\D/g, "");
    const index = event.target.dataset.index;

    job.works[index][position] = value;
    setJob({ ...job });
  };

  const handleSubmit = async () => {
    try {
      if (job.works.length == 0) {
        throw new Error("Please select a work");
      }

      if (!job.date) {
        throw new Error("Please select date");
      }

      if (!job.job_number) {
        throw new Error("Please select job number");
      }

      job.doctor_id = doctorId;
      job.doctor_name = doctor.name;

      if (jobId) {
        await jobApis.updateJob(job, jobId);
      } else {
        await jobApis.addNewJob(job);
      }

      toast.success(
        `Job number ${job.job_number} was ${
          jobId ? "updated" : "added"
        } successfully`
      );
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReset = () => {
    setJob({ ...defaultJob, works: [] });
  };

  if (!doctorId && !jobId) {
    return <DoctorSelectorPage path="/new/job/x" replace="x" />;
  }

  return (
    <main className="min-h-[95vh]">
      <div className="my-4 px-5 text-xl">
        <p className="my-2">{`Doctor: ${doctor.name}`}</p>
        <p className="my-2">{`Phone: ${doctor.phone}`}</p>
      </div>
      <div className=" flex items-start gap-5 px-4 mt-4">
        <div className="w-[30%] border-2 border-slate-300 rounded-xl">
          <p className="text-lg font-bold text-center border-b p-4">Works</p>
          {doctor.works.map((element, index) => (
            <label
              key={index}
              className="flex justify-between gap-3 border-b py-2 px-4"
            >
              <p className="text-lg">{element.title}</p>
              <input
                type="checkbox"
                name={element.title}
                value={index}
                key={index}
                className="w-5 h-5"
                onChange={handleWorkSelect}
                checked={job.works
                  .map((ele) => ele.title)
                  .includes(element.title)}
              />
            </label>
          ))}
        </div>
        <div className="w-full">
          <div className="border-2 border-slate-300 overflow-hidden mx-auto mb-4 rounded-xl">
            <table className="table-auto w-full text-left">
              <tbody>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Date</th>
                  <td>
                    <input
                      className="w-full h-14 outline-none text-lg dark:bg-gray-700 dark:text-white"
                      type="date"
                      name="date"
                      value={job.date}
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Job Number</th>
                  <td>
                    <input
                      type="number"
                      name="job_number"
                      className="w-full h-14 outline-none text-lg dark:bg-gray-700 dark:text-white px-2"
                      placeholder="Enter job number"
                      value={job.job_number}
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Patient Name</th>
                  <td>
                    <input
                      type="text"
                      name="patient_name"
                      className="w-full h-14 outline-none text-lg dark:bg-gray-700 dark:text-white px-2"
                      placeholder="Enter patient name"
                      value={job.patient_name}
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Shade</th>
                  <td>
                    <input
                      type="text"
                      name="shade"
                      className="w-full h-14 outline-none text-lg dark:bg-gray-700 dark:text-white px-2"
                      placeholder="Enter shade"
                      value={job.shade ?? ""}
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="p-4 border-r text-lg">Notes</th>
                  <td>
                    <input
                      type="text"
                      name="notes"
                      className="w-full h-14 outline-none text-lg dark:bg-gray-700 dark:text-white px-2"
                      placeholder="Enter notes"
                      value={job.notes ?? ""}
                      onChange={handleFormInput}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center flex-wrap gap-4 w-full my-6">
            {job.works.map((element, index) => (
              <div
                key={index}
                className="border-2 border-slate-300 p-4 rounded-lg text-lg w-[40%]"
              >
                <p className="text-center font-bold">{element.title}</p>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="upper_left"
                          data-index={index}
                          onChange={handleWorkInput}
                          value={element.upper_left ?? ""}
                          className="dark:bg-gray-700 dark:text-white border border-slate-300 outline-none p-2 w-full"
                          placeholder="Upper Left"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="upper_right"
                          data-index={index}
                          onChange={handleWorkInput}
                          value={element.upper_right ?? ""}
                          className="dark:bg-gray-700 dark:text-white border border-slate-300 outline-none p-2 w-full"
                          placeholder="Upper Right"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="lower_left"
                          data-index={index}
                          onChange={handleWorkInput}
                          value={element.lower_left ?? ""}
                          className="dark:bg-gray-700 dark:text-white border border-slate-300 outline-none p-2 w-full"
                          placeholder="lower Left"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="lower_right"
                          data-index={index}
                          onChange={handleWorkInput}
                          value={element.lower_right ?? ""}
                          className="dark:bg-gray-700 dark:text-white border border-slate-300 outline-none p-2 w-full"
                          placeholder="lower Right"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 w-1/2 m-auto">
            <button
              className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400"
              onClick={handleSubmit}
            >
              {jobId ? "Update" : "Submit"}
            </button>
            {jobId && (
              <button className="bg-red-600 text-text-dark text-lg rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:bg-blue-400">
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
