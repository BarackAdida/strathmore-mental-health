import { useEffect } from 'react';
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
import Dashboard from './components/Dashboard';
import AdminPage from './pages/Admin/AdminPage';

function App() {
   useEffect(() => {
    // Seed admin user if not present
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminUser = import.meta.env.VITE_ADMIN_USER;
    const adminPass = import.meta.env.VITE_ADMIN_PASS;

    const adminExists = users.some(u => u.username === adminUser);
    if (!adminExists && adminUser && adminPass) {
      users.push({
        username: adminUser,
        password: adminPass,
        role: 'admin',
      });
      localStorage.setItem('users', JSON.stringify(users));
      console.log('✅ Admin user seeded');
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<AuthApp />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminPage />} />
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
