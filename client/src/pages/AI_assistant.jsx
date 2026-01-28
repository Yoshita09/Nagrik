import { useState, useRef, useEffect } from "react";
import {
  Mic,
  Send,
  Bot,
  MapPin,
  Lightbulb,
  Trash2,
  Search,
} from "lucide-react";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: `नमस्ते! 🙏 Welcome to CivicAI Assistant. I can help you report civic issues, check complaint status, or guide you through government services. How can I help you today?\n\nआप हिंदी या English में बात कर सकते हैं।`,
      time: "08:11 PM",
    },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
  if (!input.trim()) return;

  const userText = input;

  let botReply = "Thanks! I'm processing your request. 🤖";

  if (userText.toLowerCase().includes("pothole")) {
    botReply = `I understand you're reporting a road/pothole issue. Let me help you file this complaint.

📍 **Issue Detected:** Pothole / Road Damage  
🏢 **Department:** Roads & Infrastructure  
⚠️ **Priority:** High (Safety Concern)

I'll need a few details:
1. Can you share the location or address?
2. How severe is the damage?
3. Would you like to upload a photo?

Or simply describe the issue and I'll handle the rest!

✅ **Ticket Created:** TKT-2024-0156`;
  }

  if (userText.toLowerCase().includes("streetlight")) {
    botReply = `Got it! You're reporting a streetlight issue.

💡 **Issue Detected:** Streetlight Not Working  
🏢 **Department:** Electrical Maintenance  
⚠️ **Priority:** Medium  

Please provide:
1. Location of the streetlight  
2. Since when it is not working  
3. Upload a photo (optional)

✅ **Ticket Created:** TKT-2024-0213`;
  }

  if (userText.toLowerCase().includes("garbage")) {
    botReply = `Thanks for reporting garbage overflow.

🗑️ **Issue Detected:** Garbage Overflow  
🏢 **Department:** Sanitation  
⚠️ **Priority:** High  

Please share:
1. Exact location  
2. Severity  
3. Upload a photo (optional)

✅ **Ticket Created:** TKT-2024-0339`;
  }

  if (userText.toLowerCase().includes("track")) {
    botReply = `Please provide your Ticket ID to track your complaint status.`;
  }

  setMessages((prev) => [
    ...prev,
    { role: "user", text: userText, time: "Now" },
    { role: "bot", text: botReply, time: "Now" },
  ]);

  setInput("");
};

  return (
    <section className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Civic Assistant</h1>
              <p className="text-gray-500">
                Voice & Text Support • Hindi & English
              </p>
            </div>
          </div>

          <button className="border px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition">
            अA हिंदी
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex flex-wrap gap-3 mb-6">
          <QuickBtn
            icon={<MapPin size={18} />}
            text="Report Pothole"
            onClick={() => setInput("I want to report a pothole")}
          />
          <QuickBtn
            icon={<Lightbulb size={18} />}
            text="Streetlight Issue"
            onClick={() => setInput("I want to report a streetlight issue")}
          />
          <QuickBtn
            icon={<Trash2 size={18} />}
            text="Garbage Overflow"
            onClick={() => setInput("There is garbage overflow in my area")}
          />
          <QuickBtn
            icon={<Search size={18} />}
            text="Track Complaint"
            onClick={() => setInput("I want to track my complaint")}
          />
        </div>

        {/* CHAT CONTAINER */}
        <div className="bg-white rounded-2xl shadow-sm border flex flex-col h-[70vh]">

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <ChatBubble key={i} msg={msg} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* INPUT BAR */}
          <div className="border-t p-4 flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-orange-100 hover:border-orange-400 transition">
              <Mic size={18} />
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message or use voice..."
              className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
            />

            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white hover:bg-orange-500 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* FOOTER TIP */}
        <p className="text-center text-gray-500 mt-4 text-sm">
          💡 Tip: You can report issues using voice in Hindi or English
        </p>
      </div>
    </section>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function QuickBtn({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 border px-4 py-2 rounded-xl
                 bg-white text-gray-700
                 hover:bg-orange-500 hover:text-white hover:border-orange-500
                 transition-all text-sm font-medium"
    >
      {icon}
      {text}
    </button>
  );
}

function ChatBubble({ msg }) {
  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-3 rounded-xl text-sm whitespace-pre-line
          ${
            msg.role === "user"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
      >
        {msg.text}
        <p className="text-[10px] text-right opacity-70 mt-1">{msg.time}</p>
      </div>
    </div>
  );
}