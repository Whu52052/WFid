import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestListPage from './pages/TestListPage';
import TestDetailPage from './pages/TestDetailPage';
import TestTakingPage from './pages/TestTakingPage';
import ResultPage from './pages/ResultPage';
import UserCenterPage from './pages/UserCenterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tests" element={<TestListPage />} />
          <Route path="/test/:testId" element={<TestDetailPage />} />
          <Route path="/test/:testId/start" element={<TestTakingPage />} />
          <Route path="/test/:testId/result/:sessionId" element={<ResultPage />} />
          <Route path="/user" element={<UserCenterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;