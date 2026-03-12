import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      let u;
      if (isRegister) {
        // after successful registration, switch to login mode
        await registerUser(email, password, name);
        alert('Registration successful! Please log in.');
        setIsRegister(false);
        return;
      } else {
        u = await loginUser(email, password);
        setUser(u);
        navigate('/admin'); // redirect logged-in users to admin
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <style>{`
        .login-container { padding: 1rem; width: 100%; max-width: 1000px; margin: 2rem auto; background: #fff; border-radius: 4px; }
        .login-field { margin-bottom: 0.5rem; }
        .login-input { width: 100%; padding: 0.3rem; }
        .login-label { display: block; margin-bottom: 0.2rem; }
      `}</style>
      <div className="login-container">
        <h2>{isRegister ? 'Register' : 'Log in'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="login-field">
              <label className="login-label">Name: </label>
              <input className="login-input" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div className="login-field">
            <label className="login-label">Email: </label>
            <input className="login-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="login-field">
            <label className="login-label">Password: </label>
            <input className="login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">{isRegister ? 'Sign up' : 'Log in'}</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Log in' : 'Register'}
          </button>
        </p>
      </div>
    </>
  );
}
