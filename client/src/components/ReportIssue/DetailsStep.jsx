export default function DetailsStep({ form, setForm, onBack, onNext }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">

      <h3 className="text-xl font-semibold mb-2">Issue Details</h3>
      <p className="text-gray-500 mb-6">
        AI has pre-filled some fields. Please verify and add location.
      </p>

      <div className="space-y-4">

        <Input label="Issue Category" value={form.category} />

        <Input
          label="Issue Title"
          value={form.title}
          onChange={v => setForm({ ...form, title: v })}
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={v => setForm({ ...form, description: v })}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Ward"
            placeholder="Select ward"
            value={form.ward}
            onChange={v => setForm({ ...form, ward: v })}
          />
          <Input
            label="Nearest Landmark"
            placeholder="e.g. Near Metro Station"
            value={form.landmark}
            onChange={v => setForm({ ...form, landmark: v })}
          />
        </div>

        <Input
          label="Full Address"
          placeholder="Street address"
          value={form.address}
          onChange={v => setForm({ ...form, address: v })}
        />

      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-5 py-2.5 border rounded-xl">
          Back
        </button>

        <button
          onClick={onNext}
          className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700"
        >
          Review & Submit →
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, placeholder, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1">{label}</p>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1">{label}</p>
      <textarea
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
      />
    </div>
  );
}