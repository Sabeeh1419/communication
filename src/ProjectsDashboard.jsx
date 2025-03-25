import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsDashboard.css';

function ProjectsDashboard() {
  const [projects, setProjects] = useState([]);
   const [formData, setFormData] = useState({
     name: '',
     description: ''
   });
   const [editingId, setEditingId] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
 
   const apiUrl = 'https://backend-of-projects.vercel.app/api/projects';
 
   const fetchProjects = async () => {
     setIsLoading(true);
     try {
       const response = await fetch(apiUrl);
       if (!response.ok) throw new Error('Failed to fetch projects');
       const data = await response.json();
       setProjects(data);
       setError(null);
     } catch (err) {
       setError(err.message);
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchProjects();
   }, []);
 
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData(prev => ({ ...prev, [name]: value }));
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     setIsLoading(true);
     
     try {
       const url = editingId ? `${apiUrl}/${editingId}` : apiUrl;
       const method = editingId ? 'PUT' : 'POST';
       
       const response = await fetch(url, {
         method,
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       });
 
       if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Operation failed');
       }
 
       const result = await response.json();
       
       if (editingId) {
         setProjects(projects.map(p => p._id === editingId ? result.data.project : p));
         setSuccess('Project updated successfully');
       } else {
         setProjects([...projects, result]);
         setSuccess('Project added successfully');
       }
       
       setFormData({ name: '', description: '' });
       setEditingId(null);
       setError(null);
     } catch (err) {
       setError(err.message);
       setSuccess(null);
     } finally {
       setIsLoading(false);
       setTimeout(() => setSuccess(null), 3000);
     }
   };
 
   const handleDelete = async (id) => {
     if (!window.confirm('Are you sure you want to delete this project?')) return;
     
     setIsLoading(true);
     try {
       const response = await fetch(`${apiUrl}/${id}`, {
         method: 'DELETE',
       });
 
       if (!response.ok) throw new Error('Failed to delete project');
       
       setProjects(projects.filter(project => project._id !== id));
       setSuccess('Project deleted successfully');
       setError(null);
     } catch (err) {
       setError(err.message);
     } finally {
       setIsLoading(false);
       setTimeout(() => setSuccess(null), 3000);
     }
   };
 
   const startEditing = (project) => {
     setFormData({
       name: project.name,
       description: project.description
     });
     setEditingId(project._id);
   };
 
   const cancelEditing = () => {
     setFormData({ name: '', description: '' });
     setEditingId(null);
   };
 
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Project Management</h1>
        <p>Manage your projects efficiently</p>
      </div>

      <main className="dashboard-content">
        <section className="project-form-section">
          <div className="card form-card">
            <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Project Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter project name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter project description"
                  rows="3"
                />
              </div>
              <div className="form-actions">
                {editingId && (
                  <button type="button" onClick={cancelEditing} className="btn secondary">
                    Cancel
                  </button>
                )}
                <button type="submit" className="btn primary" disabled={isLoading}>
                  {isLoading ? 'Processing...' : (editingId ? 'Update' : 'Add')}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="projects-section">
          <div className="card projects-card">
            <div className="card-header">
              <h2>Your Projects</h2>
              <button onClick={fetchProjects} className="btn refresh-btn" disabled={isLoading}>
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">{success}</div>}

            {isLoading && !projects.length ? (
              <div className="loading">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="empty-state">
                <p>No projects found. Add your first project!</p>
              </div>
            ) : (
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project._id} className="project-card">
                    <div className="project-content">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="project-meta">
                        <span className="date">
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="project-actions">
                      <button 
                        onClick={() => startEditing(project)} 
                        className="btn edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(project._id)} 
                        className="btn delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <div className="home-btn-container">
      <Link to="/" className="back-home home-btn">← Back to Home</Link>
      </div>
    </div>
  );
}

export default ProjectsDashboard;