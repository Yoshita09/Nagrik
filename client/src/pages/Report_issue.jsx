import { useState } from "react";
import UploadStep from "../components/UploadStep";
import DetailsStep from "../components/DetailsStep";
import ReviewStep from "../components/ReviewStep";

export default function ReportIssue() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    category: "Pothole / Road Damage",
    title: "Pothole detected on road",
    description:
      "AI has detected a pothole in the uploaded image. The pothole appears to be medium-sized and could pose a safety risk for vehicles.",
    ward: "",
    landmark: "",
    address: "",
  });

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Report an Issue</h1>
          <p className="text-gray-500">
            Upload a photo for AI detection or describe the issue manually
          </p>
        </div>

        {/* STEPS */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <Step num={1} active={step >= 1} text="Upload" />
          <Line />
          <Step num={2} active={step >= 2} text="Details" />
          <Line />
          <Step num={3} active={step >= 3} text="Review" />
        </div>

        {step === 1 && (
          <UploadStep
            image={image}
            setImage={setImage}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <DetailsStep
            form={form}
            setForm={setForm}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <ReviewStep
            image={image}
            form={form}
            onBack={() => setStep(2)}
          />
        )}

      </div>
    </section>
  );
}

/* ---------- UI HELPERS ---------- */

function Step({ num, text, active }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold
          ${active ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}
      >
        {num}
      </div>
      <span className={`font-medium ${active ? "text-black" : "text-gray-500"}`}>
        {text}
      </span>
    </div>
  );
}

function Line() {
  return <div className="w-12 h-[2px] bg-gray-300" />;
}