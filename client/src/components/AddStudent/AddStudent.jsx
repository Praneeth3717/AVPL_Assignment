import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddStudent.css';

const AddStudent = ({ onSubmit, studentToEdit = null }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    totalFee: '',
    feePaid: '',
    dueAmount: '',
    dueDate: '',
    status: 'Unpaid',
  });

  useEffect(() => {
    if (studentToEdit) {
      setStudent(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedStudent = { ...student, [name]: value };

    if (name === 'totalFee' || name === 'feePaid') {
      const total = parseFloat(updatedStudent.totalFee) || 0;
      const paid = parseFloat(updatedStudent.feePaid) || 0;
      updatedStudent.dueAmount = Math.max(total - paid, 0);
    }

    setStudent(updatedStudent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (student._id) {
        // UPDATE EXISTING STUDENT
        await axios.put(`https://avpl-assignment-backend.onrender.com/api/students/${student._id}`, {
          ...student,
          feeStatus: student.status.toLowerCase(),
        });
      } else {
        // ADD NEW STUDENT
        await axios.post('https://avpl-assignment-backend.onrender.com/api/students', {
          ...student,
          feeStatus: student.status.toLowerCase(),
        });
      }

      onSubmit?.();
      setStudent({
        name: '',
        email: '',
        totalFee: '',
        feePaid: '',
        dueAmount: '',
        dueDate: '',
        status: 'Unpaid',
      });
    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <h2>{student._id ? 'Edit Student' : 'Add New Student'}</h2>

      <label>Name</label>
      <input type="text" name="name" value={student.name} onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" value={student.email} onChange={handleChange} required />

      <label>Total Fee (₹)</label>
      <input type="number" name="totalFee" value={student.totalFee} onChange={handleChange} required />

      <div className="row">
        <div className="half">
          <label>Fee Paid (₹)</label>
          <input type="number" name="feePaid" value={student.feePaid} onChange={handleChange} required />
        </div>
        <div className="half">
          <label>Due Amount (₹)</label>
          <input type="number" name="dueAmount" value={student.dueAmount} readOnly />
        </div>
      </div>

      <div className="row">
        <div className="half">
          <label>Due Date</label>
          <input type="date" name="dueDate" value={student.dueDate} onChange={handleChange} required />
        </div>
        <div className="half">
          <label>Payment Status</label>
          <select name="status" value={student.status} onChange={handleChange}>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      <button type="submit">{student._id ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
};

export default AddStudent;
