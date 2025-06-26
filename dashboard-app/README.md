# Dashboard Web Application

A fullstack dashboard web application with a dark theme UI, built with:

## Frontend
- React + Vite
- Bootstrap 5
- React Router
- Axios for API calls

## Backend
- Flask
- SQLAlchemy
- SQLite (for development, can be configured for MSSQL)

## Features
- Department management
- Employee management
- Responsive dark-themed UI
- RESTful API

## Screenshots
- Department listing
- Department management
- Employee creation form

## Getting Started

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd dashboard-app
```

2. Set up the frontend
```bash
cd frontend
npm install
```

3. Set up the backend
```bash
cd ../backend
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server
```bash
cd backend
python app.py
```
The backend will run on http://localhost:12001

2. Start the frontend development server
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:12000

## API Endpoints

### Departments
- GET /api/departments - Get all departments
- GET /api/departments/:id - Get a specific department
- POST /api/departments - Create a new department
- PUT /api/departments/:id - Update a department
- DELETE /api/departments/:id - Delete a department

### Employees
- GET /api/employees - Get all employees
- GET /api/employees/:id - Get a specific employee
- POST /api/employees - Create a new employee
- PUT /api/employees/:id - Update an employee
- DELETE /api/employees/:id - Delete an employee

## Configuration

### Backend
The backend configuration is stored in the `.env` file. For MSSQL configuration, update the DATABASE_URI variable.

### Frontend
The frontend API URL can be configured in `src/services/api.js`.

## License
MIT