import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/BookAppointment.css';

const psychologists = [
  'Dr. Jane Kamau',
  'Dr. Peter Ochieng',
  'Dr. Mary Akinyi',
  'Dr. James Mwangi',
  'Dr. Sarah Wanjiru',
];

const peers = [
  'Alice Muthoni (Peer Counselor)',
  'Brian Odhiambo (Peer Counselor)',
  'Catherine Wanjiku (Peer Counselor)',
  'David Kiprop (Peer Counselor)',
];

function BookAppointment() {
  const navigate = useNavigate();

  const [appointmentType, setAppointmentType] = useState('peer');
  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type) => {
    setAppointmentType(type);
    if (type !== 'specific') setSelectedPsychologist('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      alert('Please fill in all required fields.');
      return;
    }
    if (appointmentType === 'specific' && !selectedPsychologist) {
      alert('Please select a psychologist.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
    }, 2500);
  };

  const closeConfirmation = () => {
    setConfirmed(false);
    navigate('/');
  };

  return (
    <main className="book-appointment-page">
      <div className="book-container">
        <h1>Book an Appointment</h1>
        <p className="subtitle">
          Choose the type of support you need. All sessions are confidential and
          free for Strathmore students.
        </p>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-section">
            <label className="section-label">Type of Appointment *</label>
            <div className="appointment-options">
              <button
                type="button"
                className={`option-btn ${appointmentType === 'peer' ? 'active' : ''}`}
                onClick={() => handleTypeChange('peer')}
              >
                <span className="option-icon">🤝</span>
                Peer Support
                <span className="option-desc">Talk to a trained student volunteer</span>
              </button>
              <button
                type="button"
                className={`option-btn ${appointmentType === 'random' ? 'active' : ''}`}
                onClick={() => handleTypeChange('random')}
              >
                <span className="option-icon">🎲</span>
                Random Psychologist
                <span className="option-desc">We’ll match you with an available counselor</span>
              </button>
              <button
                type="button"
                className={`option-btn ${appointmentType === 'specific' ? 'active' : ''}`}
                onClick={() => handleTypeChange('specific')}
              >
                <span className="option-icon">👤</span>
                Specific Psychologist
                <span className="option-desc">Choose your preferred counselor</span>
              </button>
            </div>
          </div>

          {appointmentType === 'specific' && (
            <div className="form-group">
              <label htmlFor="psychologist">Select Psychologist *</label>
              <select
                id="psychologist"
                value={selectedPsychologist}
                onChange={(e) => setSelectedPsychologist(e.target.value)}
                required
              >
                <option value="">— Choose —</option>
                {psychologists.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          )}

          {appointmentType === 'peer' && (
            <div className="form-group peer-info">
              <label>Available Peer Counselors</label>
              <ul>
                {peers.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="hint">You will be matched with one of them based on availability.</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Preferred Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Preferred Time *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any specific concerns or preferences..."
            />
          </div>

          <button type="submit" className="btn-primary submit-btn">
            Book Appointment
          </button>
        </form>
      </div>

      {loading && (
        <div className="modal-overlay">
          <div className="modal loading-modal">
            <div className="spinner"></div>
            <h3>Booking your appointment...</h3>
            <p>Please wait a moment</p>
          </div>
        </div>
      )}

      {confirmed && (
        <div className="modal-overlay">
          <div className="modal confirmation-modal">
            <div className="checkmark-circle">
              <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark-circle-path" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark-check" d="M14 27l7 7 16-16" />
              </svg>
            </div>
            <h2>Appointment Booked!</h2>
            <p>
              Your appointment has been confirmed. You will receive a confirmation
              email with details.
            </p>
            <button onClick={closeConfirmation} className="btn-primary">
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default BookAppointment;