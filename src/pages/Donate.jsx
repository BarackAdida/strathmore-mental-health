import { useState } from 'react';
import '../Styles/Donate.css'

const amounts = [500, 1000, 2500, 5000];

const impact = [
  { icon: '🗓️', title: 'Counselor sessions', desc: 'Subsidizes free sessions for students who can\'t afford the small platform fee.' },
  { icon: '📰', title: 'Mental health newsletter', desc: 'Keeps the Basic subscription free for every student, every semester.' },
  { icon: '🎟️', title: 'Wellness events', desc: 'Funds workshops, peer training, and campus mental health days.' },
  { icon: '🆘', title: 'Crisis response', desc: 'Keeps the 24/7 crisis line staffed and accessible to all students.' },
];

function Donate() {
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState('');
  const [frequency, setFrequency] = useState('once');

  function handleAmountClick(amt) {
    setSelected(amt);
    setCustom('');
  }

  function handleCustomChange(e) {
    setCustom(e.target.value);
    setSelected(null);
  }

  const finalAmount = custom || selected || 0;

  return (
    <main className="donate">

      <section className="donate-hero">
        <div className="section-inner">
          <div className="section-label">Give Back</div>
          <h1>Help keep support free and anonymous</h1>
          <p>Strathmore Mental Health relies on university subscriptions, grants, and gifts from people like you to stay free for every student who needs it. Every shilling goes directly back into student care.</p>
        </div>
      </section>

      <section className="donate-body">
        <div className="section-inner donate-grid">

          <div className="donate-form-wrap">
            <h2>Make a gift</h2>

            <div className="freq-toggle">
              <button
                className={frequency === 'once' ? 'freq-btn active' : 'freq-btn'}
                onClick={() => setFrequency('once')}
              >
                One-time
              </button>
              <button
                className={frequency === 'monthly' ? 'freq-btn active' : 'freq-btn'}
                onClick={() => setFrequency('monthly')}
              >
                Monthly
              </button>
            </div>

            <div className="amount-grid">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  className={selected === amt ? 'amount-btn active' : 'amount-btn'}
                  onClick={() => handleAmountClick(amt)}
                >
                  KES {amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="custom-amount">
              <label htmlFor="custom">Or enter a custom amount</label>
              <div className="custom-input-wrap">
                <span>KES</span>
                <input
                  id="custom"
                  type="number"
                  min="1"
                  placeholder="0"
                  value={custom}
                  onChange={handleCustomChange}
                />
              </div>
            </div>

            <button className="btn-primary donate-submit">
              Donate KES {Number(finalAmount).toLocaleString()} {frequency === 'monthly' ? '/ month' : ''}
            </button>
            <p className="form-note">Payments are processed securely. You'll receive a confirmation and receipt by email.</p>
          </div>

          <div className="donate-impact">
            <h2>Where your gift goes</h2>
            <div className="impact-list">
              {impact.map((item, i) => (
                <div key={i} className="impact-item">
                  <div className="impact-icon">{item.icon}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="org-box">
              <div className="org-title">🏛️ Prefer to give institutionally?</div>
              <p>NGOs, companies, and alumni groups can set up grants or recurring program funding directly with the Student Welfare office.</p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

export default Donate;
