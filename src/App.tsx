import React, { useEffect, useState } from 'react';
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

function App() {
  const [userStatus, setUserStatus] = useState<'loading' | 'found' | 'not-found'>('loading');

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data.error) setUserStatus('not-found');
        else setUserStatus('found');
      })
      .catch(() => setUserStatus('not-found'));
  }, []);

  if (userStatus === 'loading') {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div style={{ color: 'var(--accent-cyan)' }}>Initializing AETOS FIT...</div>
    </div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={userStatus === 'found' ? <Navigate to="/" /> : <Onboarding />} />
        <Route path="/active-workout" element={userStatus === 'not-found' ? <Navigate to="/onboarding" /> : <ActiveWorkout />} />
        <Route path="/" element={userStatus === 'not-found' ? <Navigate to="/onboarding" /> : <MainLayout />}>
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
