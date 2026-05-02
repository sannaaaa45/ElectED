import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import './Quiz.css';

const QUESTION_POOL = [
  { question: "What is the minimum voting age for an Indian citizen?", options: ["16 years", "18 years", "21 years", "25 years"], correctAnswer: 1 },
  { question: "Which constitutional body is responsible for conducting elections in India?", options: ["Supreme Court of India", "Parliament", "Election Commission of India", "Ministry of Home Affairs"], correctAnswer: 2 },
  { question: "What does VVPAT stand for?", options: ["Voter Verified Paper Audit Trail", "Voting Validation Print Audit Track", "Voter Verification Polling Audit Trail", "Verified Voting Paper Account Track"], correctAnswer: 0 },
  { question: "What is a 'By-election'?", options: ["Election held near a polling booth", "Election to fill a vacancy that arises between general elections", "Election for local panchayats only", "Election held twice a year"], correctAnswer: 1 },
  { question: "Under the Model Code of Conduct, when must all public campaigning stop before polling?", options: ["12 hours before", "24 hours before", "48 hours before", "On the day of polling"], correctAnswer: 2 },
  { question: "What does the NOTA option on the EVM stand for?", options: ["No Other True Alternative", "None of the Above", "Not On The Agenda", "Nullified Option To Act"], correctAnswer: 1 },
  { question: "Which document is primarily used to establish identity at the polling station?", options: ["Ration Card", "Birth Certificate", "EPIC (Voter ID Card)", "Electricity Bill"], correctAnswer: 2 },
  { question: "Who is the chief electoral officer of a district?", options: ["Superintendent of Police", "District Magistrate (Collector)", "Mayor", "Chief Minister"], correctAnswer: 1 },
  { question: "How many maximum candidates can a single Ballot Unit of an EVM accommodate?", options: ["10", "16", "24", "64"], correctAnswer: 1 },
  { question: "What is the maximum number of votes that can be cast in one EVM?", options: ["1000", "2000", "3840", "10000"], correctAnswer: 2 },
  { question: "In which year were EVMs first used in an election in India?", options: ["1982", "1995", "2004", "2014"], correctAnswer: 0 },
  { question: "If you don't have a Voter ID card, can you still vote?", options: ["No, it's strictly required", "Yes, if your name is on the voter list, using an alternative valid photo ID", "Yes, but you have to pay a fine", "Only if the polling officer knows you"], correctAnswer: 1 },
  { question: "Which ink is applied to the voter's finger to prevent double voting?", options: ["Permanent Marker", "Indelible Ink (Silver Nitrate)", "Waterproof Paint", "Henna"], correctAnswer: 1 },
  { question: "On which finger is the indelible ink typically applied?", options: ["Right index finger", "Left index finger", "Right thumb", "Left thumb"], correctAnswer: 1 },
  { question: "What happens if NOTA gets the highest number of votes?", options: ["Elections are cancelled forever", "The candidate with the second-highest votes is declared the winner", "Re-election takes place immediately", "NOTA candidates take office"], correctAnswer: 1 },
  { question: "What form is used to register as a new voter?", options: ["Form 6", "Form 7", "Form 8", "Form 9"], correctAnswer: 0 },
  { question: "Who appoints the Chief Election Commissioner of India?", options: ["Prime Minister", "Chief Justice of India", "President of India", "Parliament"], correctAnswer: 2 },
  { question: "What is the maximum age limit for a voter in India?", options: ["65 years", "75 years", "100 years", "No upper age limit"], correctAnswer: 3 },
  { question: "Which article of the Indian Constitution established the Election Commission?", options: ["Article 14", "Article 324", "Article 356", "Article 370"], correctAnswer: 1 },
  { question: "What does 'Electoral Roll' refer to?", options: ["A list of political parties", "A cylindrical box for votes", "The official list of registered voters", "The rules of campaigning"], correctAnswer: 2 }
];

function Quiz() {
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Initialize quiz with 7 random questions
  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    const shuffled = [...QUESTION_POOL].sort(() => 0.5 - Math.random());
    setActiveQuestions(shuffled.slice(0, 7));
    setCurrentQ(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === activeQuestions[currentQ].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < activeQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const getTier = () => {
    if (score <= 3) return { label: "Newcomer", desc: "You're just starting your democratic journey. Review the sections to learn more!" };
    if (score <= 5) return { label: "Informed Citizen", desc: "Good job! You have a solid grasp of how Indian elections work." };
    return { label: "Election Expert", desc: "Outstanding! You are fully prepared to participate in the democratic process." };
  };

  if (activeQuestions.length === 0) return null;

  return (
    <div className="page-section quiz-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Test Your <span>Knowledge</span>
      </motion.h2>

      <div className="quiz-container glass-card">
        <AnimatePresence mode="wait">
          {!showScore ? (
            <motion.div 
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="quiz-content"
            >
              <div className="quiz-header">
                <span className="question-count">Question {currentQ + 1} of {activeQuestions.length}</span>
                <span className="score-tracker">Score: {score}</span>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQ) / activeQuestions.length) * 100}%` }}
                ></div>
              </div>

              <h3 className="question-text">{activeQuestions[currentQ].question}</h3>

              <div className="options-grid">
                {activeQuestions[currentQ].options.map((option, index) => {
                  const isCorrect = index === activeQuestions[currentQ].correctAnswer;
                  const isSelected = index === selectedOption;
                  
                  let btnClass = "option-btn";
                  if (isAnswered) {
                    if (isCorrect) btnClass += " correct";
                    else if (isSelected) btnClass += " incorrect";
                    else btnClass += " disabled";
                  } else if (isSelected) {
                    btnClass += " selected";
                  }

                  return (
                    <button 
                      key={index} 
                      className={btnClass}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrect && <CheckCircle size={20} className="text-success-light" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-error" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div 
                  className="next-btn-container"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button className="btn-primary" onClick={nextQuestion}>
                    {currentQ === activeQuestions.length - 1 ? 'See Results' : 'Next Question'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="result-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="result-content ivory-card"
            >
              <Trophy size={80} className="text-saffron mb-4 trophy-icon" />
              <h3 className="result-title">Quiz Complete!</h3>
              
              <div className="score-circle">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {activeQuestions.length}</span>
              </div>

              <div className="tier-badge">
                {getTier().label}
              </div>
              <p className="tier-desc">{getTier().desc}</p>

              <button className="btn-outline flex-center mt-6" onClick={startNewQuiz}>
                <RotateCcw size={18} style={{ marginRight: '8px' }} /> Try Again (New Questions)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Quiz;
