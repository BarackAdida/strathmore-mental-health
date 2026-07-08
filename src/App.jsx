import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Events from './pages/Events';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Ticket from './pages/Tickets';
import BookAppointment from './pages/BookAppointment';
import AuthApp from './auth/AuthApp';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<AuthApp />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/events" element={<Events />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
