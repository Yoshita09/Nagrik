import { useState } from "react";
import ReviewStep from "./ReviewStep";
import ReportSuccess from "./ReportSuccess";

export default function Report_issue() {
  const [step, setStep] = useState(2); // adjust if needed
  const [form, setForm] = useState({});
  const [complaintId, setComplaintId] = useState(null); // ✅ ADD THIS

  return (
    <>
      {/* STEP 2 - REVIEW */}
      {step === 2 && complaintId && (
        <ReviewStep
          form={form}
          onBack={() => setStep(1)}
          onNext={(id) => {
            console.log("Received ID in parent:", id); // 🔍 DEBUG
            setComplaintId(id);  // ✅ STORE ID
            setStep(3);          // go to success page
          }}
        />
      )}

      {/* STEP 3 - SUCCESS */}
      {step === 3 && complaintId && (
        <ReportSuccess
          form={form}
          onBack={() => setStep(1)}
          complaintId={complaintId} // ✅ PASS ID HERE
        />
      )}
    </>
  );
}