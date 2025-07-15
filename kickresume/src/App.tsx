// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import { ToastProvider } from './contexts/ToastContext';

import LandingPage from './pages/LandingPage';
import TemplatesPage from './pages/TemplatesPage';
import EditorPage from './pages/EditorPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ToastProvider>
      </ResumeProvider>
    </AuthProvider>
  );
};

export default App;
