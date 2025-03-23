import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [error, setError] = useState('');

  const apiUrl = 'http://localhost:5000/api/projects';

  const fetchProjects = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!newProjectName || !newProjectDescription) {
      setError('Project name and description cannot be empty');
      return;
    }

    const payload = { name: newProjectName, description: newProjectDescription };
    console.log('Sending payload:', payload); // Debugging

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setNewProjectDescription('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      const deletedProject = await response.json();
      setProjects(projects.filter((project) => project.id !== deletedProject.id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Projects</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="form-container">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Enter project name"
          className="form-input"
        />
        <input
          type="text"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          placeholder="Enter project description"
          className="form-input"
        />
        <button onClick={addProject} className="form-button">
          Add Project
        </button>
      </div>

      <div className="projects-list">
  <h2 className="list-title">Project List</h2>
  <ul>
    {projects.map((project) => (
      <li key={project.id} className="project-item">
        <div className="project-details">
          <span className="project-name">{project.name}</span><br />
          <span className="project-description">{project.description}</span>
        </div>
        <button
          onClick={() => deleteProject(project.id)}
          className="delete-button"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
</div>

      <div className="refresh-container">
        <button onClick={fetchProjects} className="refresh-button">
          Refresh Projects
        </button>
      </div>
    </div>
  );
}

export default App;