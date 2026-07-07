import { Link } from 'react-router-dom';
import '../Styles/Events.css'

const events = [
  {
    date: { day: '08', mon: 'JUL' },
    title: 'Mindfulness & Movement Workshop',
    desc: 'A gentle introduction to breathing techniques and movement-based stress release, led by a Strathmore counselor.',
    location: 'Wellness Garden, Block C',
    time: '4:00 PM – 5:30 PM',
    price: 'Free for students',
    tag: 'Workshop',
  },
  {
    date: { day: '15', mon: 'JUL' },
    title: 'Exam Season Wind-Down',
    desc: 'Music, journaling stations, and a guided relaxation session to help you decompress before finals week begins.',
    location: 'Student Centre Lawn',
    time: '2:00 PM – 6:00 PM',
    price: 'KES 200',
    tag: 'Community',
  },
  {
    date: { day: '22', mon: 'JUL' },
    title: 'Peer Support Volunteer Training',
    desc: 'A half-day training for students interested in becoming certified peer listeners on the platform.',
    location: 'Lecture Hall 4',
    time: '9:00 AM – 1:00 PM',
    price: 'Free, limited seats',
    tag: 'Training',
  },
  {
    date: { day: '02', mon: 'AUG' },
    title: 'Art Therapy Pop-Up',
    desc: 'Drop in any time — no experience needed. Paint, sketch, or just sit with others in a low-pressure creative space.',
    location: 'Block A Atrium',
    time: '11:00 AM – 4:00 PM',
    price: 'Free for students',
    tag: 'Wellbeing',
  },
];

function Events() {
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
          <div className="events-grid">
            {events.map((e, i) => (
              <div key={i} className="event-card">
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
                    <Link
                      to="/ticket"
                      state={{ event: e }}
                      className="btn-ghost event-btn"
                    >
                      Get Ticket
                    </Link>
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

    </main>
  );
}

export default Events;
