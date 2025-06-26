import React, { useState } from 'react';
import { Navbar, Form, InputGroup, Dropdown, Badge } from 'react-bootstrap';

const Header = ({ title }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <Navbar bg="dark" variant="dark" className="header p-0 px-3">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          <button className="btn btn-link text-white">
            <i className="bi bi-list fs-4"></i>
          </button>
          <Form className="ms-3">
            <InputGroup>
              <InputGroup.Text className="bg-dark border-0 text-white">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
            </InputGroup>
          </Form>
          <Dropdown className="ms-3">
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className="border-0">
              {title || 'Department'} <i className="bi bi-chevron-down ms-2"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Create new</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <i className="bi bi-bell fs-4 text-white"></i>
            <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-circle">
              1
            </Badge>
          </div>
          <div className="position-relative">
            <div 
              className="user-avatar bg-primary rounded-circle d-flex justify-content-center align-items-center text-white"
              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
              onClick={toggleUserMenu}
            >
              JS
            </div>
            {showUserMenu && (
              <div className="user-menu position-absolute end-0 mt-2 bg-white rounded shadow p-3" style={{ width: '250px', zIndex: 1000 }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>john.script@gmail.com</span>
                  <button className="btn btn-sm" onClick={toggleUserMenu}>
                    <i className="bi bi-x"></i>
                  </button>
                </div>
                <div className="text-center mb-3">
                  <div 
                    className="user-avatar bg-primary rounded-circle d-flex justify-content-center align-items-center text-white mx-auto mb-2"
                    style={{ width: '60px', height: '60px' }}
                  >
                    JS
                  </div>
                  <h5>Hello, John</h5>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-dark btn-sm">Manage</button>
                  <button className="btn btn-outline-dark btn-sm">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;