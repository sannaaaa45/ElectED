import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import WhatIsElection from './components/WhatIsElection';
import Timeline from './components/Timeline';
import Roles from './components/Roles';
import VotingMethods from './components/VotingMethods';
import EligibilityRules from './components/EligibilityRules';
import MockSimulator from './components/MockSimulator';
import MythsFacts from './components/MythsFacts';
import Quiz from './components/Quiz';
import WhyVotingMatters from './components/WhyVotingMatters';
import AskAI from './components/AskAI';

const SECTIONS = [
  { id: 'home', title: 'Home', icon: 'Home' },
  { id: 'what-is-election', title: 'What is an Election?', icon: 'BookOpen' },
  { id: 'timeline', title: 'Election Timeline', icon: 'CalendarDays' },
  { id: 'roles', title: 'Roles & Players', icon: 'Users' },
  { id: 'methods', title: 'Voting Methods', icon: 'Vote' },
  { id: 'rules', title: 'Eligibility', icon: 'ClipboardCheck' },
  { id: 'simulator', title: 'Mock Vote', icon: 'MonitorPlay' },
  { id: 'myths', title: 'Myths vs Facts', icon: 'Lightbulb' },
  { id: 'quiz', title: 'Quiz', icon: 'BrainCircuit' },
  { id: 'askai', title: 'Ask AI Expert', icon: 'MessageSquare' },
  { id: 'matters', title: 'Why It Matters', icon: 'TrendingUp' }
];

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [visitedSections, setVisitedSections] = useState(['home']);

  useEffect(() => {
    if (!visitedSections.includes(currentSection)) {
      setVisitedSections([...visitedSections, currentSection]);
    }
    window.scrollTo(0, 0);
  }, [currentSection]);

  const renderSection = () => {
    switch (currentSection) {
      case 'home': return <Home onNavigate={setCurrentSection} visitedCount={visitedSections.length} totalCount={SECTIONS.length} />;
      case 'what-is-election': return <WhatIsElection />;
      case 'timeline': return <Timeline />;
      case 'roles': return <Roles />;
      case 'methods': return <VotingMethods />;
      case 'rules': return <EligibilityRules />;
      case 'simulator': return <MockSimulator />;
      case 'myths': return <MythsFacts />;
      case 'quiz': return <Quiz />;
      case 'askai': return <AskAI />;
      case 'matters': return <WhyVotingMatters />;
      default: return <Home onNavigate={setCurrentSection} visitedCount={visitedSections.length} totalCount={SECTIONS.length} />;
    }
  };

  const getBackgroundClass = () => {
    switch (currentSection) {
      case 'home': return 'bg-parliament';
      case 'what-is-election': return 'bg-voting';
      case 'timeline': return 'bg-transparent';
      case 'roles': return 'bg-parliament'; // Replaced rally with parliament
      case 'methods': return 'bg-evm';
      case 'rules': return 'bg-parliament';
      case 'simulator': return 'bg-evm';
      case 'myths': return 'bg-voting';
      case 'quiz': return 'bg-parliament';
      case 'askai': return 'bg-voting';
      case 'matters': return 'bg-rally';
      default: return 'bg-parliament';
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <Navigation 
        sections={SECTIONS} 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection}
        visitedSections={visitedSections}
      />
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
