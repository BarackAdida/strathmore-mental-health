import { useState } from 'react';
import { useLocalStorage } from '../context/hook/useLocalStorage';
import '../Styles/AuthApp.css';

function AuthApp() {
  const [users, setUsers] = useLocalStorage('registeredUsers', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

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
      if (users.some((u) => u.username === username)) {
        setError('Username already taken');
        return;
      }
      if (username.length < 3 || password.length < 4) {
        setError('Username (min 3) and Password (min 4) required');
        return;
      }

      const newUser = { username, password };
      setUsers([...users, newUser]);
      setCurrentUser({ username });
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (currentUser) {
    return (
      <div className="dashboard">
        <div className="dashboard-card">
          <h2 className="dashboard-greeting">Welcome, {currentUser.username}!</h2>
          <p className="dashboard-message">You are now logged in to your secure area.</p>
          <button className="dashboard-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <input
              className="auth-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button className="auth-submit-btn" type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button className="auth-toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default AuthApp;