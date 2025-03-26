import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectsDashboard from './ProjectsDashboard';
import HomePage from './HomePage';
import ProjectsTablePage from './ProjectsTablePage';
import EditProjectPage from './EditProjectPage';
import LargeScreenNav from './LargeScreenNavbar';
import SmallScreenNav from './SmallScreenNavbar';
import './App.css';

function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          {isLargeScreen ? <LargeScreenNav /> : <SmallScreenNav />}
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsDashboard />} />
            <Route path="/projects-table" element={<ProjectsTablePage />} />
            <Route path="/edit-project/:id" element={<EditProjectPage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Project Management App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;