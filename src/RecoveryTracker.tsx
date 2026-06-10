import React, { useState } from 'react';
import { Activity, ShieldAlert, Zap, Battery, AlertTriangle, Moon, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const RecoveryTracker = () => {
  const [readiness, setReadiness] = useState(82);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <motion.div variants={itemVariants}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>CNS Recovery Status</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Systemic and localized fatigue monitoring.</p>
        </motion.div>
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-secondary">Log Sleep</button>
          <button className="btn-primary">Update Metrics</button>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Main Readiness Score */}
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, transparent 0%, transparent 80%, rgba(16, 185, 129, 0.2) 100%)', opacity: 0.5 }}
          ></motion.div>
          <h2 style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '16px', zIndex: 1 }}>Overall Readiness</h2>
          <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="565" strokeDashoffset={565 - (565 * readiness) / 100} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} filter="drop-shadow(0 0 8px rgba(16,185,129,0.6))" />
            </svg>
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', textShadow: '0 0 20px rgba(16,185,129,0.5)' }}>{readiness}</span>
              <div style={{ color: '#10b981', fontSize: '14px', fontWeight: 600 }}>OPTIMAL</div>
            </div>
          </div>
        </motion.div>

        {/* Systemic Factors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { label: 'Sleep Quality', value: '7h 45m', score: 85, icon: Moon, color: '#a78bfa' },
            { label: 'Heart Rate Variability', value: '68 ms', score: 72, icon: Activity, color: '#f97316' },
            { label: 'Central Nervous System', value: 'Recovered', score: 90, icon: Zap, color: 'var(--accent-cyan)' }
          ].map((factor, i) => (
            <motion.div variants={itemVariants} whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }} key={i} className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `rgba(${factor.color === '#a78bfa' ? '167, 139, 250' : factor.color === '#f97316' ? '249, 115, 22' : '6, 182, 212'}, 0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${factor.color}` }}>
                <factor.icon size={24} color={factor.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'white', fontWeight: 600 }}>{factor.label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{factor.value}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: factor.score + '%', height: '100%', background: factor.color, boxShadow: `0 0 10px ${factor.color}` }}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Localized Muscle Fatigue */}
      <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Battery size={20} color="var(--accent-purple)" />
          Localized Muscle Fatigue
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            { muscle: 'Chest', fatigue: 80, status: 'High Strain', color: '#ef4444' },
            { muscle: 'Triceps', fatigue: 65, status: 'Moderate', color: '#f97316' },
            { muscle: 'Lats', fatigue: 20, status: 'Recovered', color: '#10b981' },
            { muscle: 'Quads', fatigue: 10, status: 'Recovered', color: '#10b981' }
          ].map((item, i) => (
            <motion.div whileHover={{ scale: 1.05 }} key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>{item.muscle}</span>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `rgba(${item.color === '#ef4444' ? '239,68,68' : item.color === '#f97316' ? '249,115,22' : '16,185,129'}, 0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${item.color}`, boxShadow: `0 0 15px rgba(${item.color === '#ef4444' ? '239,68,68' : item.color === '#f97316' ? '249,115,22' : '16,185,129'}, 0.3)` }}>
                <span style={{ color: item.color, fontWeight: 'bold' }}>{item.fatigue}%</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.status}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Recommendation */}
      <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '32px', borderLeft: '4px solid var(--accent-cyan)' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
          <ShieldAlert size={20} />
          AETOS Recovery Protocol
        </h3>
        <p style={{ color: 'white', lineHeight: 1.6, fontSize: '15px' }}>
          Systemic recovery is optimal, but localized strain on Anterior Chain (Chest, Triceps) is high. 
          Recommendation: Execute a Pull/Posterior focused protocol today. Avoid heavy pressing movements for the next 24 hours.
        </p>
      </motion.div>

    </motion.div>
  );
};

export default RecoveryTracker;
