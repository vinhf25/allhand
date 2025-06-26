import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Department from './components/Department';
import Employee from './components/Employee';

function App() {
  const [currentPage, setCurrentPage] = useState('Department');

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header title={currentPage} />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Department />} />
              <Route path="/departments" element={<Department />} />
              <Route path="/employees/new" element={<Employee />} />
              <Route path="/employees" element={<Department />} />
              <Route path="/managers" element={<Department />} />
              <Route path="/storage" element={<Department />} />
              <Route path="/components" element={<Department />} />
              <Route path="/inventory" element={<Department />} />
              <Route path="/settings" element={<Department />} />
              <Route path="/account" element={<Department />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
