import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Activity, Dumbbell, Dna, PieChart, TrendingUp, Settings, ShieldAlert } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Muscle Map', path: '/muscle-map', icon: Activity },
    { name: 'Workout Generator', path: '/workout-generator', icon: Dumbbell },
    { name: 'Statistics', path: '/statistics', icon: PieChart },
    { name: 'Progress Tracker', path: '/progress', icon: TrendingUp },
    { name: 'Recovery Tracker', path: '/recovery', icon: ShieldAlert },
    { name: 'Exercise Library', path: '/exercises', icon: Dna },
  ];

  return (
    <div style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      zIndex: 10
    }}>
      <div style={{ padding: '0 24px', marginBottom: '40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '28px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={28} color="var(--accent-cyan)" />
          AETOS FIT
        </h1>
      </div>

      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
          }
        }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}
      >
        {navItems.map((item) => (
          <motion.div
            key={item.name}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
            }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                color: isActive ? 'white' : 'var(--text-secondary)',
                background: isActive ? 'var(--bg-card)' : 'transparent',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.2s',
                border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
                boxShadow: isActive ? '0 0 15px rgba(6, 182, 212, 0.2)' : 'none'
              })}
            >
              <item.icon size={20} color="var(--accent-cyan)" style={{ opacity: 0.8 }} />
              {item.name}
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>
    </div>
  );
};

export default Sidebar;
