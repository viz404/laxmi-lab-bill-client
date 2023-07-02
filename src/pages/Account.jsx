import React, { useEffect, useState } from "react";
import { DoctorSelectorPage } from "../components/common";
import { useParams } from "react-router-dom";
import { accountApis, billApis } from "../apiHelpers";
import { toast } from "react-toastify";

export default function Account() {
  const [account, setAccount] = useState({});
  const [toggleBill, setToggleBill] = useState(false);
  const [previousBill, setPreviousBill] = useState({});

  const { doctorId } = useParams();

  useEffect(() => {
    accountApis
      .fetchAccount(doctorId)
      .then((response) => setAccount(response.data))
      .catch((error) => toast.error(error.message));
  }, [doctorId]);

  const handleFormInput = (event) => {
    const { name, value } = event.target;
    setPreviousBill({ ...previousBill, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      previousBill.doctor_id = doctorId;
      previousBill.doctor_name = account.doctor.name;

      await billApis.addPreviousBill(previousBill);

      account.previous_bill.amount += Number(previousBill.amount);
      account.balance += Number(previousBill.amount);
      setAccount({ ...account });
      setPreviousBill({});
      setToggleBill(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!doctorId) {
    return <DoctorSelectorPage navigateTo="/account/x" replace="x" />;
  }

  return (
    <main className="min-h-[95vh]">
      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <div className="border-2 border-slate-300 overflow-hidden rounded-xl w-2/3">
          <table className="table-auto w-full text-left border-collapse text-xl">
            <tbody>
              <tr className="border-b">
                <th className="border-r p-2">Doctor</th>
                <td className="p-2">{account.doctor?.name}</td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Previous Bill</th>
                <td className="p-2">₹ {account.previous_bill?.amount}</td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Previous Payment</th>
                <td className="p-2">₹ {account.previous_payment?.amount}</td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Current Balance</th>
                <td className="p-2">₹ {account.balance}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 m-3"
          onClick={() => {
            setToggleBill((prev) => !prev);
          }}
        >
          Add Previous Bill
        </button>
        {toggleBill && (
          <>
            <div className="border-2 border-slate-300 overflow-hidden rounded-xl">
              <table className="table-auto w-full text-left border-collapse text-xl">
                <tbody>
                  <tr className="border-b">
                    <th className="border-r p-2">Amount</th>
                    <td className="p-2">
                      <input
                        type="number"
                        name="amount"
                        onChange={handleFormInput}
                        value={previousBill.amount ?? ""}
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="border-r p-2">Date</th>
                    <td className="p-2">
                      <input
                        type="date"
                        name="date"
                        onChange={handleFormInput}
                        value={previousBill.date ?? ""}
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="border-r p-2">Particular</th>
                    <td className="p-2">
                      <input
                        type="text"
                        name="particular"
                        onChange={handleFormInput}
                        value={previousBill.particular ?? ""}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 m-3"
              onClick={handleSubmit}
            >
              Submit Previous Bill
            </button>
          </>
        )}
      </div>
    </main>
  );
}
