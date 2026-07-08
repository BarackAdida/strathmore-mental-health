import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../context/hook/useLocalStorage';
import '../Styles/Dashboard.css';

const MOODS = ['😊', '😢', '😡', '😐', '😍'];

function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [mood, setMood] = useLocalStorage('userMood', '😊');
  const [bookings] = useLocalStorage('bookings', []);
  const [events] = useLocalStorage('events', []);
  const [appointments] = useLocalStorage('appointments', []); // assume stored as array of appointment objects

  // If not logged in, redirect to login
  if (!currentUser) {
    navigate('/');
    return null;
  }

  // Get the list of booked event objects
  const bookedEvents = events.filter(e => bookings.includes(e.id));

  // Handle mood change
  const handleMoodSelect = (emoji) => {
    setMood(emoji);
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <main className="dashboard">
      {/* Header: username + mood */}
      <section className="dashboard-header">
        <div className="section-inner">
          <div className="user-greeting">
            <h2>Hello, {currentUser.username}!</h2>
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

      {/* My Booked Events */}
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

      {/* My Appointments */}
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
              {appointments.map((appt, idx) => (
                <div key={idx} className="appointment-card">
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
    </main>
  );
}

export default Dashboard;