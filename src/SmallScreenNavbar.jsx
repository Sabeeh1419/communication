import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function SmallScreenNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="small-nav">
      <div className="nav-header">
        <Link to="/" className="nav-logo">Project Manager</Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="nav-menu">
          <button className="close-menu" onClick={() => setMenuOpen(false)}>✖</button>
          <div className="nav-links-mobile">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</Link>
            <Link to="/projects-table" className="nav-link" onClick={() => setMenuOpen(false)}>Data View</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SmallScreenNav;