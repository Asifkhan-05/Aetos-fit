import React, { useEffect, useState } from 'react';
import { TrendingUp, Flame, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from './lib/supabase';
import { useAuth } from './context/AuthContext';

const Statistics = () => {
  const [stats, setStats] = useState<any[]>([]);
  const { user } = useAuth();
  
  const volume = parseInt(localStorage.getItem('aetos_stat_volume') || '0');

  // Dummy data for the visual charts if DB is empty
  const defaultChartData = volume > 0 ? [
    { day: 'Mon', value: 20 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 60 },
    { day: 'Fri', value: 85 },
    { day: 'Sat', value: 40 },
    { day: 'Sun', value: 75 },
  ] : [
    { day: 'Mon', value: 0 },
    { day: 'Tue', value: 0 },
    { day: 'Wed', value: 0 },
    { day: 'Thu', value: 0 },
    { day: 'Fri', value: 0 },
    { day: 'Sat', value: 0 },
    { day: 'Sun', value: 0 },
  ];

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('workout_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(10);
      
      if (!error && data) {
        const formatted = data.map(d => ({
          id: d.id,
          date: new Date(d.completed_at).toLocaleDateString(),
          workouts_completed: d.workout_name,
          calories_burned: d.calories_burned
        }));
        setStats(formatted);
      }
    };
    fetchStats();
  }, [user]);

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
      <motion.h1 variants={itemVariants} style={{ fontSize: '32px', marginBottom: '24px' }}>Intelligence & Metrics</motion.h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '32px' }}>
        
        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="var(--accent-purple)" />
              Weekly Volume
            </h2>
          </div>
          
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
            {defaultChartData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '100%', 
                  height: d.value + '%', 
                  background: 'var(--bg-gradient-accent)',
                  borderRadius: '6px 6px 0 0',
                }} />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={20} color="#f97316" />
              Energy Expenditure
            </h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', position: 'relative' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '15px solid rgba(255,255,255,0.05)', borderTopColor: volume > 0 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)', borderRightColor: volume > 0 ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)', transform: 'rotate(45deg)', boxShadow: volume > 0 ? '0 0 20px var(--accent-purple-glow)' : 'none' }}></div>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{volume > 0 ? "10k" : "0"}</span>
              <br/>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>KCAL BURNED</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass-panel" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={20} color="var(--accent-blue)" />
          Recent Protocol History
        </h2>
        {stats.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.map((stat: any) => (
              <motion.div whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }} key={stat.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                <span style={{ color: 'white', fontWeight: 500 }}>{stat.date}</span>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>{stat.workouts_completed}</span>
                  <span style={{ color: '#f97316' }}>{stat.calories_burned} kcal</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            No recent protocol history found. Await initialization.
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Statistics;
