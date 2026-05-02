import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Users, Building2 } from 'lucide-react';
import './WhyVotingMatters.css';

const IMPACT_CARDS = [
  {
    icon: Globe2,
    title: "Shape the Future of 1.4 Billion",
    stat: "1.4B",
    desc: "Your vote contributes to deciding the leadership of the world's largest democracy, influencing global dynamics and national progress."
  },
  {
    icon: Users,
    title: "Prevent the Minority Rule",
    stat: "100%",
    desc: "Low voter turnout means a small minority decides the future for the majority. When you vote, you ensure the elected government truly represents the people's will."
  },
  {
    icon: Building2,
    title: "Every Policy Starts Here",
    stat: "1 Vote",
    desc: "Jobs, roads, schools, healthcare, and taxes. Every major decision affecting your daily life begins with the candidate you elect to office."
  }
];

function WhyVotingMatters() {
  return (
    <div className="page-section matters-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Why Your Vote <span>Matters</span>
      </motion.h2>

      <div className="matters-grid">
        {IMPACT_CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div 
              key={index}
              className="impact-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="impact-header">
                <Icon size={40} className="text-saffron" />
                <div className="impact-stat">{card.stat}</div>
              </div>
              <h3 className="impact-title">{card.title}</h3>
              <p className="impact-desc">{card.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="final-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3>Ready to make a difference?</h3>
        <p>Ensure you are registered, know your polling booth, and cast your vote in the next election.</p>
      </motion.div>
    </div>
  );
}

export default WhyVotingMatters;
