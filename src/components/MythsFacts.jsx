import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import './MythsFacts.css';

const MYTHS_DATA = [
  {
    id: 1,
    myth: "My single vote won't make a difference anyway.",
    fact: "In 2008, a Rajasthan Assembly election was decided by ONE single vote! Every vote counts and cumulative low turnout allows a minority to decide for the majority."
  },
  {
    id: 2,
    myth: "EVMs can be easily hacked via Bluetooth or Wi-Fi.",
    fact: "EVMs are standalone machines with NO wireless communication capabilities. They cannot connect to Bluetooth, Wi-Fi, or the internet, making remote hacking impossible."
  },
  {
    id: 3,
    myth: "If I don't vote, I'll lose my bank account or citizenship.",
    fact: "Voting is a constitutional right, not a mandatory duty under threat of penalty. You will not lose any citizenship rights or bank accounts for not voting."
  },
  {
    id: 4,
    myth: "It's okay to accept gifts/money from candidates, I'll just vote for someone else.",
    fact: "Accepting bribes (cash, liquor, gifts) for voting is a criminal offense under Section 171B of the IPC, punishable by imprisonment for up to one year, a fine, or both."
  },
  {
    id: 5,
    myth: "Pressing NOTA means my vote is wasted.",
    fact: "NOTA (None of the Above) ensures your right not to vote for any candidate while still exercising your franchise. It signals a rejection of all candidates to political parties."
  },
  {
    id: 6,
    myth: "I can vote anywhere in India if I have an Aadhaar card.",
    fact: "No, you can only vote in the constituency where you are registered on the Electoral Roll. Aadhaar can be used as an identity proof, but voter registration is mandatory."
  },
  {
    id: 7,
    myth: "If someone already cast my vote, I can't vote anymore.",
    fact: "If you find someone has impersonated you and voted, you can ask for a 'Tendered Ballot Paper' from the Presiding Officer after proving your identity."
  },
  {
    id: 8,
    myth: "My family member can vote on my behalf (Proxy voting).",
    fact: "Proxy voting is strictly illegal for regular citizens. You must be physically present to cast your vote (exceptions exist only for certain service voters like armed forces)."
  },
  {
    id: 9,
    myth: "EVMs don't work without electricity.",
    fact: "EVMs run on special battery packs, not on grid electricity. This allows them to function flawlessly even in the most remote areas with no power supply."
  },
  {
    id: 10,
    myth: "Polling officers know who I voted for.",
    fact: "Voting is completely secret. The EVM does not record your name against your vote, and the VVPAT slip drops into a sealed box."
  }
];

function MythsFacts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MYTHS_DATA.length);
    }, 300);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + MYTHS_DATA.length) % MYTHS_DATA.length);
    }, 300);
  };

  return (
    <div className="page-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Myths vs <span>Facts</span>
      </motion.h2>

      <div className="myths-container">
        <p className="swipe-hint">Tap the card to reveal the truth</p>

        <div className="myth-card-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="myth-flip-inner"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, rotateY: isFlipped ? 180 : 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Myth Side (Front) */}
              <div className="myth-side myth-front">
                <div className="myth-badge myth-red">
                  <XCircle size={24} /> <span>MYTH</span>
                </div>
                <h3 className="myth-text">"{MYTHS_DATA[currentIndex].myth}"</h3>
                <div className="tap-icon"><RefreshCw size={24} /></div>
              </div>

              {/* Fact Side (Back) */}
              <div className="myth-side myth-back">
                <div className="myth-badge myth-green">
                  <CheckCircle2 size={24} /> <span>FACT</span>
                </div>
                <h3 className="fact-text">{MYTHS_DATA[currentIndex].fact}</h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="myth-controls">
          <button className="btn-outline" onClick={prevCard}>Previous</button>
          <div className="myth-dots">
            {MYTHS_DATA.map((_, i) => (
              <span key={i} className={`myth-dot ${i === currentIndex ? 'active' : ''}`} />
            ))}
          </div>
          <button className="btn-primary" onClick={nextCard}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default MythsFacts;
