import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Users, ScrollText } from 'lucide-react';
import './WhatIsElection.css';

const CARDS = [
  {
    icon: Landmark,
    title: "What is an Election?",
    description: "A formal group decision-making process where a population chooses individuals to hold public office."
  },
  {
    icon: Users,
    title: "Why it Matters",
    description: "It gives citizens the power to hold leaders accountable and shape the direction of their community and country."
  },
  {
    icon: ScrollText,
    title: "Types of Elections",
    description: "General (Lok Sabha), State (Vidhan Sabha), Local (Panchayat/Municipal), and By-elections."
  }
];

function WhatIsElection() {
  return (
    <div className="page-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        The Foundation of <span>Democracy</span>
      </motion.h2>

      <div className="cards-grid">
        {CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div 
              key={index}
              className="info-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="card-icon-wrapper">
                <Icon size={32} className="text-saffron" />
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default WhatIsElection;
