const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const router = express.Router();
const DB_PATH = path.join(__dirname, '../db/db.json');

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

const isAdmin = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const db = readDB();
  const user = db.users.find(u => u.id === req.session.userId);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const db = readDB();
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
    name,
    email,
    password: hashed,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDB(db);

  req.session.userId = newUser.id;
  req.session.user = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };

  res.status(201).json({
    message: 'User created and logged in',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user.id;
  req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role };

  res.json({
    message: 'Logged in',
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});

router.get('/me', isAuthenticated, (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.session.userId);
  if (!user) {
    req.session.destroy();
    return res.status(404).json({ error: 'User not found' });
  }
  const { password, ...userData } = user;
  res.json(userData);
});


router.get('/admin/users', isAdmin, (req, res) => {
  const db = readDB();
  const users = db.users.map(({ password, ...user }) => user);
  res.json(users);
});


router.post('/admin/promote/:id', isAdmin, (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.role === 'admin') return res.status(400).json({ error: 'User is already admin' });
  user.role = 'admin';
  writeDB(db);
  res.json({ message: 'User promoted to admin', user: { id: user.id, name: user.name, role: user.role } });
});

module.exports = router;