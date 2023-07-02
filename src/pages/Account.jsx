import React, { useEffect, useState } from "react";
import { DoctorSelectorPage } from "../components/common";
import { useParams } from "react-router-dom";
import { accountApis, billApis, paymentApis } from "../apiHelpers";
import { toast } from "react-toastify";

export default function Account() {
  const [account, setAccount] = useState({});
  const [previousBill, setPreviousBill] = useState({});
  const [previousPayment, setPreviousPayment] = useState({});

  const { doctorId } = useParams();

  useEffect(() => {
    if (doctorId) {
      accountApis
        .fetchAccount(doctorId)
        .then((response) => setAccount(response.data))
        .catch((error) => toast.error(error.message));
    }
  }, [doctorId]);

  const handleFormInput = (event) => {
    const { name, value } = event.target;
    setPreviousBill({ ...previousBill, [name]: value });
  };

  const handleForm2Input = (event) => {
    const { name, value } = event.target;
    setPreviousPayment({ ...previousPayment, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      previousBill.doctor_id = doctorId;
      previousBill.doctor_name = account.doctor.name;

      await billApis.addPreviousBill(previousBill);

      account.previous_bill.amount = Number(previousBill.amount);
      account.balance += Number(previousBill.amount);
      setAccount({ ...account });
      setPreviousBill({});
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      previousPayment.doctor_id = doctorId;
      previousPayment.doctor_name = account.doctor.name;

      console.log(previousPayment);

      await paymentApis.addPayment(previousPayment);

      account.previous_payment.amount = Number(previousPayment.amount);
      account.balance -= Number(previousPayment.amount);
      setAccount({ ...account });
      setPreviousPayment({});
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
        <div className="border-2 border-slate-300 overflow-hidden rounded-xl mt-5">
          <table className="table-auto w-full text-left border-collapse text-xl">
            <tbody>
              <tr className="border-b">
                <th className="border-r p-2">Amount</th>
                <td className="p-2">
                  <input
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none p-2"
                    type="number"
                    name="amount"
                    onChange={handleFormInput}
                    placeholder="Add Previous Bill"
                    value={previousBill.amount ?? ""}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Date</th>
                <td className="p-2">
                  <input
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none p-2"
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
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none p-2"
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
        <div className="border-2 border-slate-300 overflow-hidden rounded-xl mt-5">
          <table className="table-auto w-full text-left border-collapse text-xl">
            <tbody>
              <tr className="border-b">
                <th className="border-r p-2">Amount</th>
                <td className="p-2">
                  <input
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none p-2"
                    type="number"
                    name="amount"
                    onChange={handleForm2Input}
                    placeholder="Add Payment"
                    value={previousPayment.amount ?? ""}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Date</th>
                <td className="p-2">
                  <input
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none p-2"
                    type="date"
                    name="date"
                    onChange={handleForm2Input}
                    value={previousPayment.date ?? ""}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Notes</th>
                <td className="p-2">
                  <input
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none p-2"
                    type="text"
                    name="notes"
                    onChange={handleForm2Input}
                    value={previousPayment.notes ?? ""}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Mobile</th>
                <td className="p-2">
                  <input
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none p-2"
                    type="number"
                    name="mobile"
                    onChange={handleForm2Input}
                    value={previousPayment.mobile ?? ""}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Cheque</th>
                <td className="p-2">
                  <input
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none p-2"
                    type="string"
                    name="cheque"
                    onChange={handleForm2Input}
                    value={previousPayment.cheque ?? ""}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <th className="border-r p-2">Mode</th>
                <td className="p-2">
                  <select
                    className="text-text-light dark:bg-gray-700 dark:text-text-dark outline-none"
                    name="mode"
                    onChange={handleForm2Input}
                    value={previousPayment.mode ?? ""}
                  >
                    <option value="UPI">UPI</option>
                    <option value="CASH">Cash</option>
                    <option value="CHEQUE">Cheque</option>
                    <option value="BANK-TRANSFER">Bank Transfer</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="bg-primary text-text-dark text-lg rounded-lg px-4 py-2 m-3"
          onClick={handlePaymentSubmit}
        >
          Submit Payment
        </button>
      </div>
    </main>
  );
}
