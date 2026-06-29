# Nagrik – AI Powered Smart Civic Platform

> An AI-powered civic issue management platform that enables citizens to report, track, and resolve community issues through intelligent automation and a multi-agent AI architecture.

## Live Demo

**Deployed Application:**  
https://nagrik-928797162550.asia-south1.run.app/

**Demo Video:**  
https://drive.google.com/file/d/1g6e3H4Lonv71yB7gjrFOUYvKhK3dUrXF/view?usp=sharing

---

## Problem

Communities frequently face issues such as potholes, water leakages, damaged streetlights, overflowing garbage, sewage blockages, and deteriorating public infrastructure. Existing complaint systems are often fragmented, difficult to track, and lack transparency.

Nagrik transforms traditional complaint portals into an AI-powered civic intelligence platform by automating issue understanding, department routing, complaint tracking, and government analytics.

---

# Features

### AI Civic Assistant
- Natural language interaction using voice or text
- Supports English and Hindi
- AI-powered complaint generation

### Vision AI Issue Detection
- Upload an image to report an issue
- Automatic issue detection using Vision Language Models
- AI-generated complaint title and description

### Autonomous Complaint Routing
- Automatic department prediction
- AI-powered priority assignment
- Community upvotes influence complaint priority
- Intelligent complaint delegation

### Government Complaint Management
- Real-time complaint dashboard
- Department-wise filtering
- Status updates
- Progress notes
- Manual department reassignment

### Live Complaint Tracking
- Submitted
- Assigned
- In Progress
- Resolved

### Interactive Ward Map
- Geo-tagged complaints
- Real-time status visualization
- Issue-wise filtering
- Ward-level insights

### Government Analytics Dashboard
- Ward-wise statistics
- Department performance
- Resolution trends
- Priority queue monitoring
- Export analytics as PDF

### Gamification
- Citizen points
- Badges
- Achievements
- Community engagement

---

# Multi-Agent AI Architecture

### Agent 1 — Citizen Understanding Agent
- Processes text and voice inputs
- Speech-to-Text conversion
- Understands citizen intent
- Generates structured complaints

### Agent 2 — Vision Intelligence Agent
- Vision Language Model (VLM)
- Image understanding
- Issue categorization
- AI-generated complaint details

### Agent 3 — Autonomous Routing & Priority Agent
- Department prediction
- Priority assignment
- AI severity analysis
- Community upvote prioritization
- Automatic complaint delegation

### Agent 4 — Civic Analytics Agent
- Dashboard generation
- Department analytics
- Trend detection
- Hotspot identification
- Exportable PDF reports

---

# Workflow

```
Citizen
      │
      ▼
AI Assistant (Voice/Text)
      OR
Image Upload
      │
      ▼
Citizen Understanding Agent
      │
      ▼
Vision Intelligence Agent
      │
      ▼
Autonomous Routing & Priority Agent
      │
      ▼
Supabase Database
      │
      ├──────────────► Government Portal
      │                   │
      │                   ├── Update Status
      │                   ├── Add Notes
      │                   └── Reassign Department
      │
      ├──────────────► Civic Analytics Agent
      │                   │
      │                   ├── Dashboards
      │                   ├── Trends
      │                   ├── Hotspots
      │                   └── PDF Reports
      │
      └──────────────► Citizen Timeline
                          │
                          ├── Submitted
                          ├── Assigned
                          ├── In Progress
                          └── Resolved

                 ↓

          Gamification
      (Points • Badges • Achievements)
```

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript
- React Router

## Backend
- Node.js
- Express.js

## AI / ML
- Python
- FastAPI
- OpenCV
- Vision Language Models (VLM)
- Hugging Face Transformers
- PyTorch
- Speech-to-Text
- Pickle (.pkl) Issue Embeddings

## Database & Authentication
- Supabase
- Clerk Authentication

## Deployment
- Docker
- Google Cloud Run

---

# Google Cloud Services

- Google Cloud Run
- Google Cloud Build
- Artifact Registry

---

# Project Structure

```
Nagrik/
│
├── client/          # React Frontend
├── server/          # Node.js Backend
├── vlm_service/     # FastAPI AI Service
│
├── README.md
└── docker-compose.yml
```

---

# Future Scope

- Duplicate complaint detection
- Predictive infrastructure maintenance
- Push notifications
- Community verification
- Multi-city deployment
- Offline complaint reporting

---


# License

This project is licensed under the MIT License.
