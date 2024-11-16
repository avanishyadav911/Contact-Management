import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AddContact from './pages/AddContact';
import Contacts from './pages/Contacts';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <nav style={styles.navbar}>
        <Link to="/add-contact" style={styles.link}>Add Contact</Link>
        <Link to="/contacts" style={styles.link}>View Contacts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} /> {/* Redirect to contacts */}
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  link: {
    margin: '0 15px',
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
  }
};
export default App;
