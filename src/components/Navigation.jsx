import React from 'react';
import { Home, BookOpen, CalendarDays, Users, Vote, ClipboardCheck, MonitorPlay, Lightbulb, BrainCircuit, TrendingUp, Menu, X, MessageSquare } from 'lucide-react';
import './Navigation.css';

const ICON_MAP = {
  Home, BookOpen, CalendarDays, Users, Vote, ClipboardCheck, MonitorPlay, Lightbulb, BrainCircuit, TrendingUp, MessageSquare
};

function Navigation({ sections, currentSection, setCurrentSection, visitedSections }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (id) => {
    setCurrentSection(id);
    setIsOpen(false);
  };

  const progress = (visitedSections.length / sections.length) * 100;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="mobile-topbar">
        <div className="logo">
          <span className="text-saffron">Elect</span>ED
        </div>
        <button className="menu-btn" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Container */}
      <nav className={`navigation ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <div className="logo">
            <span className="text-saffron">Elect</span>ED
          </div>
          <div className="progress-container">
            <div className="progress-text">
              <span>Your Journey</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="nav-links">
          {sections.map((section) => {
            const Icon = ICON_MAP[section.icon];
            const isActive = currentSection === section.id;
            const isVisited = visitedSections.includes(section.id);

            return (
              <button
                key={section.id}
                className={`nav-item ${isActive ? 'active' : ''} ${isVisited ? 'visited' : ''}`}
                onClick={() => handleNav(section.id)}
              >
                <Icon size={20} className="nav-icon" />
                <span className="nav-label">{section.title}</span>
                {isVisited && !isActive && <div className="visited-dot"></div>}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Floating Home Button (Mobile only) */}
      <button 
        className={`floating-home ${currentSection === 'home' ? 'hidden' : ''}`}
        onClick={() => setCurrentSection('home')}
      >
        <Home size={24} />
      </button>
    </>
  );
}

export default Navigation;
