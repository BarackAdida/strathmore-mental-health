import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorage } from '../context/hook/useLocalStorage';
import '../Styles/Events.css';

const DEFAULT_EVENTS = [
  {
    id: 1,
    date: { day: '08', mon: 'JUL' },
    title: 'Mindfulness & Movement Workshop',
    desc: 'A gentle introduction to breathing techniques and movement-based stress release, led by a Strathmore counselor.',
    location: 'Wellness Garden, Block C',
    time: '4:00 PM – 5:30 PM',
    price: 'Free for students',
    tag: 'Workshop',
  },
  // ... add your other default events here (id: 2, 3, 4)
];

function Events() {
  const [events] = useLocalStorage('events', DEFAULT_EVENTS);
  const [bookings, setBookings] = useLocalStorage('bookings', []);
  const [currentUser] = useLocalStorage('currentUser', null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleBookClick = (eventId) => {
    if (bookings.includes(eventId)) {
      alert('You have already booked this event.');
      return;
    }
    setSelectedEventId(eventId);
    setModalOpen(true);
  };

  const confirmBooking = () => {
    if (selectedEventId !== null) {
      setBookings([...bookings, selectedEventId]);
      setModalOpen(false);
      setSelectedEventId(null);
      alert('Booking confirmed!');
    }
  };

  const cancelBooking = () => {
    setModalOpen(false);
    setSelectedEventId(null);
  };

  const isBooked = (eventId) => bookings.includes(eventId);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <main className="events">
      {/* Hero – unchanged */}
      <section className="events-hero">
        <div className="section-inner">
          <div className="section-label">Wellness Events</div>
          <h1>Healing happens in community too</h1>
          <p>From mindfulness workshops to exam-season wind-downs, these are spaces to breathe, connect, and look after yourself outside the app. Tickets are issued instantly and check-in stays anonymous.</p>
        </div>
      </section>

      <section className="events-grid-section">
        <div className="section-inner">
          <div className="events-grid">
            {events.map((e) => (
              <div key={e.id} className="event-card">
                <div className="event-date">
                  <span className="event-day">{e.date.day}</span>
                  <span className="event-mon">{e.date.mon}</span>
                </div>
                <div className="event-body">
                  <span className="event-tag">{e.tag}</span>
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                  <div className="event-meta">
                    <span>📍 {e.location}</span>
                    <span>🕒 {e.time}</span>
                  </div>
                  <div className="event-footer">
                    <span className="event-price">{e.price}</span>
                    {isBooked(e.id) ? (
                      <span className="booked-badge">✓ Booked</span>
                    ) : (
                      <button
                        className="btn-ghost event-btn"
                        onClick={() => handleBookClick(e.id)}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section – replaced Admin Panel with Profile link */}
      <section className="events-cta">
        <div className="section-inner">
          <h2>View all your booked events</h2>
          <p>
            {currentUser
              ? `You are logged in as ${currentUser.username}. See your upcoming events in one place.`
              : 'Log in to access your personal dashboard and manage your event bookings.'}
          </p>
          {currentUser ? (
            <Link to="/profile" className="btn-primary">
              View in Profile
            </Link>
          ) : (
            <Link to="/authentication" className="btn-primary">
              Login to view your profile
            </Link>
          )}
        </div>
      </section>

      {/* Booking confirmation modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={cancelBooking}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Booking</h3>
            <p>
              Are you sure you want to book <strong>{selectedEvent?.title}</strong>?
            </p>
            <div className="modal-actions">
              <button className="modal-btn modal-cancel" onClick={cancelBooking}>
                Cancel
              </button>
              <button className="modal-btn modal-confirm" onClick={confirmBooking}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Events;