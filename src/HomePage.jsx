import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Manage Your Projects Efficiently</h1>
          <p>A simple yet powerful tool to organize and track all your projects in one place.</p>
          <Link to="/projects" className="cta-button">Get Started</Link>
        </div>
        <div className="hero-image">
          <img src="https://illustrations.popsy.co/amber/digital-nomad.svg" alt="Project management" />
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Our Project Manager</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor all your projects and tasks in real-time with our intuitive dashboard.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Work seamlessly with your team members on shared projects.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Reliable</h3>
            <p>Built with modern technologies for speed and reliability.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Boost Your Productivity?</h2>
        <Link to="/projects" className="cta-button secondary">Start Managing Projects Now</Link>
      </section>
    </div>
  );
}

export default HomePage;