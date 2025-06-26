import axios from 'axios';

const API_URL = 'http://localhost:12001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Department API
export const getDepartments = () => {
  return api.get('/departments');
};

export const getDepartment = (id) => {
  return api.get(`/departments/${id}`);
};

export const createDepartment = (departmentData) => {
  return api.post('/departments', departmentData);
};

export const updateDepartment = (id, departmentData) => {
  return api.put(`/departments/${id}`, departmentData);
};

export const deleteDepartment = (id) => {
  return api.delete(`/departments/${id}`);
};

// Employee API
export const getEmployees = () => {
  return api.get('/employees');
};

export const getEmployee = (id) => {
  return api.get(`/employees/${id}`);
};

export const createEmployee = (employeeData) => {
  return api.post('/employees', employeeData);
};

export const updateEmployee = (id, employeeData) => {
  return api.put(`/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => {
  return api.delete(`/employees/${id}`);
};

export default api;