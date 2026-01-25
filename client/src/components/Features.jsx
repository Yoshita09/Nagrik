import {
  MessageSquare,
  Map,
  Camera,
  LayoutDashboard,
  Zap,
  Accessibility
} from "lucide-react";

import FeatureCard from "./FeatureCard";

export default function Features() {
  const features = [
    {
      title: "AI Civic Assistant",
      desc: "Speak or type complaints in Hindi or English. AI understands, tags department and generates ticket.",
      icon: MessageSquare,
      bg: "text-teal-600",
      iconBg: "bg-teal-100"
    },
    {
      title: "Smart Ward Map",
      desc: "Live map showing broken streetlights, potholes, garbage bins, and real-time complaint status.",
      icon: Map,
      bg: "text-orange-600",
      iconBg: "bg-orange-100"
    },
    {
      title: "Computer Vision Detection",
      desc: "Upload photos to auto-detect potholes, garbage overflow, and infrastructure issues.",
      icon: Camera,
      bg: "text-green-600",
      iconBg: "bg-green-100"
    },
    {
      title: "Unified Dashboard",
      desc: "All departments view shared civic data, priority queues, and ward-wise performance.",
      icon: LayoutDashboard,
      bg: "text-yellow-600",
      iconBg: "bg-yellow-100"
    },
    {
      title: "AI Priority Engine",
      desc: "Complaints ranked by safety risk, repeat count, and pending time. Auto-escalation for delays.",
      icon: Zap,
      bg: "text-red-600",
      iconBg: "bg-red-100"
    },
    {
      title: "Inclusive Access",
      desc: "Voice-only UI for elderly, icon-based for low-literacy, accessibility-first design.",
      icon: Accessibility,
      bg: "text-teal-700",
      iconBg: "bg-teal-100"
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-3xl font-bold">
            How AI Powers Your City
          </h2>
          <p className="text-gray-600 mt-2">
            End-to-end AI solutions for modern civic governance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {features.map((item, i) => (
            <FeatureCard key={i} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}