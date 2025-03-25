import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectsTablePage.css';

const ProjectsTablePage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleEdit = (project) => {
    // Navigate to edit page with project ID and pass the project data
    navigate(`/edit-project/${project._id}`, { 
      state: { 
        projectData: project 
      } 
    });
  };


  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`${apiUrl}/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete project');
      
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="table-page-container">
      <div className="table-page-header">
        <h1>Projects Data</h1>
        <button 
          onClick={() => navigate('/projects')} 
          className="btn card-view-btn"
        >
          <i className="fas fa-th-large"></i> Switch to Card View
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading projects...</div>
      ) : (
        <div className="projects-table-container">
          <div className="table-responsive">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project._id}>
                      <td data-label="Project Name">
                        <div className="project-name-cell">
                          <span className="project-name">{project.name}</span>
                        </div>
                      </td>
                      <td data-label="Description" className="description-cell">
                        {project.description}
                      </td>
                      <td data-label="Created At">
                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td data-label="Actions" className="actions-cell">
                        <button 
                          onClick={() => handleEdit(project)} 
                          className="table-btn edit-btn"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(project._id)} 
                          className="table-btn delete-btn"
                          title="Delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="no-projects">
                    <td colSpan="4">No projects found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTablePage;