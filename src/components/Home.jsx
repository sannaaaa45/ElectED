import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react';
import './Home.css';

function Home({ onNavigate, visitedCount, totalCount }) {
  const isComplete = visitedCount === totalCount;
  
  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-section">
        <motion.div 
          className="badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ShieldCheck size={16} /> Indian Election Education
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Understand Your Vote.<br />
          <span className="text-saffron">Shape Your Future.</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          A simple, interactive guide to how democracy works in the world's largest democracy. Perfect for first-time voters.
        </motion.p>
        
        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button 
            className="btn-primary flex-center"
            onClick={() => onNavigate('what-is-election')}
          >
            Start Learning <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>
          <button 
            className="btn-outline flex-center"
            onClick={() => onNavigate('simulator')}
          >
            <PlayCircle size={18} style={{ marginRight: '8px' }} /> Try Simulator
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {/* Abstract representation of EVM / Ballot box */}
        <div className="evm-illustration">
          <div className="evm-screen"></div>
          <div className="evm-buttons">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="evm-row">
                <div className="evm-light"></div>
                <div className="evm-btn"></div>
              </div>
            ))}
          </div>
          <motion.div 
            className="vote-slip"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          >
            VOTE
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="progress-card glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="progress-card-header">
          <h3>Your Learning Journey</h3>
          <span className="status-badge">
            {isComplete ? 'Completed!' : `${visitedCount} / ${totalCount} Sections`}
          </span>
        </div>
        
        <div className="progress-bar-large">
          <div 
            className="progress-fill-large" 
            style={{ width: `${(visitedCount / totalCount) * 100}%` }}
          ></div>
        </div>
        
        <p className="progress-hint">
          {isComplete 
            ? "Great job! You're ready to make an informed decision at the polls."
            : "Explore all sections using the navigation menu to become an Election Expert."}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Home;
