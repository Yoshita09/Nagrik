import express from "express";
import cors from "cors";

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: "*", // allow Vercel frontend
  })
);
app.use(express.json());

/* ---------- TICKET GENERATOR ---------- */
function generateTicket() {
  return `2024-${Math.floor(1000 + Math.random() * 9000)}`;
}

/* ---------- CIVIC LOGIC ---------- */
function civicBotLogic(message = "") {
  const text = message.toLowerCase();

  if (text.includes("pothole") || text.includes("road") || text.includes("gaddha")) {
    return `
📍 Issue: Pothole / Road Damage  
🏢 Department: Roads & Infrastructure  
⚠️ Priority: High  

Please share:
1️⃣ Location  
2️⃣ Severity  
3️⃣ Photo (optional)

✅ Ticket ID: TKT-${generateTicket()}
`;
  }

  if (text.includes("streetlight") || text.includes("light")) {
    return `
💡 Issue: Streetlight Not Working  
🏢 Department: Electrical  
⚠️ Priority: Medium  

Please provide location.

✅ Ticket ID: TKT-${generateTicket()}
`;
  }

  if (text.includes("garbage") || text.includes("trash")) {
    return `
🗑️ Issue: Garbage Overflow  
🏢 Department: Sanitation  
⚠️ Priority: High  

Please share location.

✅ Ticket ID: TKT-${generateTicket()}
`;
  }

  if (text.includes("water") || text.includes("leak")) {
    return `
💧 Issue: Water Leakage  
🏢 Department: Water Supply  
⚠️ Priority: High  

Please share location.

✅ Ticket ID: TKT-${generateTicket()}
`;
  }

  if (text.includes("track")) {
    return "🔍 Please provide your Ticket ID to track the complaint.";
  }

  return "🙏 Thanks for reaching out. Please describe your civic issue clearly.";
}

/* ---------- CHAT API ---------- */
app.post("/chat", (req, res) => {
  const userMessage = req.body?.message;

  if (!userMessage || userMessage.trim() === "") {
    return res.json({
      reply: "⚠️ Please type something so I can help 🙂",
    });
  }

  const reply = civicBotLogic(userMessage);
  res.json({ reply });
});

/* ---------- EXPORT FOR VERCEL ---------- */
export default app;
