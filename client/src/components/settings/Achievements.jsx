import {
  Target,
  CheckCircle,
  Trophy,
  Eye,
  Star,
  Sparkles
} from "lucide-react";

export default function Achievements() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Target size={18} /> Your Achievements
        </h3>
        <p className="text-gray-500 text-sm">
          Badges earned for your civic contributions
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <AchievementCard
          icon={<Target className="text-teal-600" />}
          title="First Report"
          desc="Submit your first issue report"
          unlocked
        />

        <AchievementCard
          icon={<CheckCircle className="text-green-600" />}
          title="Verified Voice"
          desc="Get 5 reports verified"
          unlocked
        />

        <AchievementCard
          icon={<Trophy className="text-yellow-500" />}
          title="Ward Champion"
          desc="Top 10 in your ward"
          unlocked
        />

        <AchievementCard
          icon={<Eye className="text-gray-400" />}
          title="Keen Eye"
          desc="Report 25 issues"
        />

        <AchievementCard
          icon={<Star className="text-gray-400" />}
          title="Community Hero"
          desc="Reach Gold level"
        />

        <AchievementCard
          icon={<Sparkles className="text-gray-400" />}
          title="Change Maker"
          desc="Get 10 issues resolved"
        />

      </div>

    </div>
  );
}

/* ---------------- CARD ---------------- */

function AchievementCard({ icon, title, desc, unlocked }) {
  return (
    <div
      className={`rounded-xl border p-6 text-center transition
        ${unlocked
          ? "bg-teal-50 border-teal-200"
          : "bg-gray-50 border-gray-200"
        }`}
    >
      <div
        className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center
          ${unlocked ? "bg-teal-100" : "bg-gray-200"}
        `}
      >
        {icon}
      </div>

      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>

      {unlocked && (
        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
          Unlocked
        </span>
      )}
    </div>
  );
}