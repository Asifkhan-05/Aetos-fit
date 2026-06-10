import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Play, CheckCircle2, FastForward, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const [protocol, setProtocol] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aetos_active_protocol');
    if (saved) {
      setProtocol(JSON.parse(saved));
    }
  }, []);

  const handleSetDone = () => {
    const currentEx = protocol[currentIndex];
    const newCompletedSets = completedSets + 1;
    
    if (newCompletedSets >= currentEx.sets) {
      handleNextExercise();
    } else {
      setCompletedSets(newCompletedSets);
    }
  };

  const handleNextExercise = () => {
    if (currentIndex + 1 >= protocol.length) {
      finishWorkout();
    } else {
      setCurrentIndex(prev => prev + 1);
      setCompletedSets(0);
    }
  };

  const finishWorkout = () => {
    setIsCompleted(true);
    
    // Calculate total stats
    let totalVolume = 0;
    let totalReps = 0;
    
    protocol.forEach(ex => {
      // Assuming a mock weight of 50 lbs if not specified
      totalVolume += (ex.sets * ex.reps * 50);
      totalReps += (ex.sets * ex.reps);
    });

    const energyBurned = totalReps * 5;
    const xpGained = totalReps * 15;

    // Update global stats
    const currentVolume = parseInt(localStorage.getItem('aetos_stat_volume') || '0');
    const currentEnergy = parseInt(localStorage.getItem('aetos_stat_energy') || '0');
    const currentXp = parseInt(localStorage.getItem('aetos_stat_xp') || '0');
    const currentWorkouts = parseInt(localStorage.getItem('aetos_stat_workouts') || '0');
    const consistencyStr = localStorage.getItem('aetos_stat_consistency') || '[0,0,0,0,0,0,0]';
    let consistency = JSON.parse(consistencyStr);

    const newVolume = currentVolume + totalVolume;
    const newEnergy = currentEnergy + energyBurned;
    const newXp = currentXp + xpGained;
    const newLevel = Math.floor(newXp / 1000) + 1;
    
    const day = new Date().getDay();
    const todayIndex = day === 0 ? 6 : day - 1; // Mon = 0, Sun = 6
    consistency[todayIndex] = Math.min(100, consistency[todayIndex] + 20);

    localStorage.setItem('aetos_stat_volume', newVolume.toString());
    localStorage.setItem('aetos_stat_energy', newEnergy.toString());
    localStorage.setItem('aetos_stat_xp', newXp.toString());
    localStorage.setItem('aetos_stat_level', newLevel.toString());
    localStorage.setItem('aetos_stat_workouts', (currentWorkouts + 1).toString());
    localStorage.setItem('aetos_stat_consistency', JSON.stringify(consistency));
    
    // Clear active protocol
    localStorage.removeItem('aetos_active_protocol');
  };

  const returnToDashboard = () => {
    navigate('/');
  };

  if (protocol.length === 0) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <Dumbbell size={48} color="var(--text-muted)" />
        <h2 style={{ color: 'var(--text-secondary)' }}>No Active Protocol Found</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>Return to Dashboard</button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}>
          <CheckCircle2 size={48} color="#10b981" />
        </div>
        <h1 className="text-gradient" style={{ fontSize: '36px' }}>Protocol Completed</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Your biometric data has been updated.</p>
        <button className="btn-primary" onClick={returnToDashboard} style={{ marginTop: '24px', padding: '16px 32px', fontSize: '18px' }}>
          <Activity /> Return to Dashboard
        </button>
      </motion.div>
    );
  }

  const currentExercise = protocol[currentIndex];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '32px', position: 'relative', overflow: 'hidden' }}>
      {/* Background aesthetics */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--accent-purple)', filter: 'blur(200px)', opacity: 0.1, borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'var(--accent-cyan)', filter: 'blur(200px)', opacity: 0.1, borderRadius: '50%' }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, marginBottom: '48px' }}>
        <div>
          <span style={{ color: 'var(--accent-cyan)', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Live Execution</span>
          <h1 style={{ fontSize: '32px', margin: '8px 0 0 0' }}>AETOS Active Protocol</h1>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
          Exercise {currentIndex + 1} of {protocol.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
        >
          <div className="glass-panel" style={{ padding: '64px', width: '100%', maxWidth: '600px', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '60px', background: 'var(--bg-primary)', border: '2px solid var(--accent-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--accent-cyan)' }}>
              <Dumbbell color="var(--accent-cyan)" />
            </div>
            
            <h2 style={{ fontSize: '42px', marginBottom: '16px', color: 'white' }}>{currentExercise.name}</h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', margin: '32px 0 48px 0' }}>
              <div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Target Reps</div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--accent-purple)', textShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}>{currentExercise.reps}</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Sets Completed</div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--accent-cyan)', textShadow: '0 0 10px rgba(6, 182, 212, 0.5)' }}>
                  {completedSets} <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.3)' }}>/ {currentExercise.sets}</span>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '48px' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(completedSets / currentExercise.sets) * 100}%` }}
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))', boxShadow: '0 0 10px var(--accent-cyan)' }}
              ></motion.div>
            </div>

            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={handleSetDone} style={{ padding: '20px 48px', fontSize: '20px', borderRadius: '16px' }}>
                <CheckCircle2 size={24} /> Set Done
              </button>
              <button className="btn-secondary" onClick={handleNextExercise} style={{ padding: '20px 32px', fontSize: '18px', borderRadius: '16px', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                <FastForward size={20} /> Next
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ActiveWorkout;
