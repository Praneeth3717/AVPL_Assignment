import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ userName, onLogout }) => {
  return (
    <div className='navbar'>
      <h1>ERP Fee Portal</h1>

      {
        userName?(
          <div className="user-info">
            <p><FontAwesomeIcon icon={faUser} className="user-icon" /> {userName || 'User'}</p>
            <button className="logout-btn" onClick={onLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </button>
          </div>
        ):""
      }
    </div>
  );
};

export default Navbar;


