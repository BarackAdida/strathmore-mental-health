import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../context/hook/useLocalStorage';
import '../Styles/Dashboard.css';

const MOODS = ['😊', '😢', '😡', '😐', '😍'];

function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [mood, setMood] = useLocalStorage('userMood', '😊');
  const [bookings, setBookings] = useLocalStorage('bookings', []);
  const [events] = useLocalStorage('events', []);
  const [appointments, setAppointments] = useLocalStorage('appointments', []);
  const [notes, setNotes] = useLocalStorage('notes', []);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelItem, setCancelItem] = useState(null);

  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');

  if (!currentUser) {
    navigate('/');
    return null;
  }

  const bookedEvents = events.filter(e => bookings.includes(e.id));

  const handleMoodSelect = (emoji) => setMood(emoji);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleCancelClick = (type, id, title) => {
    setCancelItem({ type, id, title });
    setCancelModalOpen(true);
    setCancelLoading(true);
    setCancelSuccess(false);

    setTimeout(() => {
      if (type === 'event') {
        setBookings(prev => prev.filter(b => b !== id));
      } else if (type === 'appointment') {
        setAppointments(prev => prev.filter(a => a.id !== id));
      } else if (type === 'note') {
        setNotes(prev => prev.filter(n => n.id !== id));
      }
      setCancelLoading(false);
      setCancelSuccess(true);

      setTimeout(() => {
        setCancelModalOpen(false);
        setCancelItem(null);
        setCancelSuccess(false);
      }, 1500);
    }, 1500);
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim()) {
      alert('Please write something.');
      return;
    }
    const newNote = {
      id: Date.now(),
      content: newNoteContent.trim(),
      createdAt: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
    setNewNoteContent('');
    setAddNoteModalOpen(false);
  };

  const deleteNote = (id) => {
    handleCancelClick('note', id, 'Note');
  };

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <div className="section-inner">
          <div className="user-greeting">
            <h2>
              Hello, {currentUser.username}!
              {currentUser.subscription && (
                <span className="subscription-badge">
                  {currentUser.subscription === 'Premium' ? '⭐ Premium' : '📖 Basic'}
                </span>
              )}
            </h2>
            <div className="mood-display">
              <span className="mood-label">How are you feeling today?</span>
              <div className="mood-selector">
                {MOODS.map((emoji) => (
                  <button
                    key={emoji}
                    className={`mood-btn ${mood === emoji ? 'active' : ''}`}
                    onClick={() => handleMoodSelect(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <span className="current-mood">Your mood: {mood}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      <section className="dashboard-events">
        <div className="section-inner">
          <div className="section-header">
            <h2>My Booked Events</h2>
            <Link to="/events" className="btn-ghost">Browse All Events →</Link>
          </div>
          {bookedEvents.length === 0 ? (
            <div className="empty-state">
              <p>You haven't booked any events yet.</p>
              <Link to="/events" className="btn-primary">Explore Events</Link>
            </div>
          ) : (
            <div className="events-grid">
              {bookedEvents.map((e) => (
                <div key={e.id} className="event-card compact">
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelClick('event', e.id, e.title)}
                    aria-label="Cancel booking"
                  >
                    ✕
                  </button>
                  <div className="event-date">
                    <span className="event-day">{e.date.day}</span>
                    <span className="event-mon">{e.date.mon}</span>
                  </div>
                  <div className="event-body">
                    <span className="event-tag">{e.tag}</span>
                    <h3>{e.title}</h3>
                    <div className="event-meta">
                      <span>📍 {e.location}</span>
                      <span>🕒 {e.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="dashboard-appointments">
        <div className="section-inner">
          <div className="section-header">
            <h2>My Appointments</h2>
            <Link to="/book-appointment" className="btn-ghost">Book New Appointment →</Link>
          </div>
          {appointments.length === 0 ? (
            <div className="empty-state">
              <p>You have no upcoming appointments.</p>
              <Link to="/book-appointment" className="btn-primary">Book Now</Link>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map((appt) => (
                <div key={appt.id} className="appointment-card">
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelClick('appointment', appt.id, appt.title)}
                    aria-label="Cancel appointment"
                  >
                    ✕
                  </button>
                  <div className="appt-date">
                    <span className="appt-day">{appt.day}</span>
                    <span className="appt-mon">{appt.month}</span>
                  </div>
                  <div className="appt-body">
                    <h4>{appt.title}</h4>
                    <p>{appt.description}</p>
                    <div className="appt-meta">
                      <span>🕒 {appt.time}</span>
                      <span>📍 {appt.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="dashboard-notes">
        <div className="section-inner">
          <div className="section-header">
            <h2>My Notes</h2>
            <button className="btn-ghost" onClick={() => setAddNoteModalOpen(true)}>
              + Add Note
            </button>
          </div>
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>You haven't written any notes yet.</p>
              <button className="btn-primary" onClick={() => setAddNoteModalOpen(true)}>
                Write a Note
              </button>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <div key={note.id} className="note-card">
                  <button
                    className="cancel-btn"
                    onClick={() => deleteNote(note.id)}
                    aria-label="Delete note"
                  >
                    ✕
                  </button>
                  <div className="note-body">
                    <p>{note.content}</p>
                    <span className="note-timestamp">{note.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {cancelModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content cancel-modal">
            {cancelLoading && (
              <>
                <div className="spinner"></div>
                <h3>Cancelling {cancelItem?.title}…</h3>
                <p>Please wait a moment</p>
              </>
            )}
            {cancelSuccess && (
              <>
                <div className="checkmark-circle">
                  <svg className="checkmark" viewBox="0 0 52 52">
                    <circle className="checkmark-circle-path" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark-check" d="M14 27l7 7 16-16" />
                  </svg>
                </div>
                <h2>Cancelled!</h2>
                <p>Your {cancelItem?.type} has been removed.</p>
              </>
            )}
          </div>
        </div>
      )}

      {addNoteModalOpen && (
        <div className="modal-overlay" onClick={() => setAddNoteModalOpen(false)}>
          <div className="modal-content note-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Write a Note</h3>
            <textarea
              className="note-textarea"
              rows="4"
              placeholder="What's on your mind?"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
            />
            <div className="modal-actions">
              <button className="modal-btn modal-cancel" onClick={() => setAddNoteModalOpen(false)}>
                Cancel
              </button>
              <button className="modal-btn modal-confirm" onClick={handleAddNote}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;