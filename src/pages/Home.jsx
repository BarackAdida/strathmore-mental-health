import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import mindbridgeImg from '../assets/mindbridge.png';
import eventsImg from '../assets/events.png';
import subscriptionsImg from '../assets/subscriptions.png';

const useAuth = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

const stats = [
  { number: '1 in 4', label: 'Kenyan university students experience anxiety or depression' },
  { number: '72%',    label: 'Never seek help due to stigma or lack of access' },
  { number: '5,000+', label: 'Students who deserve better support' },
];

const featuresList = [
  {
    icon: '🔒',
    title: 'Fully Anonymous',
    desc: 'Book a counselor without anyone seeing you walk into an office. Your identity stays yours.',
    link: '/book-appointment',
    actionText: 'Book Private Session'
  },
  {
    icon: '🤝',
    title: 'Peer Support & Community',
    desc: 'Connect with trained fellow peers who understand campus life firsthand and attend group safe-spaces.',
    link: '/events',
    actionText: 'View Upcoming Events'
  },
  {
    icon: '📱',
    title: 'Always Available',
    desc: 'Daily mood check-ins, crisis resources, and real-time counselor availability — in your pocket.',
    link: '/features',
    actionText: 'Explore Features'
  },
];

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [moodModalOpen, setMoodModalOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');

  const handleDashboardRedirect = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/authentication');
    }
  };

  const handleMoodClick = (emoji) => {
    setSelectedMood(emoji);
    setMoodModalOpen(true);
  };

  const closeModal = () => {
    setMoodModalOpen(false);
    setSelectedMood('');
  };

  const handleTalkYes = () => {
    closeModal();
    navigate('/book-appointment');
  };

  return (  
    <main className="home-container">

      <section className="hero-split">
        <div className="hero-text-content">
          <div className="hero-eyebrow-tag">MindBridge Mental Health</div>
          <h1>You don't have to carry campus life alone.</h1>
          <p>Anonymously connect with certified university counselors, find peer support networks, and access mental health resources tailored for you.</p>
          
          <div className="hero-action-cluster">
            <button onClick={handleDashboardRedirect} className="btn-primary-large">
              {isAuthenticated ? 'Go to My Dashboard' : 'Get Started (Join MindBridge)'}
            </button>
            <Link to="/book-appointment" className="btn-secondary-large">Talk to Someone Now</Link>
          </div>

          <div className="hero-subtext-links">
            <span>Already a member?</span> 
            <Link to="/authentication" className="text-link">Login here</Link>
          </div>
        </div>

        <div className="hero-image-side">
          <div className="main-hero-illustration">
            <img src={mindbridgeImg} alt="MindBridge Concept Illustration" className="hero-inserted-img" />
            <div className="img-overlay-badge">🧠 Bridging Minds, Saving Lives</div>
          </div>
          
          <div className="floating-mood-card">
            <h4>Today's check-in</h4>
            <div className="mood-emoji-row">
              {['😔','😐','🙂','😊','😄'].map((e, i) => (
                <button key={i} className="mood-emoji-btn" onClick={() => handleMoodClick(e)}>
                  {e}
                </button>
              ))}
            </div>
            <p className="mood-card-sub">How are you feeling today? It's okay to say.</p>
          </div>
        </div>
      </section>

      <section className="metrics-bar">
        <div className="metrics-grid">
          {stats.map((s, i) => (
            <div key={i} className="metric-card">
              <span className="metric-huge-num">{s.number}</span>
              <p className="metric-desc">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="platform-features-section">
        <div className="section-header-centered">
          <h2>Care that fits around your life at the University</h2>
          <p>Explore our tools built exclusively to handle exam stress, relationships, anxiety, and everything in between.</p>
        </div>

        <div className="features-showcase-grid">
          {featuresList.map((item, index) => (
            <div key={index} className="feature-interactive-card">
              <div className="feature-icon-wrapper">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <Link to={item.link} className="feature-card-action-btn">
                {item.actionText} <span>➔</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="community-split-section">
        <div className="split-side community-events-box">
          <div className="split-image-container">
            <img src={eventsImg} alt="Campus Events Illustration" className="split-inserted-img" />
          </div>
          <div className="split-content">
            <h3>Safe Spaces & Peer Events</h3>
            <p>Join group talk therapy, campus mental health panels, and mindfulness sessions run by peers.</p>
            <Link to="/events" className="btn-accent-outline">Browse Campus Events</Link>
          </div>
        </div>

        <div className="split-side premium-features-box">
          <div className="split-image-container">
            <img src={subscriptionsImg} alt="MindBridge Subscriptions Premium Illustration" className="split-inserted-img" />
          </div>
          <div className="split-content">
            <h3>Unlock Premium MindBridge Features</h3>
            <p>Get unlimited access to cognitive behavioral therapy (CBT) workbooks, audio relaxation tracks, and priority queues.</p>
            <Link to="/features" className="btn-accent-solid">Explore Premium Plans</Link>
          </div>
        </div>
      </section>

      <section className="donation-impact-banner">
        <div className="donation-banner-image-mesh"></div>
        <div className="donation-banner-content">
          <h2>Help Us Keep MindBridge Free & Accessible</h2>
          <p>Every single contribution goes directly toward paying student peer counselors and scaling server architectures to maintain complete identity anonymity for thousands of Kenyan students.</p>
          <div className="donation-button-group">
            <Link to="/donate" className="btn-donation-primary">Make a Secure Donation</Link>
            <span className="donation-impact-metric">Over 5,000+ Students supported this semester alone.</span>
          </div>
        </div>
      </section>

      {moodModalOpen && (
        <div className="modal-overlay-backdrop" onClick={closeModal}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-graphic-header">✨ You logged: {selectedMood}</div>
            <h2>Want a safe space to talk it through?</h2>
            <p>No judgments, no tracking, completely confidential. We can pair you up with an online peer or counselor right away.</p>
            <div className="modal-cta-buttons">
              <button className="btn-modal-confirm" onClick={handleTalkYes}>
                Yes, connect me anonymously
              </button>
              <button className="btn-modal-dismiss" onClick={closeModal}>
                No, just checking in
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default Home;