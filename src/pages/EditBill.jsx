import { useParams } from "react-router-dom";
import { DoctorSelectorPage } from "../components/common";

export default function EditBill() {
  const { doctorId } = useParams();

  if (!doctorId) {
    return <DoctorSelectorPage navigateTo="/doctors/x/bill" replace="x" />;
  }

  return (
    <main className="min-h-[95vh]">
      <div className=" flex items-start gap-5 px-4 mt-4">
      <div className="w-[30%]">
        
      </div>
      <div className="w-full">

      </div>
      </div>
    </main>
  );
}
