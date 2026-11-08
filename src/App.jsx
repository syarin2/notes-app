
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import SettingsPage from './pages/settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/notes" element={<Dashboard />} />
      <Route path="/favorites" element={<Dashboard />} />
      <Route path="/archive" element={<Dashboard />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
