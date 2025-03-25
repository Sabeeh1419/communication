import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectsDashboard from './ProjectsDashboard';
import HomePage from './HomePage';
import './App.css';
import ProjectsTablePage from './ProjectsTablePage';
import EditProjectPage from './EditProjectPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <nav className="main-nav">
            <Link to="/" className="nav-logo">Project Manager</Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/projects" className="nav-link">Projects</Link>
              <Link to="/projects-table" className="nav-link">Data View</Link>
            </div>
          </nav>
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