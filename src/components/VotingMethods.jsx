import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Fingerprint, ScanEye, CheckCircle2 } from 'lucide-react';
import './VotingMethods.css';

const EVM_STEPS = [
  {
    id: 1,
    title: "Verify Identity",
    icon: Fingerprint,
    desc: "The Polling Officer verifies your Voter ID or other approved ID."
  },
  {
    id: 2,
    title: "Press the Button",
    icon: ScanEye,
    desc: "Press the blue button next to your chosen candidate's name and symbol on the Ballot Unit."
  },
  {
    id: 3,
    title: "Check the VVPAT",
    icon: CheckCircle2,
    desc: "Look at the VVPAT machine. A slip will appear behind the glass for 7 seconds showing your candidate's serial number, name, and symbol."
  }
];

function VotingMethods() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="page-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How We <span>Vote</span>
      </motion.h2>

      <div className="voting-methods-container">
        {/* EVM Section */}
        <motion.div 
          className="method-card evm-section glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="method-header">
            <h3>Electronic Voting Machine (EVM) & VVPAT</h3>
            <p className="subtitle">The primary method of voting in India since 2004.</p>
          </div>

          <div className="evm-explainer">
            <div className="steps-list">
              {EVM_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                return (
                  <div 
                    key={step.id} 
                    className={`step-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="step-number">{step.id}</div>
                    <div className="step-content">
                      <h4><Icon size={18} className="step-icon" /> {step.title}</h4>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="machine-visual">
               <div className={`visual-container step-${activeStep}`}>
                  {activeStep === 0 && (
                    <motion.div className="identity-check" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Fingerprint size={80} className="text-saffron" />
                      <p>Voter ID Verification</p>
                    </motion.div>
                  )}
                  {activeStep === 1 && (
                    <motion.div className="evm-unit" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="evm-candidate-row">
                        <span>1. Candidate A</span>
                        <div className="evm-btn-press"></div>
                      </div>
                      <div className="evm-candidate-row active">
                        <span>2. Candidate B</span>
                        <div className="evm-btn-press pressing"></div>
                      </div>
                    </motion.div>
                  )}
                  {activeStep === 2 && (
                    <motion.div className="vvpat-unit" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="vvpat-window">
                        <motion.div 
                          className="vvpat-slip"
                          initial={{ y: -50 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 1 }}
                        >
                          <p>2</p>
                          <p>Candidate B</p>
                          <p>⭐</p>
                        </motion.div>
                      </div>
                      <p className="vvpat-hint">Visible for 7 seconds</p>
                    </motion.div>
                  )}
               </div>
               
               {/* Auto advance steps */}
               <div className="step-controls">
                 <button className="btn-outline" onClick={() => setActiveStep((prev) => (prev - 1 + EVM_STEPS.length) % EVM_STEPS.length)}>Prev</button>
                 <button className="btn-primary" onClick={() => setActiveStep((prev) => (prev + 1) % EVM_STEPS.length)}>Next</button>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Postal Ballot Section */}
        <motion.div 
          className="method-card postal-section ivory-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="postal-icon">
            <Mail size={40} className="text-saffron" />
          </div>
          <div className="postal-content">
            <h3>Postal Ballots</h3>
            <p>A restricted voting method using paper ballots sent by post.</p>
            <ul>
              <li><strong>Who can use it?</strong> Members of Armed Forces, officers on election duty, electors under preventive detention.</li>
              <li><strong>Recent changes:</strong> Absentee voters like senior citizens (85+ years), Persons with Disabilities (PwD), and essential service workers can now opt for postal voting at home.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VotingMethods;
