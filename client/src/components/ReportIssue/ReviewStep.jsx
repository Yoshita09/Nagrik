import { supabase } from "../../lib/supabase";

export default function ReviewStep({ image, form, onBack, onNext }) {
  
  const handleSubmit = async () => {
  try {
    const mapDept = (issue) => {
      if (issue.includes("Pothole") || issue.includes("Road"))
        return "Roads & Infrastructure";
      if (issue.includes("Garbage"))
        return "Sanitation & Waste";
      if (issue.includes("Water"))
        return "Water Supply";
      if (issue.includes("Streetlight"))
        return "Electrical Department";
      return "General";
    };

    const department = mapDept(form.category);

    const { data, error } = await supabase
      .from("complaints")
      .insert([
        {
          title: form.title,
          description: form.description,
          department,
          status: "Pending",
          ward: form.ward,
          location: form.address,
          reported_by: "Citizen",
        },
      ])
      .select().single(); // ✅ MUST

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    const insertedId = data?.id;

    console.log("Inserted ID:", insertedId); // 🔍 DEBUG

    // 🔥 IMPORTANT FIX
    onNext(insertedId);

  } catch (err) {
    console.error(err);
    alert("Error submitting report");
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h3 className="text-xl font-semibold mb-2">Review Your Report</h3>

      <img src={image.preview} className="w-full max-h-72 object-cover mb-4" />

      <div className="space-y-2 text-sm">
        <p><b>Category:</b> {form.category}</p>
        <p><b>Title:</b> {form.title}</p>
        <p><b>Description:</b> {form.description}</p>
        <p><b>Ward:</b> {form.ward}</p>
        <p><b>Landmark:</b> {form.landmark}</p>
        <p><b>Address:</b> {form.address}</p>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-5 py-2 border rounded-xl">
          Edit Details
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-teal-600 text-white rounded-xl"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}