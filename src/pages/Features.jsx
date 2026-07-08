import { useState } from 'react';
import '../Styles/Features.css';

const features = [
  {
    icon: '📅',
    title: 'Anonymous Counselor Booking',
    desc: 'Book a session with a MindBridge-licensed counselor using only your student ID. No names in public systems, no waiting room awkwardness.',
    tag: 'Privacy',
  },
  {
    icon: '🤝',
    title: 'Peer Support Matching',
    desc: 'Get matched with a trained student volunteer who has been through similar experiences on campus. Sometimes the best listener is a fellow student.',
    tag: 'Community',
  },
  {
    icon: '🆘',
    title: 'Crisis Resource Finder',
    desc: 'When things feel urgent, find real-time availability of counselors, on-campus crisis contacts, and emergency support in seconds.',
    tag: 'Safety',
  },
  {
    icon: '🌤️',
    title: 'Daily Mood Check-ins',
    desc: 'A gentle daily prompt that takes 10 seconds. Over time, patterns emerge — and the platform can alert your counselor if things seem off.',
    tag: 'Wellbeing',
  },
  {
    icon: '📊',
    title: 'Counselor Analytics Dashboard',
    desc: 'MindBridge team gets aggregate, anonymized insights to understand when and where students need more support.',
    tag: 'For Institutions',
  },
  {
    icon: '📲',
    title: 'WhatsApp & SMS Alerts',
    desc: 'Crisis notifications and appointment reminders reach you on the apps you already use — no extra downloads needed.',
    tag: 'Accessibility',
  },
];

const plans = [
  {
    name: 'Basic',
    price: '200',
    cadence: 'Good for Students',
    perk: 'Mental health newsletter — once a week',
    features: [
      'Full access to counselor booking & peer support',
      'Daily mood check-ins',
      'Weekly mental health newsletter',
      'Crisis Resource Finder',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: 'KES 600',
    cadence: 'per semester',
    perk: 'Mental health newsletter — three times a week',
    features: [
      'Everything in Basic',
      'Newsletter delivered 3× a week',
      'Priority counselor slots during exam season',
      'Early access to wellness events & ticketing',
    ],
    cta: 'Go Premium',
    highlight: true,
  },
];

function Features() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);          // 1: payment method, 2: confirm, 3: loading, 4: success
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedPlan, setSelectedPlan] = useState('');

  const openModal = (planName) => {
    setSelectedPlan(planName);
    setModalOpen(true);
    setStep(1);
    setPaymentMethod('card');
  };

  const closeModal = () => {
    setModalOpen(false);
    setStep(1);
    setPaymentMethod('card');
  };

  const handleConfirm = () => {
    setStep(3); // show loading
    // Simulate payment processing
    setTimeout(() => {
      setStep(4); // success
    }, 2500);
  };

  const renderModalContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3>Choose Payment Method</h3>
            <div className="modal-payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={paymentMethod === 'mpesa'}
                  onChange={() => setPaymentMethod('mpesa')}
                />
                M‑Pesa
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="airtel"
                  checked={paymentMethod === 'airtel'}
                  onChange={() => setPaymentMethod('airtel')}
                />
                Airtel Money
              </label>
            </div>
            <button
              className="btn-primary modal-next"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </>
        );

      case 2:
        return (
          <>
            <h3>Confirm Payment</h3>
            <div className="modal-summary">
              <p><strong>Plan:</strong> {selectedPlan}</p>
              <p><strong>Payment Method:</strong> {paymentMethod}</p>
              <p><strong>Amount:</strong> {selectedPlan === 'Premium' ? 'KES 300' : 'Free'}</p>
            </div>
            <button
              className="btn-primary modal-confirm"
              onClick={handleConfirm}
            >
              Confirm Payment
            </button>
          </>
        );

      case 3:
        return (
          <>
            <h3>Processing Payment...</h3>
            <div className="modal-spinner"></div>
            <p>Please wait a moment</p>
          </>
        );

      case 4:
        return (
          <>
            <div className="modal-success">
              <div className="checkmark-circle">
                <svg className="checkmark" viewBox="0 0 52 52">
                  <circle className="checkmark-circle-path" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" d="M14 27l7 7 16-16" />
                </svg>
              </div>
              <h3>Payment Confirmed!</h3>
              <p>You are now subscribed to <strong>{selectedPlan}</strong>.</p>
            </div>
            <button className="btn-primary modal-close" onClick={closeModal}>
              Done
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <main className="features">

      <section className="features-hero">
        <div className="section-inner">
          <div className="section-label">The Platform</div>
          <h1>Everything you need, nothing that exposes you</h1>
          <p>Strathmore Mental Health is built around one principle: removing every barrier between a student in distress and the support they need.</p>
        </div>
      </section>

      <section className="features-grid-section">
        <div className="section-inner">
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-top">
                  <span className="feature-icon">{f.icon}</span>
                  <span className="feature-tag">{f.tag}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plans-section">
        <div className="section-inner">
          <div className="section-label">Subscriptions</div>
          <h2>Stay informed, your way</h2>
          <p className="plans-intro">Every student gets full access to the platform for free. Subscriptions just control how often you hear from us — choose how much mental health content lands in your inbox.</p>
          <div className="plans-grid">
            {plans.map((p, i) => (
              <div key={i} className={`plan-card ${p.highlight ? 'plan-highlight' : ''}`}>
                {p.highlight && <div className="plan-badge">Most Popular</div>}
                <h3>{p.name}</h3>
                <div className="plan-price">
                  <span className="plan-amount">{p.price}</span>
                  <span className="plan-cadence">{p.cadence}</span>
                </div>
                <div className="plan-perk">📰 {p.perk}</div>
                <ul className="plan-features">
                  {p.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
                <button
                  className={p.highlight ? 'btn-primary' : 'btn-ghost'}
                  onClick={() => openModal(p.name)}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="highlight-feature">
        <div className="section-inner highlight-inner">
          <div className="highlight-text">
            <div className="section-label">Built for Exam Season</div>
            <h2>Support scales when you need it most</h2>
            <p>CATs, finals, project deadlines — Strathmore Mental Health detects when campus stress peaks and automatically adds counselor slots and peer volunteers. You're never left waiting when it matters most.</p>
          </div>
          <div className="highlight-visual">
            <div className="mini-card">
              <div className="mini-card-label">📈 This Week</div>
              <div className="mini-stat-row">
                <div className="mini-stat"><span>128</span> check-ins</div>
                <div className="mini-stat"><span>34</span> sessions booked</div>
                <div className="mini-stat"><span>12</span> peer matches</div>
              </div>
              <div className="mini-tag">CAT Week — extra counselor slots added ✅</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
            <div className="modal-body">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default Features;