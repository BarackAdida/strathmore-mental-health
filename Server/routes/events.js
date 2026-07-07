const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DB_PATH = path.join(__dirname, '../db/db.json');

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

const requireAdmin = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'You must be logged in' });
  }
  const db = readDB();
  const user = db.users.find(u => u.id === req.session.userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.events);
});

router.get('/:id', (req, res) => {
  const db = readDB();
  const event = db.events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
});

router.post('/', requireAdmin, (req, res) => {
  const db = readDB();
  const newEvent = {
    id: db.events.length ? Math.max(...db.events.map(e => e.id)) + 1 : 1,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (!newEvent.title || !newEvent.date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }

  db.events.push(newEvent);
  writeDB(db);
  res.status(201).json(newEvent);
});

router.put('/:id', requireAdmin, (req, res) => {
  const db = readDB();
  const index = db.events.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Event not found' });

  const updated = {
    ...db.events[index],
    ...req.body,
    id: db.events[index].id,
    updatedAt: new Date().toISOString()
  };
  db.events[index] = updated;
  writeDB(db);
  res.json(updated);
});


router.delete('/:id', requireAdmin, (req, res) => {
  const db = readDB();
  const event = db.events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ error: 'Event not found' });

  db.events = db.events.filter(e => e.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ message: 'Event deleted', id: parseInt(req.params.id) });
});

module.exports = router;