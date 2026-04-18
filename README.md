# PrepGrid — AI-Powered Interview & Practice Platform

PrepGrid is an advanced, full-stack placement preparation platform designed to help engineering students master technical interviews. By leveraging AI-driven mock tests, real-time coding environments, and performance-based feedback, PrepGrid provides a comprehensive ecosystem for career readiness.

## 🎯 Problem Statement 1 Compliance

This project was built to address the **#26ENPRE1: Problem Statement 1** from the DevFusion Hackathon. Below is a status report on the core features:

### 💻 Practice Module
| Requirement | Status | Implementation Detail |
| :--- | :---: | :--- |
| Coding bank (3 difficulty levels) | ✅ | `Easy`, `Medium`, `Hard` supported in Schema & Dashboard. |
| In-browser code editor | ✅ | Integrated **Monaco Editor** with multi-language support. |
| Judge0 API Integration | ✅ | Live execution and test case validation via Judge0. |
| Topic-wise filtering | ✅ | Sidebar filtering for Arrays, Strings, Trees, DP, etc. |
| Bookmarking & Solved tracking | 🟡 | Solved status is tracked in DB; Bookmark backend is live. |

### 🤖 AI Interview Module
| Requirement | Status | Implementation Detail |
| :--- | :---: | :--- |
| Role-based mock interview | ✅ | Frontend/Backend/DSA roles supported with adaptive logic. |
| Speech/Text evaluation | ✅ | Integrated STT and AI scoring for comprehensive feedback. |
| Session History | ✅ | Transcripts and performance metrics stored in MongoDB. |
| RAG Support (Bonus) | ✅ | **Pinecone Vector DB** integration for historical context retrieval. |

### 📝 AI Test / Quiz Module
| Requirement | Status | Implementation Detail |
| :--- | :---: | :--- |
| Timed MCQ generation | ✅ | Dynamic topic-based quiz generation via Gemini AI. |
| AI evaluation for short answers| ✅ | Evaluates technical accuracy of open-ended responses. |
| Leaderboard | ✅ | Global scoring system for competitive tracking. |

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Framer Motion, Monaco Editor.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Atlas), Pinecone (Vector Database for RAG).
- **AI Engine:** Google Gemini AI (Text Generation + Embeddings).
- **Infrastructure:** Clerk (Auth), Razorpay (Payments), Judge0 (Execution).

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas & Pinecone Index
- Clerk, Gemini, and Razorpay API Keys

### 2. Backend Setup
```bash
cd server
npm install
# Configure .env using .env.example
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
# Configure .env using .env.example
npm run dev
```

## 🛡️ Production & Security
- **Hardened Auth:** Uses `ClerkExpressWithAuth` for robust session validation.
- **CORS Management:** Strict origin whitelisting for secure production deployment.
- **Error Handling:** Centralized middleware for graceful failure management.

## 📄 License
This project is part of the **DevFusion Hackathon** submission.
