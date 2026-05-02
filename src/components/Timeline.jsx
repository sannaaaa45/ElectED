import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, ClipboardEdit, FileSignature, Users, CheckSquare, BarChart3, Trophy, ChevronRight, ChevronDown } from 'lucide-react';
import './Timeline.css';

const STEPS = [
  {
    id: 1,
    title: "Announcement",
    icon: Megaphone,
    shortDesc: "ECI announces election dates.",
    detail: "The Election Commission of India (ECI) announces the schedule. The Model Code of Conduct comes into effect immediately.",
    bgImage: "/images/parliament_bg.png"
  },
  {
    id: 2,
    title: "Voter Registration",
    icon: ClipboardEdit,
    shortDesc: "Electoral rolls are updated.",
    detail: "Citizens register to vote or update their details. The final voter list (Electoral Roll) is published before nominations begin.",
    bgImage: "/images/registration_bg.png"
  },
  {
    id: 3,
    title: "Nomination",
    icon: FileSignature,
    shortDesc: "Candidates file their papers.",
    detail: "Candidates submit their nomination papers along with an affidavit detailing their assets, liabilities, and criminal records.",
    bgImage: "/images/nomination_bg.png"
  },
  {
    id: 4,
    title: "Campaigning",
    icon: Users,
    shortDesc: "Parties rally for votes.",
    detail: "Candidates campaign through rallies, door-to-door visits, and media. Campaigning strictly ends 48 hours before polling.",
    bgImage: "/images/rally_bg.png"
  },
  {
    id: 5,
    title: "Voting Day",
    icon: CheckSquare,
    shortDesc: "Citizens cast their vote.",
    detail: "Voters go to their designated polling stations and cast their votes secretly using Electronic Voting Machines (EVMs).",
    bgImage: "/images/evm_bg.png"
  },
  {
    id: 6,
    title: "Counting",
    icon: BarChart3,
    shortDesc: "EVMs are opened and counted.",
    detail: "Under tight security, EVMs are brought to counting centers. Votes are tallied in the presence of candidate representatives.",
    bgImage: "/images/counting_bg.png"
  },
  {
    id: 7,
    title: "Results",
    icon: Trophy,
    shortDesc: "Winners are declared.",
    detail: "The candidate with the highest number of valid votes in a constituency is declared the winner by the Returning Officer.",
    bgImage: "/images/results_bg.png"
  }
];

function Timeline() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <div className="timeline-dynamic-bg-wrapper">
        <AnimatePresence>
          <motion.div
            key={activeStep}
            className="timeline-dynamic-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              backgroundImage: `linear-gradient(rgba(10, 22, 40, 0.6), rgba(10, 22, 40, 0.8)), url(${STEPS[activeStep - 1].bgImage})` 
            }}
          />
        </AnimatePresence>
      </div>

      <div className="page-section timeline-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
        The Election <span>Timeline</span>
      </motion.h2>

      <div className="timeline-container">
        {/* Horizontal Timeline Track */}
        <div className="timeline-track-container">
          <div className="timeline-line"></div>
          <div className="timeline-nodes">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              const isPast = activeStep > step.id;

              return (
                <div 
                  key={step.id}
                  className={`timeline-node-wrapper ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className="timeline-node">
                    <Icon size={20} />
                  </div>
                  <span className="timeline-step-title">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Information Area */}
        <div className="timeline-details-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              className="timeline-detail-card ivory-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="detail-header">
                <div className="detail-icon-bg">
                  {React.createElement(STEPS[activeStep - 1].icon, { size: 40, className: 'text-saffron' })}
                </div>
                <div>
                  <h3 className="detail-title">Step {activeStep}: {STEPS[activeStep - 1].title}</h3>
                  <p className="detail-short">{STEPS[activeStep - 1].shortDesc}</p>
                </div>
              </div>
              
              <div className="detail-content">
                <p>{STEPS[activeStep - 1].detail}</p>
              </div>

              <div className="detail-nav">
                <button 
                  className="btn-outline"
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  style={{ opacity: activeStep === 1 ? 0.5 : 1, cursor: activeStep === 1 ? 'not-allowed' : 'pointer' }}
                >
                  Previous
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => setActiveStep(Math.min(STEPS.length, activeStep + 1))}
                  disabled={activeStep === STEPS.length}
                  style={{ opacity: activeStep === STEPS.length ? 0.5 : 1, cursor: activeStep === STEPS.length ? 'not-allowed' : 'pointer' }}
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Mobile Accordion View */}
        <div className="timeline-mobile-accordion">
           {STEPS.map((step) => {
             const isActive = activeStep === step.id;
             const Icon = step.icon;
             
             return (
               <div key={step.id} className={`accordion-item ${isActive ? 'active' : ''}`}>
                 <div 
                   className="accordion-header"
                   onClick={() => setActiveStep(step.id)}
                 >
                   <div className="accordion-title-group">
                     <div className="accordion-icon"><Icon size={20} /></div>
                     <span>{step.id}. {step.title}</span>
                   </div>
                   {isActive ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                 </div>
                 
                 <AnimatePresence>
                   {isActive && (
                     <motion.div 
                       className="accordion-content"
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                     >
                       <p className="font-bold mb-2">{step.shortDesc}</p>
                       <p>{step.detail}</p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             )
           })}
        </div>
      </div>
      </div>
    </>
  );
}

export default Timeline;
