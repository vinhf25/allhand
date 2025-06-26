import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white">
      <div className="sidebar-header p-3">
        <h5>HUMAN RESOURCE</h5>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/departments" className="nav-link text-white">
            <i className="bi bi-building me-2"></i> Department
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/employees" className="nav-link text-white">
            <i className="bi bi-people me-2"></i> Employee
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/managers" className="nav-link text-white">
            <i className="bi bi-person-badge me-2"></i> Manager
          </Link>
        </Nav.Item>
      </Nav>
      <div className="sidebar-header p-3 mt-4">
        <h5>WAREHOUSE</h5>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/storage" className="nav-link text-white">
            <i className="bi bi-box me-2"></i> Storage
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/components" className="nav-link text-white">
            <i className="bi bi-gear me-2"></i> Components
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/inventory" className="nav-link text-white">
            <i className="bi bi-list-check me-2"></i> Inventory
          </Link>
        </Nav.Item>
      </Nav>
      <div className="sidebar-footer mt-auto p-3">
        <Nav className="flex-column">
          <Nav.Item>
            <Link to="/settings" className="nav-link text-white">
              <i className="bi bi-gear-fill me-2"></i> Settings
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/account" className="nav-link text-white">
              <i className="bi bi-person-circle me-2"></i> Account
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;