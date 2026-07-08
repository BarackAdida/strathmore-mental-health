import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../context/hook/useLocalStorage';
import '../Styles/AdminPage.css';

function AdminPage() {
  const navigate = useNavigate();
  const [currentUser] = useLocalStorage('currentUser', null);
  const [events, setEvents] = useLocalStorage('events', []);
  const [psychologists, setPsychologists] = useLocalStorage('psychologists', [
    'Dr. Jane Kamau',
    'Dr. Peter Ochieng',
    'Dr. Mary Akinyi',
    'Dr. James Mwangi',
    'Dr. Sarah Wanjiru',
  ]);

  // Protect route: only admin
  useEffect(() => {
    if (!currentUser || currentUser.username !== 'admin') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // --- Event state ---
  const [eventForm, setEventForm] = useState({
    title: '',
    desc: '',
    location: '',
    time: '',
    price: '',
    tag: '',
    day: '',
    mon: '',
  });

  const handleEventChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const { title, desc, location, time, price, tag, day, mon } = eventForm;
    if (!title || !desc || !location || !time || !price || !tag || !day || !mon) {
      alert('Please fill all event fields.');
      return;
    }
    const newEvent = {
      id: Date.now(),
      date: { day, mon: mon.toUpperCase() },
      title,
      desc,
      location,
      time,
      price,
      tag,
    };
    setEvents([...events, newEvent]);
    setEventForm({
      title: '',
      desc: '',
      location: '',
      time: '',
      price: '',
      tag: '',
      day: '',
      mon: '',
    });
    alert('Event added successfully!');
  };

  // --- Psychologist state ---
  const [newPsychologist, setNewPsychologist] = useState('');

  const handlePsychSubmit = (e) => {
    e.preventDefault();
    const name = newPsychologist.trim();
    if (!name) {
      alert('Please enter a psychologist name.');
      return;
    }
    if (psychologists.includes(name)) {
      alert('This psychologist already exists.');
      return;
    }
    setPsychologists([...psychologists, name]);
    setNewPsychologist('');
    alert('Psychologist added successfully!');
  };

  // --- Delete psychologist (optional) ---
  const deletePsychologist = (name) => {
    if (window.confirm(`Remove ${name}?`)) {
      setPsychologists(psychologists.filter(p => p !== name));
    }
  };

  // --- Delete event (optional) ---
  const deleteEvent = (id) => {
    if (window.confirm('Delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <p className="admin-subtitle">Manage events, psychologists, and more.</p>

        <div className="admin-grid">
          {/* ----- Add Event ----- */}
          <section className="admin-section">
            <h2>➕ Add New Event</h2>
            <form onSubmit={handleEventSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={eventForm.title}
                    onChange={handleEventChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tag (e.g. Workshop)</label>
                  <input
                    type="text"
                    name="tag"
                    value={eventForm.tag}
                    onChange={handleEventChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="desc"
                  rows="2"
                  value={eventForm.desc}
                  onChange={handleEventChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={eventForm.location}
                    onChange={handleEventChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time (e.g. 4:00 PM – 5:30 PM)</label>
                  <input
                    type="text"
                    name="time"
                    value={eventForm.time}
                    onChange={handleEventChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    value={eventForm.price}
                    onChange={handleEventChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Day (e.g. 08)</label>
                  <input
                    type="text"
                    name="day"
                    value={eventForm.day}
                    onChange={handleEventChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Month (e.g. JUL)</label>
                  <input
                    type="text"
                    name="mon"
                    value={eventForm.mon}
                    onChange={handleEventChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="admin-btn">Add Event</button>
            </form>

            {/* List existing events */}
            <div className="existing-list">
              <h3>Existing Events ({events.length})</h3>
              {events.length === 0 ? (
                <p>No events yet.</p>
              ) : (
                <ul>
                  {events.map(e => (
                    <li key={e.id}>
                      <span>{e.title} – {e.date.day} {e.date.mon}</span>
                      <button onClick={() => deleteEvent(e.id)} className="delete-btn">✕</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* ----- Add Psychologist ----- */}
          <section className="admin-section">
            <h2>👤 Add Psychologist</h2>
            <form onSubmit={handlePsychSubmit} className="admin-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newPsychologist}
                  onChange={(e) => setNewPsychologist(e.target.value)}
                  placeholder="e.g. Dr. Grace Achieng"
                  required
                />
              </div>
              <button type="submit" className="admin-btn">Add Psychologist</button>
            </form>

            {/* List existing psychologists */}
            <div className="existing-list">
              <h3>Existing Psychologists ({psychologists.length})</h3>
              {psychologists.length === 0 ? (
                <p>No psychologists added yet.</p>
              ) : (
                <ul>
                  {psychologists.map(name => (
                    <li key={name}>
                      <span>{name}</span>
                      <button onClick={() => deletePsychologist(name)} className="delete-btn">✕</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default AdminPage;