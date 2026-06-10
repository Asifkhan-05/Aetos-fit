import React, { useState, useMemo } from 'react';
import { Search, Play, Filter, Dumbbell, Target, AlertTriangle, Lightbulb, Activity, ChevronRight, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATABASE REPLACED WITH BACKEND FETCH ---

const FILTER_OPTIONS = {
  target: ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'],
  equipment: ['All', 'Barbell', 'Dumbbell', 'Cable', 'Bodyweight', 'Machine'],
  diff: ['All', 'Beginner', 'Intermediate', 'Advanced'],
  type: ['All', 'Compound', 'Isolation'],
  environment: ['All', 'Gym', 'Home/Gym']
};

const ExerciseLibrary = () => {
  const [exerciseDB, setExerciseDB] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [filters, setFilters] = useState({
    target: 'All',
    equipment: 'All',
    diff: 'All',
    type: 'All',
    environment: 'All'
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  React.useEffect(() => {
    fetch('/api/exercises')
      .then(res => res.json())
      .then(data => {
        setExerciseDB(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter Logic
  const filteredExercises = useMemo(() => {
    return exerciseDB.filter(ex => {
      const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTarget = filters.target === 'All' || ex.target === filters.target;
      const matchEquip = filters.equipment === 'All' || ex.equipment === filters.equipment;
      const matchDiff = filters.diff === 'All' || ex.diff === filters.diff;
      const matchType = filters.type === 'All' || ex.type === filters.type;
      const matchEnv = filters.environment === 'All' || ex.environment === filters.environment;
      
      return matchSearch && matchTarget && matchEquip && matchDiff && matchType && matchEnv;
    });
  }, [searchQuery, filters]);

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== 'All').length;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* HEADER & SEARCH */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Exercise Intelligence</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Access the full AETOS movement database.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search database..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 42px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-purple)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '0 24px', 
              background: activeFilterCount > 0 ? 'var(--accent-purple-glow)' : 'var(--bg-secondary)',
              border: '1px solid',
              borderColor: activeFilterCount > 0 ? 'var(--accent-purple)' : 'var(--border-color)',
              borderRadius: '24px', color: 'white', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <Filter size={18} />
            Filters {activeFilterCount > 0 && <span style={{ background: 'var(--accent-purple)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>{activeFilterCount}</span>}
          </button>
        </div>
      </div>

      {/* EXPANDABLE FILTER BAR */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
                
                {Object.entries(FILTER_OPTIONS).map(([key, options]) => (
                  <div key={key} style={{ flex: 1, minWidth: '150px' }}>
                    <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>
                      {key}
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => updateFilter(key, opt)}
                          style={{
                            padding: '6px 12px',
                            fontSize: '13px',
                            background: filters[key as keyof typeof filters] === opt ? 'rgba(255,255,255,0.1)' : 'transparent',
                            border: '1px solid',
                            borderColor: filters[key as keyof typeof filters] === opt ? 'var(--accent-cyan)' : 'var(--border-color)',
                            color: filters[key as keyof typeof filters] === opt ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                 <button 
                    onClick={() => setFilters({ target: 'All', equipment: 'All', diff: 'All', type: 'All', environment: 'All' })}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}
                 >
                   Clear All Filters
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXERCISE GRID */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
           <div style={{ width: '40px', height: '40px', border: '3px solid rgba(139, 92, 246, 0.2)', borderTopColor: 'var(--accent-purple)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', paddingBottom: '32px' }}
        >
          {filteredExercises.map((exercise) => (
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              key={exercise.id} 
              onClick={() => setSelectedExercise(exercise)} 
              className="glass-panel" 
              style={{ overflow: 'hidden', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column' }}
            >
              
              <div style={{ height: '180px', position: 'relative', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <motion.img 
                  whileHover={{ scale: 1.1, opacity: 0.6 }}
                  transition={{ duration: 0.4 }}
                  src={exercise.image} 
                  alt="Preview" 
                  style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, mixBlendMode: 'screen', filter: 'grayscale(1)' }} 
                />
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                  <span style={{ padding: '4px 8px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: '4px', fontSize: '12px', border: '1px solid var(--border-color)' }}>{exercise.target}</span>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-purple)', zIndex: 1, backdropFilter: 'blur(4px)' }}>
                  <Play fill="var(--accent-purple)" color="var(--accent-purple)" size={20} style={{ marginLeft: '4px' }} />
                </div>
              </div>
              
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>{exercise.name}</h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'auto' }}>
                  <span style={{ fontSize: '12px', padding: '4px 10px', background: 'rgba(139, 92, 246, 0.1)', color: '#d8b4fe', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Target size={12}/> {exercise.type}
                  </span>
                  <span style={{ fontSize: '12px', padding: '4px 10px', background: 'rgba(6, 182, 212, 0.1)', color: '#67e8f9', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Dumbbell size={12}/> {exercise.equipment}
                  </span>
                  <span style={{ fontSize: '12px', padding: '4px 10px', background: exercise.diff === 'Advanced' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: exercise.diff === 'Advanced' ? '#fca5a5' : '#6ee7b7', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Activity size={12}/> {exercise.diff}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}

          {filteredExercises.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Dumbbell size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
              <h3>No exercises found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* MASSIVE DETAILS MODAL OVERLAY */}
      <AnimatePresence>
        {selectedExercise && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}
          >
            
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring" as any, damping: 25, stiffness: 200 }}
              className="glass-panel custom-scroll" 
              style={{ width: '100%', maxWidth: '1200px', height: '100%', maxHeight: '900px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              
              {/* Header */}
              <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>{selectedExercise.name}</h2>
                  <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
                    <span>{selectedExercise.target}</span> • <span>{selectedExercise.equipment}</span> • <span>{selectedExercise.diff}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedExercise(null)} 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px' }}>
              
              {/* Left Col: Media & Execution */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div style={{ width: '100%', height: '350px', background: '#000', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={selectedExercise.image} alt="Anim" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'grayscale(1)' }} />
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent-cyan)', zIndex: 1, cursor: 'pointer', backdropFilter: 'blur(4px)', boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>
                    <Play fill="var(--accent-cyan)" color="var(--accent-cyan)" size={32} style={{ marginLeft: '4px' }} />
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Target size={20} color="var(--accent-purple)" />
                    Step-by-Step Execution
                  </h3>
                  <ol style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', lineHeight: 1.6 }}>
                    {selectedExercise.steps.map((step: string, i: number) => <li key={i}>{step}</li>)}
                  </ol>
                </div>

              </div>

              {/* Right Col: Intelligence */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-cyan)' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
                    <Lightbulb size={20} />
                    AETOS Coach Tip
                  </h3>
                  <p style={{ color: 'white', lineHeight: 1.6, fontSize: '15px' }}>{selectedExercise.aiTips}</p>
                </div>

                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <ShieldAlert size={20} />
                    Common Mistakes & Risks
                  </h3>
                  <ul style={{ paddingLeft: '20px', margin: '0 0 16px 0', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                    {selectedExercise.mistakes.map((mistake: string, i: number) => <li key={i}>{mistake}</li>)}
                  </ul>
                  <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Injury Risk:</strong> {selectedExercise.injuryRisk}</span>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={20} color="#10b981" />
                    Muscles Worked & Alternatives
                  </h3>
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Primary & Secondary</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedExercise.musclesWorked.map((m: string, i: number) => (
                        <span key={i} style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', fontSize: '13px' }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Substitute Movements</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedExercise.alternatives.map((alt: string, i: number) => (
                        <span key={i} style={{ padding: '4px 12px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={12} color="#10b981" /> {alt}
                        </span>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
      </AnimatePresence>

    </div>
  );
};

export default ExerciseLibrary;
