import './Dashboard.css';

const Dashboard = ({ totalStudents, fullPaid, partialPaid, fullDue, students, onEdit,onDelete}) => {


  return (
    <div className="dashboard">
      <div className="card-container">
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="dashboard-card">
          <h3>Fully Paid</h3>
          <p>{fullPaid}</p>
        </div>
        <div className="dashboard-card">
          <h3>Partial Paid</h3>
          <p>{partialPaid}</p>
        </div>
        <div className="dashboard-card">
          <h3>Fully Due</h3>
          <p>{fullDue}</p>
        </div>
      </div>

      <h3 className="student-list-title">All Students</h3>
      <div className="student-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Fee Paid</th>
              <th>Due Fee</th>
              <th>Total Fee</th>
              <th>Status</th>
              <th>Confirmation</th>
              <th>Take Action</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, index) => (
              <tr key={student._id || index}>
                <td>{student.name}</td>
                <td>₹{student.feePaid}</td>
                <td>₹{student.dueAmount}</td>
                <td>₹{student.totalFee}</td>
                <td>{capitalize(student.feeStatus)}</td>
                <td>{capitalize(student.confirmationStatus)}</td>
                <td className='btn-edit-delete'>
                  <button onClick={() => onEdit(student)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Utility function to capitalize first letter
const capitalize = (text) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
};

export default Dashboard;
