# 🎯 Unfumble.AI: AI-Engineer Learning Checklist

This checklist is mapped directly to the tech stack used in the **Unfumble.AI** project. Use this to track your progress as you master the advanced features beyond the MERN stack.

---

## 🧠 Phase 1: The AI Brain (Gemini & LangChain)
*Focus: How the app generates questions and evaluates answers.*

- [ ] **Google Generative AI SDK**
  - [ ] Initialize Gemini with API Keys
  - [ ] Content Generation (Text-to-Text)
  - [ ] Handling JSON mode (`responseMimeType: "application/json"`)
  - [ ] Managing safety settings and filters
- [ ] **LangChain Fundamentals**
  - [ ] Understanding Prompts & Templates
  - [ ] Output Parsers (Extracting clean JSON from AI)
  - [ ] Chains (Linking multiple AI steps together)

**📺 Recommended Video:** [Leon van Zyl - Gemini API Crash Course](https://youtu.be/Z8F6FvMrN4o)

---

## 💾 Phase 2: Long-Term Memory (RAG & Pinecone)
*Focus: How the AI remembers your resume and past interview history.*

- [ ] **Vector Embeddings**
  - [ ] What are Embeddings? (Turning text into math/vectors)
  - [ ] Using `GoogleGenerativeAIEmbeddings`
- [ ] **Pinecone Vector Database**
  - [ ] Creating Indexes and Namespaces
  - [ ] Upserting (Saving) vectors to the database
  - [ ] Similarity Search (Retrieving relevant past context)
- [ ] **RAG (Retrieval-Augmented Generation)**
  - [ ] The RAG Workflow: Retrieve -> Augment -> Generate
  - [ ] Implementing RAG to make Gemini "Resume-Aware"

**📺 Recommended Videos:** [JS Mastery - RAG Explained](https://youtu.be/B9mRMw0Jhfo) & [Greg Hogg - Pinecone Tutorial](https://youtu.be/1EookJWbvQM)

---

## ⚙️ Phase 3: The Interview Brain (XState)
*Focus: How the interview flows logically (Easy -> Medium -> Hard).*

- [ ] **Finite State Machines (FSM)**
  - [ ] States (Initial, Parallel, Final)
  - [ ] Events & Transitions (Moving between states)
- [ ] **XState v5 Mastery**
  - [ ] `createMachine` configuration
  - [ ] `context` (Storing the interview score/index)
  - [ ] `guards` (Conditionals: "Only move to Medium if Score > 3")
  - [ ] `actions` (Side effects: Updating scores)

**📺 Recommended Playlist:** [Frontend Masters - XState Playlist](https://youtube.com/playlist?list=PLvWgkXBB3dd4ocSi17y1JmMmz7S5cV8vI)

---

## 🚀 Phase 4: Background Workers (BullMQ & Redis)
*Focus: Processing heavy AI tasks without slowing down the UI.*

- [ ] **Redis Fundamentals**
  - [ ] Installing/Connecting to Redis
  - [ ] Redis as a message broker
- [ ] **BullMQ Architecture**
  - [ ] Producers (Adding jobs to the queue)
  - [ ] Workers/Consumers (Processing jobs in the background)
  - [ ] Handling job completion and failure events

**📺 Recommended Playlist:** [BullMQ/Redis Tutorial Playlist](https://youtube.com/playlist?list=PLlfxGbI3nzMJpuNkQxlgg5SEjDbltepC-)

---

## 🎙️ Phase 5: Voice & Interactive UI
*Focus: Making the interview feel real and "live".*

- [ ] **Web Speech API**
  - [ ] `SpeechRecognition` (Turning your voice into text)
  - [ ] `SpeechSynthesis` (Making the AI speak)
- [ ] **Framer Motion**
  - [ ] Layout Animations
  - [ ] `AnimatePresence` for entrance/exit effects
  - [ ] Gesture animations (Hover/Tap)

**📺 Recommended Video:** [Web Speech API Tutorial](https://youtu.be/KRhvlB1mOts)

---

## 🔐 Phase 6: Modern Auth (Clerk)
*Focus: Fast, secure user management.*

- [ ] **Clerk Integration**
  - [ ] Setting up the `<ClerkProvider />`
  - [ ] `useAuth` and `useUser` hooks
  - [ ] Protecting Backend Routes with Clerk Middleware

---

## ✅ Final Project Milestone
- [ ] I can explain how a Resume PDF becomes a vector in Pinecone.
- [ ] I can explain why the Interview moves from Easy to Medium.
- [ ] I can explain how the Background Worker prevents API timeouts.
- [ ] I am ready to build my own AI SaaS! 🚀
