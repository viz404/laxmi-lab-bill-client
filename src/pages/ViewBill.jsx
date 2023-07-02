import { useEffect, useState } from "react";
import { billApis } from "../apiHelpers";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { calculationHelpers, numberToWord } from "../helpers";

export default function ViewBill(req, res) {
  const [bill, setBill] = useState({});

  const { billId } = useParams();

  useEffect(() => {
    billApis
      .getBill(billId)
      .then((response) => setBill(response.data))
      .catch((error) => toast.error(error.message));
  }, [billId]);
  return (
    <main className="min-h-[95vh]">
      <div>
        <button>Print</button>
      </div>
      <div className="px-4" id="section-to-print">
        <div className="flex gap-4">
          <div>
            <img src="/laxmi.png" alt="laxmi-image" width="150px" />
          </div>
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-2">SHREE LAXMI DENTAL LAB</h1>
            <p className="text-lg">
              Shanti Nivas, 14/3, Matoshri Colony, Near Warje Jakat Nakha, Pune
              411052.
            </p>
            <p className="text-lg">M: 9890410965 / 9763269993</p>
            <div className="flex justify-between mt-3 text-base">
              <div>
                <p>Dr. Name: {bill.doctor?.name}</p>
                <p>Address: {bill.doctor?.address}</p>
              </div>
              <div>
                <p>No: {bill.id}</p>
                <p>Date: {calculationHelpers.formatDate(bill.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="border-black border-2">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-5 border-b-2 border-r-2 border-black">Sr</th>
                  <th className="p-5 border-b-2 border-r-2 border-black">
                    Date
                  </th>
                  <th className="p-5 border-b-2 border-r-2 border-black">
                    Job no
                  </th>
                  <th className="p-5 border-b-2 border-r-2 border-black">
                    Patient
                  </th>
                  <th className="p-5 border-b-2 border-r-2 border-black">
                    Works
                  </th>
                  <th className="p-5 border-b-2 border-black">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bill.jobs?.map((element, index) => (
                  <tr
                    key={element.id}
                    className={
                      index + 1 < bill.jobs.length
                        ? "border-b-2 border-black"
                        : ""
                    }
                  >
                    <td className="p-4 border-r-2 border-black">{index + 1}</td>
                    <td className="p-4 border-r-2 border-black">
                      {calculationHelpers.formatDate(element.date)}
                    </td>
                    <td className="p-4 border-r-2 border-black">
                      {element.job_number}
                    </td>
                    <td className="p-4 border-r-2 border-black">
                      {element.patient_name}
                    </td>
                    <td className="p-4 border-r-2 border-black flex flex-col gap-2">
                      {element.works.map((ele, ind) => (
                        <div
                          className={"flex justify-between items-center"}
                          key={ind}
                        >
                          <p>{ele.title}</p>
                          <table>
                            <tbody>
                              <tr className="border-b border-black">
                                <td className="border-r border-black">
                                  {ele.upper_left}
                                </td>
                                <td>{ele.upper_right}</td>
                              </tr>
                              <tr>
                                <td className="border-r border-black">
                                  {ele.lower_left}
                                </td>
                                <td>{ele.lower_right}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </td>
                    <td className="p-4">
                      <p>{`₹ ${element.amount}`}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-2 border-t-0 border-black text-lg">
            <div className="flex justify-between border-b-2 border-black px-2">
              <p>Rs:</p>
              <p className="font-bold">₹ {bill.amount}</p>
            </div>
            <div className="flex justify-between px-2">
              <p>Rs {"(in words): "}</p>
              <p className="font-bold">{numberToWord(bill.amount)}</p>
            </div>
          </div>
          <div className="mt-4 text-lg break-before-auto">
            <p className="font-bold">Payment details</p>
            <div className="flex justify-between">
              <div>
                <table className="text-left">
                  <tbody>
                    <tr>
                      <th>Bank Name</th>
                      <td>Union Bank</td>
                    </tr>
                    <tr>
                      <th>Account Number</th>
                      <td>560371000694883</td>
                    </tr>
                    <tr>
                      <th>Branch and IFSC</th>
                      <td>Karvenagar UBIN0905038</td>
                    </tr>
                    <tr>
                      <th>Google/Phone Pay</th>
                      <td>9763269993</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <img src="/qr-code.jpg" alt="qr-code" width="150px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
