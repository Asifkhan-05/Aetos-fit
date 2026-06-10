import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Flame, Dumbbell, Target, Clock, Zap, Crown, CheckCircle2, User, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressTracker = () => {
  const [sliderValue, setSliderValue] = useState(50);

  const volume = parseInt(localStorage.getItem('aetos_stat_volume') || '0');
  const level = parseInt(localStorage.getItem('aetos_stat_level') || '1');
  const xp = parseInt(localStorage.getItem('aetos_stat_xp') || '0');
  const userImage = localStorage.getItem('aetos_user_image') || '/before_physique.png';

  const [progressData] = useState(() => {
    if (volume === 0) {
      return {
        strengthData: [0, 0, 0, 0, 0, 0, 0],
        xpData: [0, 0, 0, 0, 0, 0, 0],
        caloriesData: [0, 0, 0, 0, 0, 0, 0]
      };
    } else {
      return {
        strengthData: [50, 52, 55, 58, 60, 65, 70],
        xpData: [100, 250, 400, 600, 850, 1100, 1400],
        caloriesData: [300, 320, 310, 400, 450, 380, 500]
      };
    }
  });

  const maxVal = (arr: number[]) => Math.max(...arr);

  const renderSVGLine = (data: number[], color: string) => {
    const max = maxVal(data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((val, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (((val - min) / range) * 100);
      return x + ',' + y;
    }).join(' ');

    return (
      <svg width="100%" height="100%" viewBox="0 -10 100 120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        <defs>
          <filter id={'glow-' + color.replace('#', '')}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          points={points}
          filter={'url(#glow-' + color.replace('#', '') + ')'}
        />
        {data.map((val, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - (((val - min) / range) * 100);
          return (
            <circle key={index} cx={x} cy={y} r="3" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          );
        })}
      </svg>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Progress & Evolution</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track your transformation and operational metrics.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary">Update Metrics</button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        {[
          { label: 'Body Weight', value: volume > 0 ? '185 lbs' : '0 lbs', change: volume > 0 ? '-4.2 lbs' : '0 lbs', icon: User, color: 'var(--accent-cyan)' },
          { label: 'Body Fat %', value: volume > 0 ? '14.5%' : '0%', change: volume > 0 ? '-2.1%' : '0%', icon: Target, color: 'var(--accent-purple)' },
          { label: 'Total Volume', value: volume > 0 ? `${volume.toLocaleString()} lbs` : '0 lbs', change: volume > 0 ? '+15%' : '0%', icon: Dumbbell, color: 'var(--accent-blue)' },
          { label: 'XP Level', value: `Level ${level}`, change: level > 1 ? `+${level - 1} Lvl` : '0 Lvl', icon: Zap, color: '#f97316' }
        ].map((stat, i) => (
          <motion.div variants={itemVariants} whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} key={i} className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <stat.icon size={24} color={stat.color} style={{ filter: 'drop-shadow(0 0 10px ' + stat.color + ')' }} />
              <span style={{ color: stat.change.startsWith('+') ? '#10b981' : stat.change === '0%' || stat.change === '0 lbs' || stat.change === '0 Lvl' ? 'var(--text-muted)' : '#ef4444', fontSize: '14px', fontWeight: 600, background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px' }}>
                {stat.change}
              </span>
            </div>
            <h3 style={{ fontSize: '28px', marginBottom: '4px' }}>{stat.value}</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Charts Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <>
              <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '24px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={20} color="var(--accent-purple)" />
                    Strength Progression (Composite)
                  </h3>
                </div>
                <div style={{ height: '200px', padding: '10px 0' }}>
                  {renderSVGLine(progressData.strengthData, '#8b5cf6')}
                </div>
              </motion.div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1 }}>
                <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px' }}>XP Growth</h3>
                  <div style={{ height: '100px' }}>
                    {renderSVGLine(progressData.xpData, '#06b6d4')}
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Calories Burned</h3>
                  <div style={{ height: '100px' }}>
                    {renderSVGLine(progressData.caloriesData, '#f97316')}
                  </div>
                </motion.div>
              </div>
            </>
        </div>

        {/* Before / After Slider */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} color="var(--accent-cyan)" />
            Physique Evolution
          </h3>
          
          <div style={{ flex: 1, position: 'relative', borderRadius: '16px', overflow: 'hidden', minHeight: '400px', border: '1px solid var(--border-color)', userSelect: 'none' }}>
            {/* Background Image (After) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(/after_physique_natural.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            
            {/* Foreground Image (Before) with dynamic clip-path */}
            <div style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
              backgroundImage: `url(${userImage})`, backgroundSize: 'cover', backgroundPosition: 'center',
              clipPath: 'polygon(0 0, ' + sliderValue + '% 0, ' + sliderValue + '% 100%, 0 100%)',
              transition: 'clip-path 0.1s'
            }}></div>
            
            {/* Slider Handle Line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: sliderValue + '%', width: '2px', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', background: 'var(--bg-card)', border: '2px solid var(--accent-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeftRight size={16} color="white" />
              </div>
            </div>

            {/* Hidden HTML Range Input for Interaction */}
            <input 
              type="range" 
              min="0" max="100" 
              value={sliderValue} 
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', zIndex: 20 }}
            />
            
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', padding: '8px 16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: '8px', zIndex: 10 }}>Day 1</div>
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', padding: '8px 16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: '8px', zIndex: 10, color: 'var(--accent-cyan)' }}>Day 180</div>
          </div>
        </motion.div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        
        {/* PR Board */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown size={20} color="#fbbf24" />
            Personal Records
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {volume > 0 ? (
              [
                { lift: 'Barbell Bench Press', weight: '225 lbs', date: 'Oct 12, 2023' },
                { lift: 'Back Squat', weight: '315 lbs', date: 'Nov 04, 2023' },
                { lift: 'Deadlift', weight: '405 lbs', date: 'Dec 18, 2023' },
                { lift: 'Overhead Press', weight: '155 lbs', date: 'Jan 02, 2024' },
              ].map((pr, i) => (
                <motion.div whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }} key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>{pr.lift}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{pr.date}</div>
                  </div>
                  <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '18px' }}>{pr.weight}</div>
                </motion.div>
              ))
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No records yet. Log a workout to establish your baseline.</div>
            )}
          </div>
        </motion.div>

        {/* Gamification / Badges */}
        <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--accent-purple)" />
            Achievements & Milestones
          </h3>
          
          <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
            {[
              { title: 'Consistency King', desc: '14 Day Streak', icon: Flame, color: '#f97316', achieved: volume > 0 },
              { title: 'Iron Scholar', desc: 'Logged 100 sets', icon: Dumbbell, color: 'var(--accent-blue)', achieved: volume > 0 },
              { title: 'Cybernetic', desc: 'Burned 10k kcal', icon: Zap, color: 'var(--accent-purple)', achieved: volume > 0 },
              { title: 'Titan', desc: 'Deadlift 500 lbs', icon: Crown, color: '#fbbf24', achieved: false },
            ].map((badge, i) => (
              <motion.div whileHover={{ y: -5, scale: 1.05 }} key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', opacity: badge.achieved ? 1 : 0.3, filter: badge.achieved ? 'none' : 'grayscale(1)', cursor: 'pointer' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(' + (badge.color === '#f97316' ? '249, 115, 22' : badge.color === '#fbbf24' ? '251, 191, 36' : badge.color === 'var(--accent-blue)' ? '59, 130, 246' : '139, 92, 246') + ', 0.1)', border: '1px solid ' + badge.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: badge.achieved ? '0 0 20px rgba(' + (badge.color === '#f97316' ? '249, 115, 22' : badge.color === '#fbbf24' ? '251, 191, 36' : badge.color === 'var(--accent-blue)' ? '59, 130, 246' : '139, 92, 246') + ', 0.2)' : 'none', position: 'relative' }}>
                  <badge.icon size={28} color={badge.color} />
                  {badge.achieved && (
                    <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--bg-primary)', borderRadius: '50%' }}>
                      <CheckCircle2 size={16} color="#10b981" />
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{badge.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{badge.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Next Milestone: <span style={{ color: 'white', fontWeight: 600 }}>{(level * 10000).toLocaleString()} Total XP</span></span>
              <span style={{ fontSize: '14px', color: 'var(--accent-cyan)' }}>{volume > 0 ? Math.floor((xp % 10000) / 100) + "%" : "0%"}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: volume > 0 ? ((xp % 10000) / 100) + '%' : '0%', height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default ProgressTracker;
