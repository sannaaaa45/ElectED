import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, CheckCircle2, RotateCcw, MonitorPlay } from 'lucide-react';
import './MockSimulator.css';

const CANDIDATES = [
  { id: 1, name: "Aarav Sharma", party: "Progressive Party", symbol: "🌟" },
  { id: 2, name: "Priya Patel", party: "Development Front", symbol: "🚲" },
  { id: 3, name: "Rahul Singh", party: "National Coalition", symbol: "🌺" },
  { id: 4, name: "NOTA", party: "None of the Above", symbol: "❌" }
];

function MockSimulator() {
  const [step, setStep] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [vvpatTimer, setVvpatTimer] = useState(7);
  const [showVvpat, setShowVvpat] = useState(false);

  // Auto advance from VVPAT to End Screen after 7 seconds
  useEffect(() => {
    let timer;
    if (step === 3 && vvpatTimer > 0) {
      timer = setTimeout(() => setVvpatTimer(v => v - 1), 1000);
    } else if (step === 3 && vvpatTimer === 0) {
      setStep(4);
    }
    return () => clearTimeout(timer);
  }, [step, vvpatTimer]);

  const handleVote = (candidateId) => {
    setSelectedCandidate(CANDIDATES.find(c => c.id === candidateId));
    setStep(3); // Go to VVPAT step
    setShowVvpat(true);
    setVvpatTimer(7);
  };

  const resetSimulator = () => {
    setStep(0);
    setSelectedCandidate(null);
    setShowVvpat(false);
  };

  return (
    <div className="page-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Mock Vote <span>Simulator</span>
      </motion.h2>

      <div className="simulator-container glass-card">
        <div className="sim-progress">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`sim-dot ${step >= i ? 'active' : ''}`} />
          ))}
        </div>

        <div className="sim-screen-container">
          <AnimatePresence mode="wait">
            
            {/* Step 0: Welcome */}
            {step === 0 && (
              <motion.div 
                key="step0"
                className="sim-screen center-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <MonitorPlay size={64} className="text-saffron mb-4" />
                <h3>Welcome to the Polling Booth</h3>
                <p>Experience how voting works on an Indian Electronic Voting Machine (EVM).</p>
                <button className="btn-primary mt-4" onClick={() => setStep(1)}>Enter Booth</button>
              </motion.div>
            )}

            {/* Step 1: Verification */}
            {step === 1 && (
              <motion.div 
                key="step1"
                className="sim-screen center-content"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <Fingerprint size={64} className="text-muted mb-4" />
                <h3>Verify Identity</h3>
                <p>The polling officer checks your name on the electoral roll and verifies your ID.</p>
                <div className="sim-action-area">
                  <button className="btn-primary" onClick={() => setStep(2)}>Show ID & Proceed</button>
                </div>
              </motion.div>
            )}

            {/* Step 2: The EVM */}
            {step === 2 && (
              <motion.div 
                key="step2"
                className="sim-screen"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="evm-header">
                  <h3>Ballot Unit</h3>
                  <p>Press the blue button next to your choice.</p>
                </div>
                
                <div className="evm-machine">
                  {CANDIDATES.map((c) => (
                    <div key={c.id} className="evm-row-interactive">
                      <div className="c-number">{c.id}</div>
                      <div className="c-info">
                        <span className="c-name">{c.name}</span>
                        <span className="c-party">{c.party}</span>
                      </div>
                      <div className="c-symbol">{c.symbol}</div>
                      <div className="c-action">
                        <div className="evm-light"></div>
                        <button className="evm-blue-btn" onClick={() => handleVote(c.id)}></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: VVPAT */}
            {step === 3 && (
              <motion.div 
                key="step3"
                className="sim-screen center-content"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h3>Check the VVPAT</h3>
                <p>Verify your vote on the printed slip behind the glass.</p>
                
                <div className="vvpat-machine-large">
                  <div className="vvpat-window-large">
                    {showVvpat && (
                      <motion.div 
                        className="vvpat-slip-large"
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <div className="slip-no">{selectedCandidate?.id}</div>
                        <div className="slip-name">{selectedCandidate?.name}</div>
                        <div className="slip-symbol">{selectedCandidate?.symbol}</div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <div className="timer-badge">
                  Disappears in: <span className="text-saffron font-bold">{vvpatTimer}s</span>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div 
                key="step4"
                className="sim-screen center-content success-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle2 size={80} className="text-success mb-4" />
                </motion.div>
                <h3>Your vote has been counted!</h3>
                <p>In a real election, the Presiding Officer's control unit records your vote securely.</p>
                
                <button className="btn-outline mt-6 flex-center" onClick={resetSimulator}>
                  <RotateCcw size={18} style={{ marginRight: '8px' }} /> Vote Again
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default MockSimulator;
