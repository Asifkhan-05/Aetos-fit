import React, { useState } from 'react';
import { Play, Activity, Target, Zap, Shield, Flame, Dumbbell, Brain, Droplets, Moon, ChevronRight, Clock, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  // Load state from localStorage or initialize to zero-state
  const [volume, setVolume] = useState(() => parseInt(localStorage.getItem('aetos_stat_volume') || '0'));
  const [energy, setEnergy] = useState(() => parseInt(localStorage.getItem('aetos_stat_energy') || '0'));
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('aetos_stat_xp') || '0'));
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('aetos_stat_level') || '1'));
  const [workoutsLogged, setWorkoutsLogged] = useState(() => parseInt(localStorage.getItem('aetos_stat_workouts') || '0'));
  const [consistency, setConsistency] = useState(() => JSON.parse(localStorage.getItem('aetos_stat_consistency') || '[0,0,0,0,0,0,0]'));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('aetos_stat_streak') || '0'));
  const [lastWorkoutDate, setLastWorkoutDate] = useState(() => localStorage.getItem('aetos_last_workout_date') || '');

  // Active Protocol State
  const [activeProtocol, setActiveProtocol] = useState(() => JSON.parse(localStorage.getItem('aetos_active_protocol') || 'null'));

  // Form State
  const [targetMuscle, setTargetMuscle] = useState('Chest');
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const s = parseInt(sets) || 0;
    const r = parseInt(reps) || 0;
    const w = parseInt(weight) || 50; // Default to 50lbs if weight omitted

    if (s === 0 || r === 0) return;

    const addedVolume = s * r * w;
    const addedEnergy = s * r * 5; // mock kcal burn
    const addedXp = s * r * 15;

    const newVolume = volume + addedVolume;
    const newEnergy = energy + addedEnergy;
    const newXp = xp + addedXp;
    const newLevel = Math.floor(newXp / 10000) + 1;
    const newWorkouts = workoutsLogged + 1;

    const day = new Date().getDay();
    const todayIndex = day === 0 ? 6 : day - 1; // Mon = 0, Sun = 6
    const newConsistency = [...consistency];
    newConsistency[todayIndex] = Math.min(100, newConsistency[todayIndex] + 20); // Cap at 100%

    // Streak logic
    const todayStr = new Date().toDateString();
    let newStreak = streak;
    if (lastWorkoutDate !== todayStr) {
      if (lastWorkoutDate === '') {
        newStreak = 1;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastWorkoutDate === yesterday.toDateString()) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }
      setLastWorkoutDate(todayStr);
      localStorage.setItem('aetos_last_workout_date', todayStr);
    }

    setVolume(newVolume);
    setEnergy(newEnergy);
    setXp(newXp);
    setLevel(newLevel);
    setWorkoutsLogged(newWorkouts);
    setConsistency(newConsistency);
    setStreak(newStreak);

    localStorage.setItem('aetos_stat_volume', newVolume.toString());
    localStorage.setItem('aetos_stat_energy', newEnergy.toString());
    localStorage.setItem('aetos_stat_xp', newXp.toString());
    localStorage.setItem('aetos_stat_level', newLevel.toString());
    localStorage.setItem('aetos_stat_workouts', newWorkouts.toString());
    localStorage.setItem('aetos_stat_consistency', JSON.stringify(newConsistency));
    localStorage.setItem('aetos_stat_streak', newStreak.toString());

    window.dispatchEvent(new Event('aetos_update'));

    setExercise('');
    setSets('');
    setReps('');
    setWeight('');
  };

  const xpPercentage = (xp % 10000) / 100;

  return (
    <div 
      style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', overflowX: 'hidden' }} 
      className="custom-scroll"
    >
      
      {/* ROW 1: Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        
        {/* Condensed Hero */}
        <motion.div whileHover={{ scale: 1.01 }} style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.2))',
          borderRadius: '24px',
          padding: '32px 48px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}>
          <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '400px', height: '400px', background: 'var(--accent-purple)', filter: 'blur(150px)', opacity: 0.3, borderRadius: '50%' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '12px', lineHeight: 1.1 }}>
              System Online.<br />
              <span className="text-gradient">Ready to Execute.</span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
              AETOS intelligence protocols loaded. Proceed with scheduled operations.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {activeProtocol ? (
                <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }} onClick={() => navigate('/active-workout')}>
                  <Play fill="white" size={16} />
                  Start Protocol
                </button>
              ) : (
                <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }} onClick={() => {
                  const muscles = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];
                  const selectedMuscle = muscles[Math.floor(Math.random() * muscles.length)];
                  const protocols: Record<string, any[]> = {
                    Chest: [{ name: 'Barbell Bench Press', sets: 4, reps: 10 }, { name: 'Incline Dumbbell Press', sets: 3, reps: 12 }, { name: 'Cable Crossovers', sets: 3, reps: 15 }, { name: 'Push-ups', sets: 3, reps: 20 }],
                    Back: [{ name: 'Deadlift', sets: 4, reps: 8 }, { name: 'Pull-ups', sets: 3, reps: 10 }, { name: 'Barbell Rows', sets: 3, reps: 12 }, { name: 'Lat Pulldowns', sets: 3, reps: 15 }],
                    Legs: [{ name: 'Squats', sets: 4, reps: 8 }, { name: 'Leg Press', sets: 3, reps: 12 }, { name: 'Romanian Deadlifts', sets: 3, reps: 12 }, { name: 'Calf Raises', sets: 4, reps: 15 }],
                    Shoulders: [{ name: 'Overhead Press', sets: 4, reps: 8 }, { name: 'Lateral Raises', sets: 4, reps: 15 }, { name: 'Front Raises', sets: 3, reps: 12 }, { name: 'Face Pulls', sets: 3, reps: 15 }],
                    Arms: [{ name: 'Barbell Curls', sets: 3, reps: 12 }, { name: 'Tricep Pushdowns', sets: 3, reps: 15 }, { name: 'Hammer Curls', sets: 3, reps: 12 }, { name: 'Overhead Tricep Extension', sets: 3, reps: 12 }]
                  };
                  const generated = protocols[selectedMuscle];
                  setActiveProtocol(generated);
                  localStorage.setItem('aetos_active_protocol', JSON.stringify(generated));
                }}>
                  <Play fill="white" size={16} />
                  Initialize Protocol
                </button>
              )}
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ 
              width: '100%', 
              maxWidth: '350px', 
              borderRadius: '16px', 
              overflow: 'hidden',
              border: '1px solid var(--border-glow)',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)'
            }}>
              <img src="/anatomy-infographic.png" alt="Muscle Anatomy" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ROW 2: Animated Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        
        <motion.div whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)' }} className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Dumbbell size={20} color="var(--accent-blue)" />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Today</span>
          </div>
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Workout Volume</h4>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{volume.toLocaleString()} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>lbs</span></div>
        </motion.div>

        <motion.div whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(16, 185, 129, 0.15)' }} className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={20} color="#10b981" />
            </div>
            <span style={{ fontSize: '12px', color: '#10b981' }}>Consistency</span>
          </div>
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Current Streak</h4>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{streak} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Days</span></div>
        </motion.div>

        <motion.div whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(249, 115, 22, 0.15)' }} className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={20} color="#f97316" />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active</span>
          </div>
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Energy Burned</h4>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{energy.toLocaleString()} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>kcal</span></div>
        </motion.div>

        <motion.div whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.15)' }} className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="var(--accent-purple)" />
            </div>
            <span style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>Lvl {level}</span>
          </div>
          <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>XP Progress</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${xpPercentage}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{Math.floor(xpPercentage)}%</span>
          </div>
        </motion.div>

      </div>

      {/* ROW 3: Visual Tracking (Heatmap & Consistency) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', gap: '24px' }}>
        
        {/* Active Muscle Heatmap */}
        <motion.div whileHover={{ scale: 1.01 }} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="#ef4444" />
              Active Strain Heatmap
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>72-Hour muscular stress mapping.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              {volume > 0 ? (
                <>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }}></span> Chest (High)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316', boxShadow: '0 0 8px #f97316' }}></span> Triceps (Med)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span> Quads (Low)</li>
                </>
              ) : (
                <li style={{ color: 'var(--text-muted)' }}>No strain detected.</li>
              )}
            </ul>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px', marginTop: '24px' }} onClick={() => navigate('/muscle-map')}>
              Open Full Map
            </button>
          </div>
          <div style={{ width: '120px', height: '160px', position: 'relative', opacity: 0.8 }}>
            <img src="/muscles/front_base.png" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'grayscale(1)' }} />
            {/* Heatmap Dots */}
            {volume > 0 && (
              <>
                <div style={{ position: 'absolute', top: '25%', left: '35%', width: '30%', height: '15%', background: 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(239, 68, 68, 0) 70%)', filter: 'blur(4px)' }}></div>
                <div style={{ position: 'absolute', top: '35%', left: '20%', width: '15%', height: '15%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.8) 0%, rgba(249, 115, 22, 0) 70%)', filter: 'blur(4px)' }}></div>
                <div style={{ position: 'absolute', top: '35%', right: '20%', width: '15%', height: '15%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.8) 0%, rgba(249, 115, 22, 0) 70%)', filter: 'blur(4px)' }}></div>
              </>
            )}
          </div>
        </motion.div>

        {/* Weekly Consistency */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--accent-blue)" />
              7-Day Consistency Matrix
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>{workoutsLogged} Workouts Logged</span>
          </div>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', paddingBottom: '8px' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const isActive = consistency[i] > 0;
              return (
                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '100%', 
                    height: '100px', 
                    background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '8px', 
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, left: 0, right: 0, 
                      height: isActive ? consistency[i] + '%' : '0%', 
                      background: 'var(--bg-gradient-accent)',
                      borderTop: isActive ? '2px solid var(--accent-cyan)' : 'none',
                      boxShadow: isActive ? '0 -5px 15px rgba(6, 182, 212, 0.3)' : 'none'
                    }}></div>
                  </div>
                  <span style={{ fontSize: '12px', color: isActive ? 'white' : 'var(--text-muted)' }}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ROW 4: Action & Lifestyle */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '24px', paddingBottom: '24px' }}>
        
        {/* Log Workout Form */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Activity size={18} color="var(--accent-purple)" />
            Log Workout Protocol
          </h3>
          
          <form onSubmit={handleLogWorkout} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <select 
                value={targetMuscle} 
                onChange={(e) => setTargetMuscle(e.target.value)}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
              >
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Legs">Legs</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Arms">Arms</option>
                <option value="Core">Core</option>
              </select>
              
              <input 
                type="text" 
                placeholder="Exercise (e.g. Bench Press)" 
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <input 
                type="number" 
                placeholder="Sets" 
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                required
                min="1"
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
              <input 
                type="number" 
                placeholder="Reps" 
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                required
                min="1"
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
              <input 
                type="number" 
                placeholder="Weight (lbs)" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
              />
            </div>
            
            <button type="submit" className="btn-primary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
              <Plus size={18} /> Add to Protocol
            </button>
          </form>
        </div>

        {/* Hydration Tracker */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Droplets size={20} color="var(--accent-blue)" />
            <h3 style={{ fontSize: '16px' }}>Hydration</h3>
          </div>
          
          <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            {/* Fake SVG Circle Progress */}
            <svg style={{ position: 'absolute', top: '-4px', left: '-4px', width: '88px', height: '88px', transform: 'rotate(-90deg)' }}>
              <circle cx="44" cy="44" r="40" fill="none" stroke="var(--accent-blue)" strokeWidth="4" strokeDasharray="251" strokeDashoffset={volume > 0 ? "100" : "251"} style={{ transition: 'stroke-dashoffset 1s ease' }} strokeLinecap="round" filter="drop-shadow(0 0 4px var(--accent-blue))" />
            </svg>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{volume > 0 ? "60" : "0"}<span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>%</span></div>
          </div>
          
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>{volume > 0 ? "1.8L" : "0.0L"} / 3.0L</div>
          <button style={{ width: '100%', padding: '8px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--accent-blue)', borderRadius: '8px', color: '#60a5fa', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-blue)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}>+ 250ml</button>
        </div>

        {/* Sleep Tracker */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Moon size={20} color="#a78bfa" />
            <h3 style={{ fontSize: '16px' }}>Sleep Quality</h3>
          </div>
          
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#a78bfa', textShadow: '0 0 10px rgba(167, 139, 250, 0.5)' }}>{volume > 0 ? "7h 15m" : "0h 0m"}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>{volume > 0 ? "REM: 22% • Deep: 18%" : "REM: 0% • Deep: 0%"}</div>
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Readiness Score</span>
              <span style={{ color: volume > 0 ? '#10b981' : 'var(--text-muted)', fontWeight: 600 }}>{volume > 0 ? 88 : 0} / 100</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: volume > 0 ? '88%' : '0%', height: '100%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
