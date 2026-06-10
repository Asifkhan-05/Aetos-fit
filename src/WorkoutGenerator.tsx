import React, { useState } from 'react';
import { Dumbbell, Activity, Calendar, Target, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WorkoutGenerator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      // Ensure we set an active protocol for the newly generated workout too
      localStorage.setItem('aetos_active_protocol', JSON.stringify([
        { name: 'Barbell Bench Press', sets: 4, reps: 10 },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 12 },
        { name: 'Cable Crossovers', sets: 3, reps: 15 }
      ]));
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <motion.h1 variants={itemVariants} style={{ fontSize: '32px', marginBottom: '24px' }}>AI Workout Generator</motion.h1>
      
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <motion.div variants={itemVariants} className="glass-panel" style={{ flex: 1, padding: '32px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Target size={20} color="var(--accent-cyan)" />
            Configure Protocol
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px' }}>Primary Goal</label>
              <select style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}>
                <option>Muscle Hypertrophy</option>
                <option>Strength & Power</option>
                <option>Fat Loss & Endurance</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px' }}>Experience Level</label>
              <select style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}>
                <option>Beginner (0-1 Years)</option>
                <option>Intermediate (1-3 Years)</option>
                <option>Advanced (3+ Years)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '8px' }}>Duration (Minutes)</label>
              <input type="range" min="30" max="120" step="15" defaultValue="60" style={{ width: '100%', accentColor: 'var(--accent-purple)' }} />
            </div>

            <button className="btn-primary" onClick={handleGenerate} disabled={loading} style={{ marginTop: '16px', opacity: loading ? 0.7 : 1 }}>
              {loading ? <Loader2 className="animate-spin" /> : <Activity size={20} />}
              {loading ? 'Analyzing Data...' : 'Generate Plan'}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel" style={{ flex: 1, padding: '32px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          {generated && !loading ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-gradient" style={{ fontSize: '24px', marginBottom: '8px' }}>AETOS Custom Protocol</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Hypertrophy • 60 Mins • Intermediate</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'Barbell Bench Press', sets: '4 Sets x 8-10 Reps', rest: '90s Rest' },
                  { name: 'Incline Dumbbell Press', sets: '3 Sets x 10-12 Reps', rest: '60s Rest' },
                  { name: 'Cable Crossovers', sets: '3 Sets x 15 Reps', rest: '45s Rest' }
                ].map((ex, i) => (
                  <motion.div whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }} key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold', color: 'white' }}>{ex.name}</span>
                      <Dumbbell size={16} color="var(--accent-cyan)" />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                      <span>{ex.sets}</span>
                      <span>•</span>
                      <span>{ex.rest}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button onClick={() => navigate('/active-workout')} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary" style={{ width: '100%', marginTop: '24px', borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}>
                Start Protocol
              </motion.button>
            </motion.div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              {loading ? 'Initializing AI Engine...' : 'Your generated protocol will appear here.'}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkoutGenerator;
