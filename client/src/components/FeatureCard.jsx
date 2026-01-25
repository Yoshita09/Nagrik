export default function FeatureCard({ icon: Icon, title, desc, bg, iconBg }) {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
      
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={22} className={bg} />
      </div>

      <h3 className="mt-5 font-semibold text-lg">{title}</h3>

      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {desc}
      </p>

    </div>
  );
}