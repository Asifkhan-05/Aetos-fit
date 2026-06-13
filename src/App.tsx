import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import Dashboard from './Dashboard';
import MuscleMap from './MuscleMap';
import WorkoutGenerator from './WorkoutGenerator';
import Statistics from './Statistics';
import ExerciseLibrary from './ExerciseLibrary';
import Onboarding from './Onboarding';
import ProgressTracker from './ProgressTracker';
import RecoveryTracker from './RecoveryTracker';
import ActiveWorkout from './ActiveWorkout';
import { useAuth } from './context/AuthContext';

function App() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ color: 'var(--accent-cyan)' }}>Authenticating AETOS FIT...</div>
      </div>
    );
  }

  // If no profile exists, they must go through onboarding
  const isSetup = !!profile;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={isSetup ? <Navigate to="/" /> : <Onboarding />} />
        <Route path="/active-workout" element={!isSetup ? <Navigate to="/onboarding" /> : <ActiveWorkout />} />
        <Route path="/" element={!isSetup ? <Navigate to="/onboarding" /> : <MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="muscle-map" element={<MuscleMap />} />
          <Route path="workout-generator" element={<WorkoutGenerator />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="exercises" element={<ExerciseLibrary />} />
          <Route path="progress" element={<ProgressTracker />} />
          <Route path="recovery" element={<RecoveryTracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
