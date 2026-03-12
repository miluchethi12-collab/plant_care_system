import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import YourPlants from './pages/YourPlants';
import Login from './pages/Login';
import Admin from './pages/Admin';

import './styles/globals.css';

function App() {
  // keep track of logged-in user (null when not authenticated)
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/plants" element={<YourPlants user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/admin" element={<Admin user={user} />} />
        {/* future routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
