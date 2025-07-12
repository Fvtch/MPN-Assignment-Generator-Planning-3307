import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AssignmentGenerator from './components/AssignmentGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<AssignmentGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;