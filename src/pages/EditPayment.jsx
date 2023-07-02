import { useParams } from "react-router-dom";
import { DoctorSelectorPage } from "../components/common";
import { useState } from "react";

export default function EditPayment() {
    const [account, setAccount] = useState({});

  const { doctorId, paymentId } = useParams();

  if (!doctorId) {
    return <DoctorSelectorPage navigateTo="/payments/doctors/x" replace="x" />;
  }

  return (
    <main className="min-h-[95vh]">
      <p>hi</p>
    </main>
  );
}
