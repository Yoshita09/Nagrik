import express from "express";
import cors from "cors";

const app = express();

/* ---------- CORS CONFIG ---------- */
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

/* ---------- HANDLE PREFLIGHT FOR /chat ---------- */
app.options("/chat", cors(corsOptions));

/* ---------- TICKET GENERATOR ---------- */
function generateTicket() {
  return `2024-${Math.floor(1000 + Math.random() * 9000)}`;
}

/* ---------- CIVIC LOGIC ---------- */
function civicBotLogic(message = "") {
  const text = message.toLowerCase();

  if (text.includes("pothole") || text.includes("road") || text.includes("gaddha")) {
    return `📍 Issue: Pothole / Road Damage  
🏢 Department: Roads & Infrastructure  
⚠️ Priority: High  

Please share:
1️⃣ Location  
2️⃣ Severity  
3️⃣ Photo (optional)

✅ Ticket ID: TKT-${generateTicket()}`;
  }

  if (text.includes("streetlight") || text.includes("light")) {
    return `💡 Issue: Streetlight Not Working  
🏢 Department: Electrical  
⚠️ Priority: Medium  

Please provide location.

✅ Ticket ID: TKT-${generateTicket()}`;
  }

  if (text.includes("garbage") || text.includes("trash")) {
    return `🗑️ Issue: Garbage Overflow  
🏢 Department: Sanitation  
⚠️ Priority: High  

Please share location.

✅ Ticket ID: TKT-${generateTicket()}`;
  }

  if (text.includes("water") || text.includes("leak")) {
    return `💧 Issue: Water Leakage  
🏢 Department: Water Supply  
⚠️ Priority: High  

Please share location.

✅ Ticket ID: TKT-${generateTicket()}`;
  }

  if (text.includes("track")) {
    return "🔍 Please provide your Ticket ID to track the complaint.";
  }

  return "🙏 Thanks for reaching out. Please describe your civic issue clearly.";
}

/* ---------- CHAT API ---------- */
app.post("/chat", (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.json({
      reply: "⚠️ Please type something so I can help 🙂",
    });
  }

  res.json({ reply: civicBotLogic(message) });
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});