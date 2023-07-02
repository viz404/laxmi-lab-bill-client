import { Link, useNavigate, useParams } from "react-router-dom";
import { DoctorSelectorPage } from "../components/common";
import { useState } from "react";
import { billApis, jobApis } from "../apiHelpers";
import { toast } from "react-toastify";
import { calculationHelpers } from "../helpers";

const defaultDate = {
  from_date: "",
  to_date: "",
};

const defaultData = {
  jobs: [],
  amount: "",
  doctor: {},
  previous_balance: 0,
  total_amount: 0,
};

export default function EditBill() {
  const [data, setData] = useState(defaultData);
  const [date, setDate] = useState(defaultDate);

  const { doctorId } = useParams();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      const response = await jobApis.fetchJobsWithPrice({
        doctor_id: doctorId,
        from_date: date.from_date,
        to_date: date.to_date,
      });
      setData({
        jobs: response.data,
        amount: response.amount,
        doctor: response.doctor,
        previous_balance: response.previous_balance,
        total_amount: response.total_amount,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDateSelect = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setDate({ ...date, [name]: value });
  };

  const handleRemoveJob = (job_index) => {
    let job_amount = data.jobs[job_index].amount;
    let filtered = data.jobs.filter((_, index) => index != job_index);
    setData({
      ...data,
      amount: data.amount - job_amount,
      total_amount: data.total_amount - job_amount,
      jobs: filtered,
    });
  };

  const handleAddBill = async () => {
    try {
      let remaining = [];
      if (data.amount <= 0) {
        remaining.push("amount");
      }

      if (data.total_amount <= 0) {
        remaining.push("total amount");
      }

      if (!data.doctor) {
        remaining.push("doctor");
      }

      if (data.jobs.length == 0) {
        remaining.push("jobs");
      }

      if (remaining.length > 0) {
        throw new Error(`${remaining.join(" ")} not received`);
      }

      let filtered = data.jobs.map((element) => {
        return {
          id: element.id,
          amount: element.amount,
        };
      });

      data.jobs = filtered;
      data.doctor.id = doctorId;

      const response = await billApis.addBill(data);
      toast.success("bill created");
      navigate(`/bills/id/${response.data.id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!doctorId) {
    return <DoctorSelectorPage navigateTo="/doctors/x/bill" replace="x" />;
  }

  return (
    <main className="min-h-[95vh]">
      <div className=" flex items-start gap-5 px-4 mt-4">
        <div className="w-[30%]">
          <div className="text-xl">
            <p className="my-2">{`Dr: ${data.doctor.name}`}</p>
            <p className="my-2">{`Ph: ${data.doctor?.phone}`}</p>
            <p className="my-2">{`Total: ₹ ${data.amount}`}</p>
            <p className="my-2">{`Previous Balance: ₹ ${data.previous_balance}`}</p>
            <p className="my-2">{`Total Amount: ₹ ${data.total_amount}`}</p>
          </div>
          <div className="mt-10">
            <div className="flex gap-2">
              <p className="text-xl">From Date</p>
              <input
                className="h-14 outline-none text-lg dark:bg-gray-700 dark:text-white border"
                type="date"
                name="from_date"
                onChange={handleDateSelect}
                value={date.from_date}
              />
            </div>
            <div className="flex gap-2">
              <p className="text-xl">To Date</p>
              <input
                className="h-14 outline-none text-lg dark:bg-gray-700 dark:text-white border"
                type="date"
                name="to_date"
                onChange={handleDateSelect}
                value={date.to_date}
              />
            </div>
            <button
              className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 m-2 disabled:cursor-not-allowed disabled:bg-blue-400"
              onClick={handleGenerate}
            >
              Generate
            </button>
            <button
              className="bg-green-600 text-text-dark text-lg rounded-lg px-4 py-2 m-2 disabled:cursor-not-allowed disabled:bg-green-400"
              onClick={handleGenerate}
              disabled={data.amount == 0}
              onClickCapture={handleAddBill}
            >
              Print
            </button>
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
                    Patient
                  </th>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Date
                  </th>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Job no
                  </th>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Works
                  </th>
                  <th className="p-5 border-b-2 border-r border-b-slate-400">
                    Price
                  </th>
                  <th className="p-5 border-b-2 border-b-slate-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.jobs?.map((element, index) => (
                  <tr
                    key={element.id}
                    className={index + 1 < data.jobs.length ? "border-b" : ""}
                  >
                    <td className="p-4 border-r">{index + 1}</td>
                    <td className="p-4 border-r">{element.patient_name}</td>
                    <td className="p-4 border-r">
                      {calculationHelpers.formatDate(element.date)}
                    </td>
                    <td className="p-4 border-r">
                      <Link to={`/doctors/${doctorId}/job/${element.id}`}>
                        {element.job_number}
                      </Link>
                    </td>
                    <td className="p-4 border-r flex flex-col gap-2">
                      {element.works.map((ele, ind) => (
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
                    <td className="p-4 border-r">
                      <p>{`₹ ${element.amount}`}</p>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleRemoveJob(index)}>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
