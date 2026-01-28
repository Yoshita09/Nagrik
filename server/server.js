import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors({
  origin: "http://localhost:5173", // change if different
}));
app.use(express.json());

/* ---------- OPENAI ---------- */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ---------- TICKET GENERATOR ---------- */
function generateTicket() {
  return `2024-${Math.floor(1000 + Math.random() * 9000)}`;
}

/* ---------- CIVIC LOGIC ---------- */
function civicBotLogic(message = "") {
  const text = message.toLowerCase();

  if (text.includes("pothole") || text.includes("road") || text.includes("gaddha")) {
    return `
📍 **Issue:** Pothole / Road Damage  
🏢 **Department:** Roads & Infrastructure  
⚠️ **Priority:** High  

Please share:
1️⃣ Location  
2️⃣ Severity  
3️⃣ Photo (optional)

✅ **Ticket ID:** TKT-${generateTicket()}
`;
  }

  if (text.includes("streetlight") || text.includes("light")) {
    return `
💡 **Issue:** Streetlight Not Working  
🏢 **Department:** Electrical  
⚠️ **Priority:** Medium  

Please provide location.

✅ **Ticket ID:** TKT-${generateTicket()}
`;
  }

  if (text.includes("garbage") || text.includes("trash")) {
    return `
🗑️ **Issue:** Garbage Overflow  
🏢 **Department:** Sanitation  
⚠️ **Priority:** High  

Please share location.

✅ **Ticket ID:** TKT-${generateTicket()}
`;
  }

  if (text.includes("water") || text.includes("leak")) {
    return `
💧 **Issue:** Water Leakage  
🏢 **Department:** Water Supply  
⚠️ **Priority:** High  

Please share location.

✅ **Ticket ID:** TKT-${generateTicket()}
`;
  }

  if (text.includes("track")) {
    return "🔍 Please provide your **Ticket ID** to track the complaint.";
  }

  return null;
}

/* ---------- CHAT API ---------- */
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body?.message;

    if (!userMessage || userMessage.trim() === "") {
      return res.json({
        reply: "⚠️ Please say or type something so I can help you 🙂",
      });
    }

    console.log("🗣 User:", userMessage);

    // 1️⃣ Civic rule-based logic
    const civicReply = civicBotLogic(userMessage);
    if (civicReply) {
      return res.json({ reply: civicReply });
    }

    // 2️⃣ AI fallback
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an Indian civic assistant helping users with municipal services in simple language.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const aiReply =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't understand that.";

    res.json({ reply: aiReply });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({
      reply: "⚠️ Something went wrong. Please try again later.",
    });
  }
});

/* ---------- SERVER ---------- */
app.listen(3000, () => {
  console.log("🚀 Civic AI Server running at http://localhost:3000");
});