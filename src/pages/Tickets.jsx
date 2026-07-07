import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; 
import '../Styles/Ticket.css';

function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'card', 
  });

  const [showLoading, setShowLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [ticketData, setTicketData] = useState({ number: '', qrValueString: '' });

  useEffect(() => {
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  const isFree = event.price.toLowerCase().includes('free');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert('Please fill all fields');
      return;
    }

    setShowLoading(true);

    setTimeout(() => {
      setShowLoading(false);

      const randomTicket = 'TICK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const comprehensivePayload = {
        ticketNumber: randomTicket,
        eventTitle: event.title,
        eventVenue: event.location,
        eventDate: `${event.date.day} ${event.date.mon}`,
        eventTime: event.time,
        attendeeName: form.name,
        attendeeEmail: form.email,
        attendeePhone: form.phone
      };

      setTicketData({
        number: randomTicket,
        qrValueString: JSON.stringify(comprehensivePayload)
      });

      setShowConfirmation(true);
    }, 3000);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    navigate('/events');
  };

  return (
    <main className="ticket-page">
      <div className="ticket-container">
        <h1>Book Your Ticket</h1>

        <div className="event-summary">
          <h2>{event.title}</h2>
          <p>
            <strong>Date:</strong> {event.date.day} {event.date.mon}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Price:</strong> {event.price}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {!isFree && (
            <div className="form-group">
              <label>Payment Method *</label>
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={form.paymentMethod === 'mpesa'}
                    onChange={handleChange}
                  />
                  M-Pesa
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="airtel"
                    checked={form.paymentMethod === 'airtel'}
                    onChange={handleChange}
                  />
                  Airtel Money
                </label>
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary">
            {isFree ? 'Book Now' : 'Confirm & Pay'}
          </button>
        </form>
      </div>

      {showLoading && (
        <div className="modal-overlay">
          <div className="modal loading-modal">
            <div className="spinner"></div>
            <h3>Processing {isFree ? 'Booking' : 'Payment'}...</h3>
            <p>Please wait a moment</p>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal confirmation-modal">
            <h2>🎉 Ticket Booked!</h2>
            <p>
              <strong>Ticket Number:</strong> {ticketData.number}
            </p>
            <div className="qr-code">
              <QRCodeSVG value={ticketData.qrValueString} size={180} level="M" />
            </div>
            <p className="qr-hint">Scan this QR code at the event entrance</p>
            <button onClick={closeConfirmation} className="btn-primary">
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Ticket;