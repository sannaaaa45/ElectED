import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Edit3, FileText, AlertTriangle } from 'lucide-react';
import './EligibilityRules.css';

function EligibilityRules() {
  return (
    <div className="page-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Eligibility & <span>Rules</span>
      </motion.h2>

      <div className="rules-grid">
        {/* Checklist Section */}
        <motion.div 
          className="checklist-card glass-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="card-heading">Voting Checklist</h3>
          
          <div className="checklist-item">
            <div className="checklist-icon"><UserCheck size={24} /></div>
            <div className="checklist-text">
              <h4>Who can vote?</h4>
              <p>Must be an Indian citizen, 18 years of age or older on the qualifying date (usually Jan 1st of the year), and a resident of the polling area.</p>
            </div>
          </div>

          <div className="checklist-item">
            <div className="checklist-icon"><Edit3 size={24} /></div>
            <div className="checklist-text">
              <h4>How to register?</h4>
              <p>Apply via Form 6 online (NVSP portal / Voter Helpline App) or offline through your local Booth Level Officer (BLO).</p>
            </div>
          </div>

          <div className="checklist-item">
            <div className="checklist-icon"><FileText size={24} /></div>
            <div className="checklist-text">
              <h4>Documents Needed</h4>
              <p>EPIC (Voter ID card) is primary. If unavailable, ECI allows alternative photo IDs like Aadhaar, PAN, Passport, or Driving License.</p>
            </div>
          </div>
        </motion.div>

        {/* MCC Section */}
        <motion.div 
          className="mcc-card ivory-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mcc-header">
            <AlertTriangle size={32} className="text-saffron" />
            <h3>Model Code of Conduct</h3>
          </div>
          <p className="mcc-subtitle">A set of guidelines issued by the ECI to regulate political parties and candidates prior to elections.</p>
          
          <ul className="mcc-list">
            <li>
              <strong>No New Schemes:</strong> The ruling party cannot announce new financial grants, projects, or schemes that may influence voters.
            </li>
            <li>
              <strong>Fair Campaigning:</strong> No party can use religious places for campaign platforms or appeal to caste/communal feelings to secure votes.
            </li>
            <li>
              <strong>Use of Government Resources:</strong> Ministers cannot use official machinery or personnel for electioneering work.
            </li>
            <li>
              <strong>End of Campaign:</strong> Public meetings and campaigning must stop exactly 48 hours before the end of the polling hour.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default EligibilityRules;
