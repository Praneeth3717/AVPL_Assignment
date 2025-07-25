import { useEffect, useState } from 'react';
import AddStudent from './components/AddStudent/AddStudent';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import AuthForm from './components/AuthForm/AuthForm';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get('https://avpl-assignment-backend.onrender.com/api/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      fetchStudents();
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`https://avpl-assignment-backend.onrender.com/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    fetchStudents();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setStudents([]);
    setStudentToEdit(null);
  };

  const totalStudents = students.length;
  const fullPaid = students.filter((s) => s.feeStatus === 'paid').length;
  const partialPaid = students.filter((s) => s.feeStatus === 'partial').length;
  const fullDue = students.filter((s) => s.feeStatus === 'not paid' || s.dueAmount > 0).length;

  return (
    <>
      <Navbar userName={user?.name} onLogout={handleLogout} />

      {!isAuthenticated ? (
        <div className="main-container">
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </div>
      ) : (
        <>
          <div className="main-container">
            <div className="left-panel">
              <AddStudent
                studentToEdit={studentToEdit}
                onSubmit={() => {
                  fetchStudents();
                  setStudentToEdit(null);
                }}
              />
            </div>
            <div className="right-panel">
              <Dashboard
                totalStudents={totalStudents}
                fullPaid={fullPaid}
                partialPaid={partialPaid}
                fullDue={fullDue}
                students={students}
                onEdit={(student) => setStudentToEdit(student)}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
