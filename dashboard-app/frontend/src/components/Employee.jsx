import React, { useState } from 'react';
import { Form, Button, Nav, Tab, Alert } from 'react-bootstrap';
import { createEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    fullName: '',
    birthday: '',
    address: '',
    phone: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await createEmployee(formData);
      navigate('/employees');
    } catch (error) {
      console.error('Error creating employee:', error);
      setError('Failed to save employee. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="employee-container p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">
          <i className="bi bi-plus-circle me-2"></i>
          Create New Employee
        </h3>
        <div>
          <Button variant="outline-secondary" className="me-2" onClick={() => navigate('/employees')}>
            <i className="bi bi-trash"></i>
            <span className="ms-1">Delete</span>
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-save"></i>
                <span className="ms-1">Save</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Tab.Container id="employee-tabs" defaultActiveKey="general">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link 
              eventKey="general" 
              onClick={() => setActiveTab('general')}
              className={activeTab === 'general' ? 'active text-primary' : ''}
            >
              General
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              eventKey="permission" 
              onClick={() => setActiveTab('permission')}
              className={activeTab === 'permission' ? 'active text-primary' : ''}
            >
              Permission
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              eventKey="other" 
              onClick={() => setActiveTab('other')}
              className={activeTab === 'other' ? 'active text-primary' : ''}
            >
              Other
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="general">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter full name" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Birthday <span className="text-danger">*</span></Form.Label>
                <div className="position-relative">
                  <Form.Control 
                    type="date" 
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    required
                  />
                  <i className="bi bi-calendar position-absolute end-0 top-50 translate-middle-y me-3"></i>
                </div>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                <div className="position-relative">
                  <Form.Control 
                    type="text" 
                    placeholder="Enter address" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <i className="bi bi-geo-alt position-absolute end-0 top-50 translate-middle-y me-3"></i>
                </div>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="tel" 
                  placeholder="Enter phone number" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email address" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </Tab.Pane>
          <Tab.Pane eventKey="permission">
            <p>Permission settings will go here</p>
          </Tab.Pane>
          <Tab.Pane eventKey="other">
            <p>Other settings will go here</p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Employee;