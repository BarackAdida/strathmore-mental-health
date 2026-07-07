import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Events.css'

const API_BASE = 'http://localhost:5000/api';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    location: '',
    time: '',
    price: '',
    tag: '',
    date: { day: '', mon: '' }
  });

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (isMounted.current) setUser(data);
      }
    } catch {
      // silently fail
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/events`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      if (isMounted.current) {
        setEvents(data);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    // These functions are async and safe – the warnings are suppressed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateDay' || name === 'dateMon') {
      const key = name === 'dateDay' ? 'day' : 'mon';
      setFormData(prev => ({
        ...prev,
        date: { ...prev.date, [key]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const openAddForm = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      desc: '',
      location: '',
      time: '',
      price: '',
      tag: '',
      date: { day: '', mon: '' }
    });
    setShowForm(true);
  };

  const openEditForm = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      desc: event.desc || '',
      location: event.location || '',
      time: event.time || '',
      price: event.price || '',
      tag: event.tag || '',
      date: { day: event.date.day, mon: event.date.mon }
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      title: formData.title,
      desc: formData.desc,
      location: formData.location,
      time: formData.time,
      price: formData.price,
      tag: formData.tag,
      date: { day: formData.date.day, mon: formData.date.mon }
    };

    try {
      const url = editingEvent
        ? `${API_BASE}/events/${editingEvent.id}`
        : `${API_BASE}/events`;
      const method = editingEvent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(eventData)
      });
      if (!res.ok) throw new Error('Failed to save event');
      const saved = await res.json();

      if (isMounted.current) {
        if (editingEvent) {
          setEvents(events.map(e => e.id === saved.id ? saved : e));
        } else {
          setEvents([...events, saved]);
        }
        setShowForm(false);
      }
    } catch (err) {
      if (isMounted.current) alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete');
      if (isMounted.current) {
        setEvents(events.filter(e => e.id !== id));
      }
    } catch (err) {
      if (isMounted.current) alert(err.message);
    }
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const isAdmin = user && user.isAdmin === true;

  return (
    <main className="events">
      <section className="events-hero">
        <div className="section-inner">
          <div className="section-label">Wellness Events</div>
          <h1>Healing happens in community too</h1>
          <p>From mindfulness workshops to exam-season wind-downs, these are spaces to breathe, connect, and look after yourself outside the app. Tickets are issued instantly and check-in stays anonymous.</p>
        </div>
      </section>

      <section className="events-grid-section">
        <div className="section-inner">
          {isAdmin && (
            <div className="admin-bar">
              <button className="btn-add" onClick={openAddForm}>+ Add Event</button>
            </div>
          )}

          <div className="events-grid">
            {events.length === 0 && <p className="no-events">No events scheduled yet.</p>}
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-date">
                  <span className="event-day">{event.date.day}</span>
                  <span className="event-mon">{event.date.mon}</span>
                </div>
                <div className="event-body">
                  {event.tag && <span className="event-tag">{event.tag}</span>}
                  <h3>{event.title}</h3>
                  <p>{event.desc}</p>
                  <div className="event-meta">
                    <span>📍 {event.location}</span>
                    <span>🕒 {event.time}</span>
                  </div>
                  <div className="event-footer">
                    <span className="event-price">{event.price}</span>
                    {isAdmin ? (
                      <div className="admin-actions">
                        <button className="btn-edit" onClick={() => openEditForm(event)}>✏️ Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(event.id)}>🗑️ Delete</button>
                      </div>
                    ) : (
                      <button className="btn-ghost event-btn">Get Ticket</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="events-cta">
        <div className="section-inner">
          <h2>Hosting a wellness event on campus?</h2>
          <p>Student clubs, faculties, and the Student Welfare office can list events and manage ticketing directly through the platform.</p>
          <Link to="/contact" className="btn-primary">Propose an Event</Link>
        </div>
      </section>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input
                  name="title"
                  placeholder="Event Title *"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <input
                  name="tag"
                  placeholder="Tag (e.g. Workshop)"
                  value={formData.tag}
                  onChange={handleChange}
                />
                <div className="date-group">
                  <input
                    name="dateDay"
                    placeholder="Day (e.g. 08)"
                    value={formData.date.day}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="dateMon"
                    placeholder="Month (e.g. JUL)"
                    value={formData.date.mon}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <input
                  name="time"
                  placeholder="Time (e.g. 4:00 PM – 5:30 PM)"
                  value={formData.time}
                  onChange={handleChange}
                />
                <input
                  name="price"
                  placeholder="Price (e.g. Free for students)"
                  value={formData.price}
                  onChange={handleChange}
                />
                <textarea
                  name="desc"
                  placeholder="Description"
                  value={formData.desc}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {editingEvent ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Events;