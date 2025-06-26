from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure database
# In a production environment, these would be set in environment variables
# For demo purposes, we'll use a SQLite database instead of MSSQL
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'mssql+pyodbc://username:password@server/database?driver=ODBC+Driver+17+for+SQL+Server')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dashboard.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define models
class Department(db.Model):
    id = db.Column(db.String(10), primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    short_name = db.Column(db.String(10), nullable=False)
    manager = db.Column(db.String(100))
    created_date = db.Column(db.String(10), nullable=False)
    status = db.Column(db.String(20), default='Completed')

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.String(10))
    address = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    department_id = db.Column(db.String(10), db.ForeignKey('department.id'))
    department = db.relationship('Department', backref=db.backref('employees', lazy=True))

# Create tables
with app.app_context():
    db.create_all()
    
    # Add sample data if the department table is empty
    if not Department.query.first():
        sample_departments = [
            Department(id='01', full_name='Human Resource', short_name='HR', manager='John Madden', created_date='2025/05/01'),
            Department(id='02', full_name='Application', short_name='AP', manager='John Madman', created_date='2025/05/01'),
            Department(id='03', full_name='Software', short_name='SW', manager='John Cena', created_date='2025/05/01'),
            Department(id='04', full_name='Mechanical', short_name='ME', manager='John Script', created_date='2025/05/01'),
            Department(id='05', full_name='Electrical', short_name='EL', manager='John Python', created_date='2025/05/01'),
            Department(id='06', full_name='Firmware/Embeded', short_name='FE', manager='John Jean', created_date='2025/05/01'),
            Department(id='07', full_name='Assistant', short_name='AS', manager='', created_date='2025/05/01'),
            Department(id='08', full_name='Logistic', short_name='LS', manager='John Joe', created_date='2025/05/01'),
            Department(id='09', full_name='Accountant', short_name='AC', manager='John Jay', created_date='2025/05/01'),
        ]
        db.session.bulk_save_objects(sample_departments)
        db.session.commit()

# API Routes
@app.route('/api/departments', methods=['GET'])
def get_departments():
    departments = Department.query.all()
    result = []
    for dept in departments:
        result.append({
            'id': dept.id,
            'fullName': dept.full_name,
            'shortName': dept.short_name,
            'manager': dept.manager,
            'createdDate': dept.created_date,
            'status': dept.status
        })
    return jsonify(result)

@app.route('/api/departments/<id>', methods=['GET'])
def get_department(id):
    dept = Department.query.get_or_404(id)
    return jsonify({
        'id': dept.id,
        'fullName': dept.full_name,
        'shortName': dept.short_name,
        'manager': dept.manager,
        'createdDate': dept.created_date,
        'status': dept.status
    })

@app.route('/api/departments', methods=['POST'])
def create_department():
    data = request.json
    new_dept = Department(
        id=data['id'],
        full_name=data['fullName'],
        short_name=data['shortName'],
        manager=data.get('manager', ''),
        created_date=data['createdDate'],
        status=data.get('status', 'Completed')
    )
    db.session.add(new_dept)
    db.session.commit()
    return jsonify({
        'id': new_dept.id,
        'fullName': new_dept.full_name,
        'shortName': new_dept.short_name,
        'manager': new_dept.manager,
        'createdDate': new_dept.created_date,
        'status': new_dept.status
    }), 201

@app.route('/api/departments/<id>', methods=['PUT'])
def update_department(id):
    dept = Department.query.get_or_404(id)
    data = request.json
    
    dept.full_name = data.get('fullName', dept.full_name)
    dept.short_name = data.get('shortName', dept.short_name)
    dept.manager = data.get('manager', dept.manager)
    dept.status = data.get('status', dept.status)
    
    db.session.commit()
    return jsonify({
        'id': dept.id,
        'fullName': dept.full_name,
        'shortName': dept.short_name,
        'manager': dept.manager,
        'createdDate': dept.created_date,
        'status': dept.status
    })

@app.route('/api/departments/<id>', methods=['DELETE'])
def delete_department(id):
    dept = Department.query.get_or_404(id)
    db.session.delete(dept)
    db.session.commit()
    return jsonify({'message': 'Department deleted successfully'}), 200

@app.route('/api/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    result = []
    for emp in employees:
        result.append({
            'id': emp.id,
            'fullName': emp.full_name,
            'birthday': emp.birthday,
            'address': emp.address,
            'phone': emp.phone,
            'email': emp.email,
            'departmentId': emp.department_id
        })
    return jsonify(result)

@app.route('/api/employees', methods=['POST'])
def create_employee():
    data = request.json
    new_emp = Employee(
        full_name=data['fullName'],
        birthday=data.get('birthday', ''),
        address=data.get('address', ''),
        phone=data.get('phone', ''),
        email=data.get('email', ''),
        department_id=data.get('departmentId')
    )
    db.session.add(new_emp)
    db.session.commit()
    return jsonify({
        'id': new_emp.id,
        'fullName': new_emp.full_name,
        'birthday': new_emp.birthday,
        'address': new_emp.address,
        'phone': new_emp.phone,
        'email': new_emp.email,
        'departmentId': new_emp.department_id
    }), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=12001, debug=True)