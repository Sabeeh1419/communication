// EditProjectPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const EditProjectPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Initialize form with project data
  useEffect(() => {
    if (state?.projectData) {
      setFormData({
        name: state.projectData.name,
        description: state.projectData.description
      });
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend-of-projects.vercel.app/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update project');
      
      navigate('/projects-table'); // Go back to table view after update
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  return (
    <div className="edit-project-container">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)} className="btn secondary">
            Cancel
          </button>
          <button type="submit" className="btn primary">
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectPage;