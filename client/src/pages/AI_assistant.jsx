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
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
const [listening, setListening] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userText = input;

  // Show user message immediately
  setMessages((prev) => [
    ...prev,
    { role: "user", text: userText, time: "Now" },
  ]);

  setInput("");

  try {
    const res = await fetch(`${BASE_URL}/chat`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: userText }),
});



    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: data.reply || "Sorry, I couldn't understand that.",
        time: "Now",
      },
    ]);
  } catch (error) {
    console.error(error);
    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: "⚠️ Server error. Please try again later.",
        time: "Now",
      },
    ]);
  }
};
const startListening = () => {
  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    alert("Speech recognition not supported in this browser");
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-IN"; // Hindi-English mix
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); // put text into input box
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech error:", event.error);
      setListening(false);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };
  }

  setListening(true);
  recognitionRef.current.start();
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
            <button
  onClick={startListening}
  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition
    ${
      listening
        ? "bg-red-100 border-red-400 animate-pulse"
        : "hover:bg-orange-100 hover:border-orange-400"
    }`}
>
  <Mic size={18} className={listening ? "text-red-500" : ""} />
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