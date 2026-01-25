import {
  MapPin,
  Clock,
  ThumbsUp,
  ChevronRight
} from "lucide-react";

export default function IssueCard({ data }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
              {data.icon}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 leading-tight">
                {data.title}
              </h3>
              <p className="text-xs text-gray-500">{data.id}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {data.ai && (
              <span className="px-3 py-1 rounded-full text-xs bg-teal-100 text-primary">
                AI Detected
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-xs ${data.statusStyle}`}
            >
              {data.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-4">{data.desc}</p>

        {/* Tags */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs ${data.priorityStyle}`}
          >
            {data.priority}
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
            {data.category}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-4">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {data.ward}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {data.time}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp size={14} /> {data.votes}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-4">
        <button
          className="w-full flex items-center justify-between px-5 py-3 
               rounded-xl text-sm font-medium text-gray-600
               bg-gray-50 border border-gray-200
               hover:bg-orange-500 hover:text-white hover:border-orange-500
               transition-all duration-300 group"
        >
          <span>View Details</span>
          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform duration-200"
          />
        </button>
      </div>
    </div>
  );
}