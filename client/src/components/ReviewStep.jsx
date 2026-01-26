export default function ReviewStep({ image, form, onBack }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">

      <h3 className="text-xl font-semibold mb-2">Review Your Report</h3>
      <p className="text-gray-500 mb-6">
        Please verify all details before submitting
      </p>

      <div className="border rounded-xl overflow-hidden mb-6">
        <img src={image} className="w-full max-h-72 object-cover" />
      </div>

      <div className="space-y-2 text-sm">
        <p><b>Category:</b> {form.category}</p>
        <p><b>Title:</b> {form.title}</p>
        <p><b>Description:</b> {form.description}</p>
        <p><b>Ward:</b> {form.ward}</p>
        <p><b>Landmark:</b> {form.landmark}</p>
        <p><b>Address:</b> {form.address}</p>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-5 py-2.5 border rounded-xl">
          Edit Details
        </button>

        <button
          onClick={() => alert("✅ Report Submitted Successfully!")}
          className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700"
        >
          Submit Report
        </button>
      </div>

    </div>
  );
}