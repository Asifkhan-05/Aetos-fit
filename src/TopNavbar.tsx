import React, { useEffect, useState, useRef } from 'react';
import { Search, Bell, Flame, Zap, Moon, Sun, Bot, ChevronDown, User, Settings, LogOut, Target, Dumbbell, Activity, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Mock Search Database
const globalSearchIndex = [
  { id: 1, title: 'Chest (Pectorals)', type: 'Muscle', icon: Target, route: '/muscle-map' },
  { id: 2, title: 'Latissimus Dorsi (Lats)', type: 'Muscle', icon: Target, route: '/muscle-map' },
  { id: 3, title: 'Barbell Bench Press', type: 'Exercise', icon: Dumbbell, route: '/exercises' },
  { id: 4, title: 'Romanian Deadlift (RDL)', type: 'Exercise', icon: Dumbbell, route: '/exercises' },
  { id: 5, title: 'Hypertrophy Push Protocol', type: 'Workout', icon: Activity, route: '/workout-generator' },
  { id: 6, title: 'High Protein Recovery Meal', type: 'Nutrition', icon: Utensils, route: '/' },
  { id: 7, title: 'Cable Machine', type: 'Equipment', icon: Dumbbell, route: '/exercises' },
  { id: 8, title: 'CNS Recovery Status', type: 'Recovery', icon: Activity, route: '/' },
];

const TopNavbar = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('aetos_theme') || 'dark');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('aetos_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [localStats, setLocalStats] = useState({
    streak: parseInt(localStorage.getItem('aetos_stat_streak') || '0'),
    level: parseInt(localStorage.getItem('aetos_stat_level') || '1')
  });

  useEffect(() => {
    const handleUpdate = () => {
      setLocalStats({
        streak: parseInt(localStorage.getItem('aetos_stat_streak') || '0'),
        level: parseInt(localStorage.getItem('aetos_stat_level') || '1')
      });
    };
    window.addEventListener('aetos_update', handleUpdate);

    // Click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('aetos_update', handleUpdate);
    };
  }, []);

  const filteredSearch = globalSearchIndex.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankDetails = (level: number) => {
    if (level <= 9) return { tier: 'Tier I: The Enlisted', title: 'Conscript', desc: 'Fresh blood. Unproven but willing to fight.' };
    if (level <= 24) return { tier: 'Tier I: The Enlisted', title: 'Vanguard', desc: 'The first line of defense. Experienced in the skirmish.' };
    if (level <= 44) return { tier: 'Tier II: The Veteran', title: 'Legionnaire', desc: 'A hardened soldier. The backbone of the army.' };
    if (level <= 69) return { tier: 'Tier II: The Veteran', title: 'Decurion', desc: 'Leader of a small squad. Respected by peers.' };
    if (level <= 99) return { tier: 'Tier III: The Command', title: 'Centurion', desc: 'Battle-tested commander. Leads a hundred swords.' };
    if (level <= 129) return { tier: 'Tier III: The Command', title: 'Tribune', desc: 'A high-ranking officer with political and martial power.' };
    if (level <= 159) return { tier: 'Tier IV: The High Council', title: 'Praetor', desc: 'Elite magistrate of war. Commands entire battalions.' };
    if (level <= 184) return { tier: 'Tier IV: The High Council', title: 'Legate', desc: 'General of the Legion. Answers only to the ruler.' };
    if (level <= 199) return { tier: 'Tier V: The Ascended', title: 'Imperator', desc: 'A supreme commander with absolute authority.' };
    return { tier: 'Tier VI: The Mythic', title: 'Grand Warlord', desc: 'A singular, legendary rank. The pinnacle of war.' };
  };

  const rank = getRankDetails(localStats.level);

  const getSpritePosition = (title: string) => {
    switch (title) {
      case 'Conscript': return '25% 100%';
      case 'Vanguard': return '75% 0%';
      case 'Legionnaire': return '25% 0%';
      case 'Decurion': return '100% 0%';
      case 'Centurion': return '0% 100%';
      case 'Tribune': return '75% 100%';
      case 'Praetor': return '50% 0%';
      case 'Legate': return '50% 100%';
      case 'Imperator': return '100% 100%';
      case 'Grand Warlord': return '0% 0%';
      default: return '25% 100%';
    }
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to completely erase all local progress? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/onboarding');
  };

  return (
    <div style={{
      height: '80px',
      background: 'rgba(10, 10, 15, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      
      {/* Left Section: Search & AI */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        <div ref={searchRef} style={{ position: 'relative', width: '350px' }}>
          <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input 
            type="text" 
            placeholder="Search muscles, exercises, workouts..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '14px',
              transition: 'all 0.3s',
              boxShadow: isSearchOpen ? '0 0 15px rgba(139, 92, 246, 0.1)' : 'none',
              borderColor: isSearchOpen ? 'var(--accent-purple)' : 'var(--border-color)'
            }}
          />
          
          {/* Smart Search Dropdown */}
          <AnimatePresence>
            {isSearchOpen && searchQuery.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass-panel" style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                width: '100%',
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '8px'
              }}>
                {filteredSearch.length > 0 ? (
                  filteredSearch.map(item => (
                    <motion.div 
                      key={item.id}
                      onClick={() => {
                        navigate(item.route);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <item.icon size={16} color="var(--accent-purple)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: 500 }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.type}</div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No results found for "{searchQuery}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Assistant Button */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'rgba(6, 182, 212, 0.1)',
          border: '1px solid var(--accent-cyan)',
          borderRadius: '24px',
          color: 'var(--accent-cyan)',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.1)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(6, 182, 212, 0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.1)'}
        >
          <Bot size={18} />
          <span>Ask AETOS</span>
        </button>
      </div>

      {/* Right Section: Stats & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        
        {/* Stats */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '20px', cursor: 'pointer' }}>
            <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <Flame size={18} color="#f97316" />
            </motion.div>
            <span style={{ fontWeight: 600 }}>{localStats.streak} Day Streak</span>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '20px', cursor: 'pointer' }}>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <Zap size={18} color="var(--accent-cyan)" />
            </motion.div>
            <span style={{ fontWeight: 600 }}>Level {localStats.level}</span>
          </motion.div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <motion.button onClick={toggleTheme} whileHover={{ rotate: 30 }} whileTap={{ scale: 0.9 }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            {theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
          </motion.button>
          
          {/* Profile Dropdown */}
          <div ref={profileRef} style={{ position: 'relative' }}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px 4px 4px',
                background: isProfileOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
                borderRadius: '24px',
                cursor: 'pointer',
                transition: 'background 0.2s',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => { if(!isProfileOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              onMouseLeave={(e) => { if(!isProfileOpen) e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                backgroundImage: 'url(/ranks_sprite.jpg)',
                backgroundSize: '500% 200%',
                backgroundPosition: getSpritePosition(rank.title),
                border: '2px solid var(--bg-primary)'
              }}>
              </div>
              <ChevronDown size={16} color="var(--text-secondary)" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </motion.div>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="glass-panel" style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '200px',
                  padding: '8px'
                }}>
                  <div style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: '16px' }}>{profile?.username || 'User'} <span style={{color: 'var(--accent-cyan)', fontSize: '14px', marginLeft: '4px'}}>• Lvl {localStats.level}</span></div>
                    <div style={{ fontSize: '12px', color: 'var(--accent-purple)', fontWeight: 'bold', marginTop: '6px' }}>{rank.tier}</div>
                    <div style={{ fontSize: '15px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '4px' }}>"{rank.title}"</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{rank.desc}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                      Experience: <span style={{color: 'white', fontWeight: 'bold'}}>{parseInt(localStorage.getItem('aetos_stat_xp') || '0').toLocaleString()} XP</span>
                    </div>
                  </div>
                  
                  <motion.button whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', scale: 1.02 }} style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }}>
                    <User size={16} /> Profile
                  </motion.button>
                  <motion.button onClick={handleClearData} whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', scale: 1.02 }} style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }}>
                    <Settings size={16} /> Clear App Data
                  </motion.button>
                  <motion.button onClick={handleLogout} whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', scale: 1.02 }} style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderRadius: '6px', textAlign: 'left', marginTop: '4px' }}>
                    <LogOut size={16} /> Log Out
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
