# 🗳️ ElectED - Shape Your Future

ElectED is an interactive, cinematic educational platform designed to demystify the Indian Election process. Built with modern web technologies, it transforms complex civic procedures into an engaging, story-driven experience for users of all ages.

## ✨ Features

- **Interactive Election Timeline:** A step-by-step visual journey through the election process featuring dynamic, cinematic background transitions using Framer Motion.
- **Hybrid AI "Ask an Expert" Chatbot:**
  - Powered by the **Google Gemini API** (`gemini-2.5-flash`).
  - **Fail-Safe Architecture:** Silently falls back to a local, keyword-based knowledge engine if the API is unavailable, ensuring 100% uptime.
  - **Domain Restricted:** Custom system prompts strictly limit the AI to answering Indian election-related questions, maintaining focus and neutrality.
- **Cinematic UI/UX:** A dark-mode, glassmorphism-inspired design with custom typography and subtle micro-animations that make learning feel premium and engaging.
- **Comprehensive Educational Modules:** Sections covering Voting Methods, Eligibility Rules, Roles & Players, Myths vs Facts, and a Mock Vote Simulator.
- **Knowledge Assessment:** Built-in interactive quiz to test user comprehension.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI Integration:** Google Gemini REST API (Native Fetch)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key (Get one [here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sannaaaa45/ElectED.git
   cd "election edu"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🧠 Architecture Highlights

### The Hybrid AI Fallback System
To ensure a robust user experience, the Ask AI component (`AskAI.jsx`) features a fail-safe design. When a user submits a question:
1. The app first attempts to securely call the Google Gemini API using native fetch.
2. If the user is offline, the API key is missing, or rate limits are hit, the `try/catch` block immediately catches the error.
3. The app silently hands the query over to `findLocalAnswer()`—a fallback keyword-matching algorithm that queries a local `KNOWLEDGE_BASE` object.
4. The user receives a seamless response without ever seeing an error state.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
