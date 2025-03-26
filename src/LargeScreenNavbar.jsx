import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function LargeScreenNav() {
  return (
    <nav className="main-nav">
      <Link to="/" className="nav-logo">Project Manager</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/projects" className="nav-link">Add Projects</Link>
        <Link to="/projects-table" className="nav-link">Data View</Link>
      </div>
    </nav>
  );
}

export default LargeScreenNav;
