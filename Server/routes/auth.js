const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const router = express.Router();
const DB_PATH = path.join(__dirname, '../db/db.json');

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

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
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDB(db);

  req.session.userId = newUser.id;
  req.session.user = { id: newUser.id, name: newUser.name, email: newUser.email };

  res.status(201).json({
    message: 'User created and logged in',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
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
  req.session.user = { id: user.id, name: user.name, email: user.email };

  res.json({
    message: 'Logged in',
    user: { id: user.id, name: user.name, email: user.email }
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid'); // default cookie name
    res.json({ message: 'Logged out' });
  });
});

router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const db = readDB();
  const user = db.users.find(u => u.id === req.session.userId);
  if (!user) {
    req.session.destroy();
    return res.status(404).json({ error: 'User not found' });
  }
  const { password, ...userData } = user;
  res.json(userData);
});

module.exports = router;