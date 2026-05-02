import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, User, Users, BadgeCheck, FileBadge, ShieldHalf } from 'lucide-react';
import './Roles.css';

const ROLES = [
  {
    id: 1,
    icon: Landmark,
    title: "Election Commission of India (ECI)",
    desc: "Autonomous constitutional authority responsible for administering election processes in India at national and state level."
  },
  {
    id: 2,
    icon: User,
    title: "Voter",
    desc: "Any Indian citizen aged 18+ registered in the electoral roll. The most important player in the democracy."
  },
  {
    id: 3,
    icon: Users,
    title: "Political Party / Candidate",
    desc: "Individuals or groups who present policies and compete for votes to represent the people in government."
  },
  {
    id: 4,
    icon: BadgeCheck,
    title: "Returning Officer (RO)",
    desc: "Statutory authority appointed by ECI to conduct elections in a specific constituency and declare the result."
  },
  {
    id: 5,
    icon: ShieldHalf,
    title: "Presiding Officer",
    desc: "In charge of a polling booth. Ensures free and fair voting and maintains order inside the polling station."
  },
  {
    id: 6,
    icon: FileBadge,
    title: "Polling Agent",
    desc: "Appointed by candidates to be present at the polling booth to ensure fair voting and verify voter identities."
  }
];

function Roles() {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Roles & <span>Key Players</span>
      </motion.h2>

      <div className="roles-grid">
        {ROLES.map((role, index) => {
          const Icon = role.icon;
          const isFlipped = flipped[role.id];

          return (
            <motion.div 
              key={role.id}
              className="flip-card-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleFlip(role.id)}
            >
              <motion.div 
                className="flip-card-inner"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Front */}
                <div className="flip-card-front glass-card">
                  <div className="role-icon-wrapper">
                    <Icon size={40} className="text-saffron" />
                  </div>
                  <h3 className="role-title">{role.title}</h3>
                  <div className="tap-hint">Tap to flip</div>
                </div>

                {/* Back */}
                <div className="flip-card-back ivory-card">
                  <h3 className="role-title-back">{role.title}</h3>
                  <p className="role-desc">{role.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Roles;
