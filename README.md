# 🇮🇳 Nagrik – AI-Powered Smart Civic Platform

**Nagrik** a smart civic assistance platform that makes it easy for citizens to report local problems and helps government departments manage, analyze and resolve complaints efficiently using **AI-powered assistance**.

The platform integrates a modern web interface, backend services and an AI system that includes **voice-based issue transcription and image understanding**.

---

## ✨ Key Features

- 📸 **Image-based Complaint Reporting**
- 🎙️ **Voice Assistant for Issue Transcription**
- 🤖 **AI-assisted Issue Understanding**
- 🏢 **Autonomous AI Delegation to Relevant Government Departments**
- 🔄 **Manual Department Reassignment by Authorities**
- 📊 **Department-wise Complaint Management Dashboard**
- 🕒 **Detailed Complaint Timeline Tracking**
- 🧠 **Vision Language Model (VLM) Integration**

---

## 🧱 Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express.js**
- **REST APIs**

### AI / ML Services
- **Python**
- **FastAPI**
- **OpenCV**
- **Vision Language Models (VLM)**
- **Voice-based Speech-to-Text Transcription**
- **Pickle (.pkl) Issue Embeddings**

### Deployment
- **Vercel (Client & Server)**
- **Render(VLM Service)**

---

## 📁 Project Structure
```bash
Nagrik/
│
├── client/ # Frontend (React + Vite)
│ ├── public/
│ ├── src/
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── vercel.json
│
├── server/ # Backend (Node + Express)
│ ├── server.js
│ ├── package.json
│ └── vercel.json
│
├── vlm_service/ # AI Services (Vision + Voice)
│ ├── main.py
│ ├── issues.pkl
│ ├── requirements.txt
│ └── pycache/
│
└── README.md
```
---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/nagrik.git
cd nagrik
```
### 1️⃣ Clone the Repository
```bash
cd client
npm install
npm run dev
```
3️⃣ Backend Setup (Server)
```bash
cd server
npm install
node server.js
```
4️⃣ AI Service Setup (VLM + Voice Assistant)
```bash
cd vlm_service
pip install -r requirements.txt
uvicorn main:app --reload
```

---
## 🎙️ Voice Assistant – How It Works

1. The citizen describes the issue using **voice input**
2. Audio is processed by a **Speech-to-Text model**
3. Transcribed text is analyzed by the **AI assistant**
4. Relevant **issue category and department** are inferred
5. A complaint is created with **structured and clean input**

---

## 🧠 AI Issue Understanding Flow

1. **Image + Voice/Text input** is received
2. A **Vision Language Model (VLM)** analyzes the image
3. Text embeddings are matched using `issues.pkl`
4. The **best-fit issue type and department** are predicted
5. The complaint is **autonomously forwarded** to the appropriate department

---

## 👩‍💻 Team

**DraftMinds**  
A collaborative team project focused on building AI-powered civic-tech solutions.

---


