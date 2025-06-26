import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Nav, Badge } from 'react-bootstrap';
import { getDepartments } from '../services/api';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError('Failed to load departments. Using mock data instead.');
        
        // Fallback to mock data if API fails
        const mockData = [
          { id: '01', fullName: 'Human Resource', shortName: 'HR', manager: 'John Madden', createdDate: '2025/05/01' },
          { id: '02', fullName: 'Application', shortName: 'AP', manager: 'John Madman', createdDate: '2025/05/01' },
          { id: '03', fullName: 'Software', shortName: 'SW', manager: 'John Cena', createdDate: '2025/05/01' },
          { id: '04', fullName: 'Mechanical', shortName: 'ME', manager: 'John Script', createdDate: '2025/05/01' },
          { id: '05', fullName: 'Electrical', shortName: 'EL', manager: 'John Python', createdDate: '2025/05/01' },
          { id: '06', fullName: 'Firmware/Embeded', shortName: 'FE', manager: 'John Jean', createdDate: '2025/05/01' },
          { id: '07', fullName: 'Assistant', shortName: 'AS', manager: '', createdDate: '2025/05/01' },
          { id: '08', fullName: 'Logistic', shortName: 'LS', manager: 'John Joe', createdDate: '2025/05/01' },
          { id: '09', fullName: 'Accountant', shortName: 'AC', manager: 'John Jay', createdDate: '2025/05/01' },
        ];
        
        setDepartments(mockData);
        setLoading(false);
      }
    };
    
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter(dept => {
    if (filter === 'all') return true;
    if (filter === 'inProcessing') return dept.status === 'In Processing';
    if (filter === 'completed') return dept.status === 'Completed';
    return true;
  });

  return (
    <div className="department-container p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Nav variant="pills" defaultActiveKey="all" className="bg-dark rounded">
          <Nav.Item>
            <Nav.Link eventKey="all" onClick={() => setFilter('all')} className="text-white">All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="inProcessing" onClick={() => setFilter('inProcessing')} className="text-white">In Processing</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="completed" onClick={() => setFilter('completed')} className="text-white">Completed</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="d-flex">
          <Button variant="outline-secondary" className="me-2">
            <i className="bi bi-building"></i>
            <span className="ms-1">Department</span>
          </Button>
          <Button variant="outline-secondary" className="me-2">
            <i className="bi bi-arrow-down-up"></i>
            <span className="ms-1">Import</span>
          </Button>
          <Button variant="outline-secondary" className="me-2">
            <i className="bi bi-box-arrow-up"></i>
            <span className="ms-1">Export</span>
          </Button>
          <Button variant="outline-secondary">
            <i className="bi bi-gear"></i>
            <span className="ms-1">Setting</span>
          </Button>
        </div>
      </div>

      <Table striped hover responsive className="bg-dark text-white">
        <thead>
          <tr>
            <th>
              <Form.Check type="checkbox" />
            </th>
            <th>ID</th>
            <th>Full Name</th>
            <th>Short Name</th>
            <th>Manager</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">Loading...</td>
            </tr>
          ) : (
            filteredDepartments.map((dept) => (
              <tr key={dept.id}>
                <td>
                  <Form.Check type="checkbox" />
                </td>
                <td>{dept.id}</td>
                <td>{dept.fullName}</td>
                <td>{dept.shortName}</td>
                <td>{dept.manager || '-'}</td>
                <td>{dept.createdDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Department;