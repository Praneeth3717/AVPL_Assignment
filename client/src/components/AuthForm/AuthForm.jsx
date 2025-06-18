import { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

const AuthForm = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const toggleMode = () => {
    setFormData({ name: '', email: '', password: '' });
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    setMessage('');
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://avpl-assignment-backend.onrender.com/api/auth/${mode}`;

    try {
      const { data } = await axios.post(url, formData);
      setMessage(data.message || `${mode === 'signup' ? 'Signup' : 'Login'} successful`);
      setError('');

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onAuthSuccess?.(); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</h2>

      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {mode === 'signup' && (
        <>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </>
      )}

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {mode === 'signup' ? 'Create Account' : 'Login'}
      </button>

      <p style={{ marginTop: '12px', textAlign: 'center' }}>
        {mode === 'signup'
          ? 'Already have an account? '
          : "Don't have an account? "}
        <span
          onClick={toggleMode}
          style={{
            color: '#2563eb',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {mode === 'signup' ? 'Sign In' : 'Sign Up'}
        </span>
      </p>
    </form>
  );
};

export default AuthForm;
