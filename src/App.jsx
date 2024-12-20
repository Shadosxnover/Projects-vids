import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Watch from './components/Watch';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0F0F0F]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;