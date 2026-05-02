import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import './AskAI.css';

// Simulated Knowledge Base
const KNOWLEDGE_BASE = [
  {
    keywords: ["bribe", "money", "gift", "alcohol", "liquor", "pay"],
    response: "According to the Model Code of Conduct and Section 171B of the IPC, accepting or giving bribes (cash, gifts, liquor) during elections is a criminal offense punishable by up to one year in prison or a fine."
  },
  {
    keywords: ["ride", "transport", "vehicle", "car", "drop"],
    response: "The Model Code of Conduct strictly prohibits political parties or candidates from providing free transport to voters to and from the polling booth."
  },
  {
    keywords: ["religion", "caste", "temple", "mosque", "church", "communal"],
    response: "The Model Code of Conduct states that no party or candidate shall include any activity which may aggravate existing differences or create mutual hatred between different castes and communities. Places of worship cannot be used for election propaganda."
  },
  {
    keywords: ["loudspeaker", "noise", "night", "rally", "time"],
    response: "The use of loudspeakers is prohibited between 10:00 PM and 6:00 AM. Also, all public campaigning and use of loudspeakers must stop 48 hours before the end of the polling hour."
  },
  {
    keywords: ["ministers", "government", "machinery", "official"],
    response: "Ministers cannot combine their official visits with electioneering work and shall not make use of official machinery or personnel during election work."
  },
  {
    keywords: ["age", "old", "18", "who can vote", "eligibility"],
    response: "Any Indian citizen who is 18 years of age or older on the qualifying date (usually Jan 1st of the year) and registered in the electoral roll is eligible to vote."
  },
  {
    keywords: ["id", "document", "proof", "epic", "aadhaar"],
    response: "The primary document for voting is the EPIC (Voter ID card). If you don't have it, the ECI usually allows 11 alternative photo identity documents like Aadhaar, Passport, PAN Card, or Driving License, provided your name is on the voter list."
  },
  {
    keywords: ["nota", "none", "above"],
    response: "NOTA (None of the Above) allows voters to express their dissatisfaction with all candidates. If NOTA gets the highest votes, it does not lead to re-election; the candidate with the next highest votes is declared the winner."
  },
  {
    keywords: ["lost", "not in list", "missing name"],
    response: "If your name is not on the Electoral Roll, you CANNOT vote, even if you have a Voter ID card. You must verify your name on the list before polling day via the Voter Helpline App or the NVSP portal."
  },
  {
    keywords: ["dog", "pet", "animal", "cat"],
    response: "Pets are generally not allowed inside the polling booth to maintain order and decorum. Only service animals guiding persons with disabilities are permitted."
  }
];

const DEFAULT_RESPONSE = "That's a great question! As an AI expert on the Model Code of Conduct and Indian Elections, I couldn't find a specific rule matching your query in my local database. For official clarification, please check the Election Commission of India website (eci.gov.in).";

const SYSTEM_PROMPT = `You are a helpful expert assistant specializing ONLY in the Indian Electoral System, voting rules, the Model Code of Conduct, and the Election Commission of India. 
If the user's question is NOT related to Indian elections, voting, democracy, or election rules, you must respond politely saying: "I am an expert on Indian Elections. I can only answer questions related to voting rules, eligibility, the Model Code of Conduct, and the Indian Electoral System. Please ask me a relevant question." 
Keep your answers clear, concise, accurate, and easy to understand for the general public.`;

function AskAI() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hello! I am the ElectED AI Assistant. Ask me any question about voting rules, eligibility, or the Model Code of Conduct!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Default to true if API key is available in environment variables
  const [useGemini, setUseGemini] = useState(!!import.meta.env.VITE_GEMINI_API_KEY);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findLocalAnswer = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Find the best matching rule based on keyword overlap
    let bestMatch = null;
    let maxMatches = 0;

    KNOWLEDGE_BASE.forEach(rule => {
      let matches = 0;
      rule.keywords.forEach(keyword => {
        if (lowerQuery.includes(keyword)) {
          matches++;
        }
      });
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = rule;
      }
    });

    return bestMatch ? bestMatch.response : DEFAULT_RESPONSE;
  };

  const callGeminiAPI = async (query) => {
    try {
      // For Vite, environment variables are prefixed with VITE_
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API key not configured");
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [{ parts: [{ text: query }] }],
          generationConfig: {
            temperature: 0.3
          }
        })
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Gemini API Error Details:", errorDetails);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error("Invalid response format");
      }

      return text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userQuery = inputValue.trim();
    const newUserMessage = { id: Date.now(), type: 'user', text: userQuery };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    if (useGemini) {
      try {
        const responseText = await callGeminiAPI(userQuery);
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: responseText }]);
        setIsTyping(false);
      } catch (error) {
        // Fallback to local AI logic on any error
        console.log("Falling back to local rules engine...");
        const responseText = findLocalAnswer(userQuery);
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: responseText }]);
        setIsTyping(false);
      }
    } else {
      // Local AI logic (with slight delay for realism)
      setTimeout(() => {
        const responseText = findLocalAnswer(userQuery);
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: responseText }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div className="page-section ai-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Ask the <span>AI Expert</span>
      </motion.h2>

      <div className="ai-toggle-container">
        <span className="ai-toggle-label">Use Advanced AI (Gemini)</span>
        <label className="ai-toggle-switch">
          <input 
            type="checkbox" 
            checked={useGemini} 
            onChange={() => setUseGemini(!useGemini)} 
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="chat-container glass-card">
        <div className="chat-header">
          <div className="bot-avatar">
            <Bot size={28} className="text-white" />
          </div>
          <div>
            <h3>ElectED Assistant {useGemini && '(Powered by Gemini)'}</h3>
            <p className="status">Online & Ready to Help <Sparkles size={14} className="text-saffron inline-icon" /></p>
          </div>
        </div>

        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                className={`message-wrapper ${msg.type}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`message-bubble ${msg.type}`}>
                  {msg.type === 'bot' && <Bot size={16} className="bubble-icon" />}
                  {msg.type === 'user' && <User size={16} className="bubble-icon" />}
                  <p>{msg.text}</p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div 
                key="typing"
                className="message-wrapper bot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="message-bubble bot typing-bubble">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="E.g., Can someone give me a ride to vote?" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" disabled={!inputValue.trim() || isTyping} className="send-btn">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskAI;
