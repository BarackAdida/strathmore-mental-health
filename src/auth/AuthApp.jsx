import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../context/hook/useLocalStorage';
import '../Styles/AuthApp.css';

function AuthApp() {
  const navigate = useNavigate();
  const [users, setUsers] = useLocalStorage('registeredUsers', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const adminUser = import.meta.env.VITE_ADMIN_USER;
    const adminPass = import.meta.env.VITE_ADMIN_PASS;

    if (adminUser && adminPass) {
      const adminExists = users.some(u => u.username === adminUser);
      if (!adminExists) {
        const admin = {
          username: adminUser,
          password: adminPass,
          email: 'admin@example.com',
        };
        setUsers([...users, admin]);
        console.log('✅ Admin user seeded from .env');
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const isAdmin = currentUser.username === import.meta.env.VITE_ADMIN_USER;
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );
      if (foundUser) {
        setCurrentUser({ username: foundUser.username });
        setUsername('');
        setPassword('');
      } else {
        setError('Invalid username or password');
      }
    } else {
      const adminUser = import.meta.env.VITE_ADMIN_USER;
      if (username === adminUser) {
        setError(`Username "${adminUser}" is reserved.`);
        return;
      }

      if (users.some((u) => u.username === username)) {
        setError('Username already taken');
        return;
      }
      if (username.length < 3 || password.length < 4 || !email.includes('@')) {
        setError('Please fill all fields correctly');
        return;
      }
      const newUser = { username, password, email };
      setUsers([...users, newUser]);
      setCurrentUser({ username });
      setUsername('');
      setPassword('');
      setEmail('');
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-heading">Welcome!</h1>
      <p className="auth-subheading">
        {isLogin ? 'Sign in to your account' : 'Create a new account'}
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="auth-input"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label className="form-label">E‑mail</label>
            <input
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isLogin && (
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> remember me?
            </label>
            <a href="#" className="forgot-link">forgot password?</a>
          </div>
        )}

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit">
          {isLogin ? 'Login' : 'Create →'}
        </button>
      </form>

      {!isLogin && (
        <p className="social-note">Or create account using social media!</p>
      )}

      <button
        className="auth-toggle"
        onClick={() => {
          setIsLogin(!isLogin);
          setError('');
        }}
      >
        {isLogin ? 'Create account!' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default AuthApp;