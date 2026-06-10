import React, { useState } from 'react';
import { Activity, Dumbbell, Shield, Zap, Target, AlertTriangle, Lightbulb, User, Home, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type MuscleData = {
  id: string;
  name: string;
  view: 'front' | 'back';
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
  type: 'Push' | 'Pull' | 'Legs' | 'Core';
  area: 'Upper Body' | 'Lower Body' | 'Mid Body';
  subMuscles: string[];
  primary: string[];
  secondary: string[];
  recovery: string;
  difficulty: string;
  split: string;
  equipment: string[];
  bestExercises: string[];
  homeAlternatives: string[];
  mistakes: string[];
  beginnerTips: string[];
  warmups: string[];
  stretches: string[];
  injuryPrevention: string[];
};

const MuscleMap = () => {
  const [activeMuscle, setActiveMuscle] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');

  const muscles: MuscleData[] = [
    // FRONT MUSCLES
    {
      id: 'chest', name: 'Chest (Pectorals)', view: 'front', x: 35, y: 22, width: 30, height: 12, image: '/muscles/chest.png',
      type: 'Push', area: 'Upper Body',
      subMuscles: ['Pectoralis Major', 'Pectoralis Minor', 'Serratus Anterior'],
      primary: ['Chest'], secondary: ['Front Deltoids', 'Triceps'],
      recovery: '48-72 Hours', difficulty: 'Beginner-Intermediate', split: 'Push Day / Upper Body',
      equipment: ['Barbell', 'Dumbbells', 'Cables', 'Bench'],
      bestExercises: ['Barbell Bench Press', 'Incline Dumbbell Press', 'Cable Crossovers'],
      homeAlternatives: ['Push-ups (Standard, Wide, Decline)', 'Resistance Band Presses'],
      mistakes: ['Flaring elbows out too wide', 'Bouncing the bar off the chest', 'Lifting hips off the bench'],
      beginnerTips: ['Retract scapula before lifting', 'Focus on a full stretch at the bottom', 'Keep feet firmly planted'],
      warmups: ['Arm Circles', 'Resistance Band Pull-aparts', 'Light Push-ups'],
      stretches: ['Doorway Chest Stretch', 'Behind-the-back Hand Clasp'],
      injuryPrevention: ['Warm up rotator cuffs', "Don't ego lift on flat bench", 'Ensure balanced back training']
    },
    {
      id: 'front_delts', name: 'Front Deltoids', view: 'front', x: 25, y: 20, width: 10, height: 10, image: '/muscles/arms.png',
      type: 'Push', area: 'Upper Body',
      subMuscles: ['Anterior Deltoid'],
      primary: ['Shoulders'], secondary: ['Chest', 'Triceps'],
      recovery: '48 Hours', difficulty: 'Beginner', split: 'Push Day / Shoulders',
      equipment: ['Dumbbells', 'Barbell'],
      bestExercises: ['Overhead Press', 'Front Raises'],
      homeAlternatives: ['Pike Push-ups', 'Band Front Raises'],
      mistakes: ['Using momentum to swing the weight', 'Arching the lower back excessively'],
      beginnerTips: ['Control the eccentric phase', 'Keep a tight core when pressing overhead'],
      warmups: ['Shoulder Dislocates with PVC/Band', 'Light Dumbbell Press'],
      stretches: ['Cross-body Shoulder Stretch'],
      injuryPrevention: ['Avoid pressing behind the neck if mobility is poor']
    },
    {
      id: 'biceps', name: 'Biceps', view: 'front', x: 22, y: 32, width: 10, height: 12, image: '/muscles/arms.png',
      type: 'Pull', area: 'Upper Body',
      subMuscles: ['Biceps Brachii (Short Head)', 'Biceps Brachii (Long Head)', 'Brachialis'],
      primary: ['Biceps'], secondary: ['Forearms', 'Front Deltoids'],
      recovery: '48 Hours', difficulty: 'Beginner', split: 'Pull Day / Arms',
      equipment: ['Dumbbells', 'Barbell', 'EZ Bar', 'Cables'],
      bestExercises: ['Barbell Curl', 'Incline Dumbbell Curl', 'Hammer Curls'],
      homeAlternatives: ['Resistance Band Curls', 'Bodyweight Chin-ups', 'Towel Curls'],
      mistakes: ['Using momentum (swinging)', 'Moving elbows forward during the curl', 'Incomplete range of motion'],
      beginnerTips: ['Keep elbows pinned to your sides', 'Squeeze at the top of the movement', 'Control the negative (eccentric) phase'],
      warmups: ['Light Dumbbell Curls', 'Wrist Rotations', 'Arm Circles'],
      stretches: ['Wall Bicep Stretch', 'Seated Bicep Stretch'],
      injuryPrevention: ['Avoid excessively heavy weights that compromise form', 'Warm up elbows properly']
    },
    {
      id: 'forearms', name: 'Forearms', view: 'front', x: 18, y: 46, width: 10, height: 15, image: '/muscles/arms.png',
      type: 'Pull', area: 'Upper Body',
      subMuscles: ['Brachioradialis', 'Flexors', 'Extensors'],
      primary: ['Forearms'], secondary: ['Biceps'],
      recovery: '24-48 Hours', difficulty: 'Beginner', split: 'Pull Day / Arms',
      equipment: ['Dumbbells', 'Barbell', 'Farmers Walk Handles'],
      bestExercises: ['Wrist Curls', 'Reverse Curls', 'Farmers Walk'],
      homeAlternatives: ['Towel Hangs', 'Wrist Roller', 'Heavy Book Holds'],
      mistakes: ['Ignoring forearm training', 'Using lifting straps too early'],
      beginnerTips: ['Train grip strength actively', 'Do high reps for forearms'],
      warmups: ['Wrist Rotations', 'Finger Extensions'],
      stretches: ['Kneeling Forearm Stretch', 'Wall Wrist Stretch'],
      injuryPrevention: ['Avoid overtraining to prevent tendonitis', 'Stretch flexors regularly']
    },
    {
      id: 'abs', name: 'Abdominals (Abs)', view: 'front', x: 40, y: 35, width: 20, height: 20, image: '/muscles/core.png',
      type: 'Core', area: 'Mid Body',
      subMuscles: ['Rectus Abdominis', 'Transversus Abdominis'],
      primary: ['Abs'], secondary: ['Obliques', 'Hip Flexors'],
      recovery: '24-48 Hours', difficulty: 'Beginner', split: 'Core / Full Body',
      equipment: ['Mat', 'Pull-up Bar', 'Cable Machine'],
      bestExercises: ['Hanging Leg Raises', 'Cable Crunches', 'Planks'],
      homeAlternatives: ['Crunches', 'Lying Leg Raises', 'Hollow Body Hold'],
      mistakes: ['Pulling on the neck during crunches', 'Using hip flexors instead of abs', 'Not bracing the core'],
      beginnerTips: ['Focus on posterior pelvic tilt', 'Exhale hard at the top of the contraction'],
      warmups: ['Cat-Cow', 'Bird-Dog', 'Light Planks'],
      stretches: ['Cobra Stretch', 'Upward Dog'],
      injuryPrevention: ['Avoid excessive spinal flexion with heavy loads', 'Train the transverse abdominis for stability']
    },
    {
      id: 'obliques', name: 'Obliques', view: 'front', x: 30, y: 38, width: 10, height: 15, image: '/muscles/core.png',
      type: 'Core', area: 'Mid Body',
      subMuscles: ['External Obliques', 'Internal Obliques'],
      primary: ['Obliques'], secondary: ['Abs'],
      recovery: '24-48 Hours', difficulty: 'Intermediate', split: 'Core / Full Body',
      equipment: ['Dumbbells', 'Cables', 'Mat'],
      bestExercises: ['Russian Twists', 'Cable Woodchoppers', 'Side Planks'],
      homeAlternatives: ['Bicycle Crunches', 'Side Planks', 'Heel Touches'],
      mistakes: ['Using momentum for twists', 'Over-rotating the spine'],
      beginnerTips: ['Control the rotation', 'Focus on the squeeze'],
      warmups: ['Torso Twists', 'Side Bends (no weight)'],
      stretches: ['Standing Side Stretch'],
      injuryPrevention: ['Avoid ballistic rotational movements with heavy weights']
    },
    {
      id: 'quads', name: 'Quadriceps', view: 'front', x: 35, y: 56, width: 30, height: 20, image: '/muscles/legs.png',
      type: 'Legs', area: 'Lower Body',
      subMuscles: ['Rectus Femoris', 'Vastus Lateralis', 'Vastus Medialis', 'Vastus Intermedius'],
      primary: ['Quadriceps'], secondary: ['Glutes', 'Calves'],
      recovery: '48-72 Hours', difficulty: 'Advanced', split: 'Leg Day',
      equipment: ['Barbell', 'Squat Rack', 'Leg Press', 'Leg Extension Machine'],
      bestExercises: ['Barbell Back Squat', 'Leg Press', 'Bulgarian Split Squats', 'Leg Extensions'],
      homeAlternatives: ['Bodyweight Squats', 'Jumping Lunges', 'Pistol Squats', 'Wall Sits'],
      mistakes: ['Knees caving inward (valgus)', 'Not going deep enough', 'Heels lifting off the floor'],
      beginnerTips: ['Master the bodyweight squat first', 'Push through the mid-foot', 'Keep the chest up'],
      warmups: ['Bodyweight Squats', 'Leg Swings', 'Lunges'],
      stretches: ['Standing Quad Stretch', 'Kneeling Lunge Stretch'],
      injuryPrevention: ['Warm up knees thoroughly', 'Ensure proper ankle mobility', "Don't lock out knees forcefully on leg press"]
    },

    // BACK MUSCLES
    {
      id: 'traps', name: 'Trapezius (Traps)', view: 'back', x: 40, y: 15, width: 20, height: 12, image: '/muscles/back.png',
      type: 'Pull', area: 'Upper Body',
      subMuscles: ['Upper Traps', 'Middle Traps', 'Lower Traps'],
      primary: ['Traps'], secondary: ['Neck', 'Shoulders'],
      recovery: '48 Hours', difficulty: 'Beginner', split: 'Pull Day / Back',
      equipment: ['Barbell', 'Dumbbells', 'Cables'],
      bestExercises: ['Barbell Shrugs', 'Face Pulls', "Farmer's Carry"],
      homeAlternatives: ['Band Shrugs', 'Prone Y-Raises'],
      mistakes: ['Rolling the shoulders during shrugs', 'Using too much neck momentum'],
      beginnerTips: ['Pull straight up and squeeze', 'Train lower and mid traps for posture'],
      warmups: ['Shoulder Rolls', 'Neck Rotations'],
      stretches: ['Neck Stretch (Ear to Shoulder)'],
      injuryPrevention: ['Avoid jerking heavy weights', 'Maintain neutral cervical spine']
    },
    {
      id: 'back', name: 'Latissimus Dorsi (Lats)', view: 'back', x: 35, y: 28, width: 30, height: 20, image: '/muscles/back.png',
      type: 'Pull', area: 'Upper Body',
      subMuscles: ['Latissimus Dorsi', 'Teres Major', 'Rhomboids'],
      primary: ['Lats'], secondary: ['Biceps', 'Rear Deltoids'],
      recovery: '48-72 Hours', difficulty: 'Intermediate', split: 'Pull Day / Back',
      equipment: ['Pull-up Bar', 'Barbell', 'Dumbbells', 'Cable Machine'],
      bestExercises: ['Pull-ups', 'Barbell Rows', 'Lat Pulldowns', 'Seated Cable Rows'],
      homeAlternatives: ['Doorframe Rows', 'Resistance Band Pulldowns', 'Superman Holds'],
      mistakes: ['Pulling with the biceps instead of the back', 'Rounding the lower back on rows', 'Not achieving full stretch'],
      beginnerTips: ['Initiate the pull by retracting the scapula', 'Think about driving your elbows to your hips', 'Use a thumbless grip to feel the lats more'],
      warmups: ['Scapular Pull-ups', 'Light Lat Pulldowns', 'Band Pull-aparts'],
      stretches: ['Dead Hang', "Child's Pose"],
      injuryPrevention: ['Maintain a neutral spine during bent-over rows', 'Avoid excessive momentum']
    },
    {
      id: 'rear_delts', name: 'Rear Deltoids', view: 'back', x: 25, y: 22, width: 10, height: 8, image: '/muscles/arms.png',
      type: 'Pull', area: 'Upper Body',
      subMuscles: ['Posterior Deltoid'],
      primary: ['Shoulders'], secondary: ['Traps', 'Rhomboids'],
      recovery: '48 Hours', difficulty: 'Intermediate', split: 'Pull Day / Shoulders',
      equipment: ['Dumbbells', 'Cables', 'Pec Deck Machine'],
      bestExercises: ['Reverse Pec Deck', 'Face Pulls', 'Bent-Over Lateral Raises'],
      homeAlternatives: ['Band Face Pulls', 'Water Jug Reverse Flyes'],
      mistakes: ['Using traps instead of rear delts', 'Too heavy weight causing momentum'],
      beginnerTips: ['Keep elbows slightly bent', 'Focus on pulling with the back of the shoulder'],
      warmups: ['Arm Circles', 'Band Pull-aparts'],
      stretches: ['Cross-body Shoulder Stretch'],
      injuryPrevention: ['Control the eccentric to avoid shoulder strain']
    },
    {
      id: 'triceps', name: 'Triceps', view: 'back', x: 22, y: 30, width: 10, height: 15, image: '/muscles/arms.png',
      type: 'Push', area: 'Upper Body',
      subMuscles: ['Long Head', 'Lateral Head', 'Medial Head'],
      primary: ['Triceps'], secondary: ['Chest', 'Shoulders'],
      recovery: '48 Hours', difficulty: 'Beginner', split: 'Push Day / Arms',
      equipment: ['Cables', 'Dumbbells', 'EZ Bar', 'Dip Station'],
      bestExercises: ['Tricep Pushdowns', 'Overhead Extensions', 'Skullcrushers', 'Dips'],
      homeAlternatives: ['Bench Dips', 'Diamond Push-ups', 'Band Extensions'],
      mistakes: ['Moving the elbows forward/backward during pushdowns', 'Flaring elbows on skullcrushers'],
      beginnerTips: ['Keep elbows locked in place', 'Fully extend at the bottom for maximum contraction'],
      warmups: ['Light Cable Pushdowns', 'Arm Circles'],
      stretches: ['Overhead Tricep Stretch'],
      injuryPrevention: ['Warm up elbows thoroughly', 'Avoid heavy skullcrushers if you have elbow pain']
    },
    {
      id: 'glutes', name: 'Glutes', view: 'back', x: 35, y: 48, width: 30, height: 15, image: '/muscles/legs.png',
      type: 'Legs', area: 'Lower Body',
      subMuscles: ['Gluteus Maximus', 'Gluteus Medius', 'Gluteus Minimus'],
      primary: ['Glutes'], secondary: ['Hamstrings', 'Lower Back'],
      recovery: '48-72 Hours', difficulty: 'Intermediate', split: 'Leg Day',
      equipment: ['Barbell', 'Hip Thrust Machine', 'Bands', 'Kettlebell'],
      bestExercises: ['Barbell Hip Thrusts', 'Romanian Deadlifts', 'Bulgarian Split Squats', 'Cable Pull-throughs'],
      homeAlternatives: ['Glute Bridges', 'Frog Pumps', 'Donkey Kicks'],
      mistakes: ['Hyperextending the lower back at the top', 'Not squeezing the glutes', 'Pushing through the toes instead of heels'],
      beginnerTips: ['Master the glute bridge first', 'Do glute activation exercises before heavy lifting', 'Tuck your chin on hip thrusts'],
      warmups: ['Banded Lateral Walks', 'Glute Bridges', 'Clamshells'],
      stretches: ['Pigeon Pose', 'Figure 4 Stretch'],
      injuryPrevention: ['Maintain a neutral spine', 'Focus on mind-muscle connection over heavy weight']
    },
    {
      id: 'hamstrings', name: 'Hamstrings', view: 'back', x: 35, y: 64, width: 30, height: 18, image: '/muscles/legs.png',
      type: 'Legs', area: 'Lower Body',
      subMuscles: ['Biceps Femoris', 'Semitendinosus', 'Semimembranosus'],
      primary: ['Hamstrings'], secondary: ['Glutes', 'Calves'],
      recovery: '48-72 Hours', difficulty: 'Intermediate', split: 'Leg Day',
      equipment: ['Barbell', 'Leg Curl Machine', 'Dumbbells'],
      bestExercises: ['Romanian Deadlifts (RDL)', 'Seated Leg Curls', 'Lying Leg Curls', 'Nordic Hamstring Curls'],
      homeAlternatives: ['Sliding Leg Curls (on hardwood)', 'Good Mornings (with bands)', 'Single-leg Glute Bridges'],
      mistakes: ['Rounding the lower back on RDLs', 'Not getting a full stretch', 'Going too heavy on curls causing hip movement'],
      beginnerTips: ['Keep a slight bend in the knees on RDLs', 'Push your hips back as far as possible', 'Control the eccentric'],
      warmups: ['Leg Swings', 'Bodyweight Good Mornings', 'Light Leg Curls'],
      stretches: ['Standing Toe Touch', 'Seated Hamstring Stretch'],
      injuryPrevention: ['Never rush the eccentric on RDLs', "Don't lock out knees entirely on hinge movements"]
    },
    {
      id: 'calves', name: 'Calves', view: 'back', x: 38, y: 83, width: 24, height: 15, image: '/muscles/legs.png',
      type: 'Legs', area: 'Lower Body',
      subMuscles: ['Gastrocnemius', 'Soleus'],
      primary: ['Calves'], secondary: ['Tibialis Anterior'],
      recovery: '24-48 Hours', difficulty: 'Beginner', split: 'Leg Day',
      equipment: ['Calf Raise Machine', 'Smith Machine', 'Stairs'],
      bestExercises: ['Standing Calf Raises', 'Seated Calf Raises', 'Donkey Calf Raises'],
      homeAlternatives: ['Single-leg Stair Calf Raises', 'Jumping Rope'],
      mistakes: ['Bouncing at the bottom', 'Short range of motion', 'Training them last when fatigued'],
      beginnerTips: ['Pause at the bottom stretch for 2 seconds', 'Explode up and squeeze', 'Train them frequently'],
      warmups: ['Ankle Rotations', 'Light Jumping Jacks'],
      stretches: ['Wall Calf Stretch', 'Downward Dog'],
      injuryPrevention: ['Avoid Achilles tendon strain by pausing at the bottom', 'Stretch them frequently']
    }
  ];

  const filteredMuscles = muscles.filter(m => m.view === currentView);
  const activeData = muscles.find(m => m.id === activeMuscle);

  const Accordion = ({ title, icon, children, defaultOpen = false }: any) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
      <motion.div initial={false} animate={{ backgroundColor: isOpen ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)' }} style={{ borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <motion.button 
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '100%', padding: '16px', background: 'transparent', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 600 }}>
            {icon} {title}
          </span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>▼</motion.span>
        </motion.button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div style={{ height: '100%', display: 'flex', gap: '32px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px' }}>Interactive Muscle Map</h1>
          <div style={{ background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px', display: 'flex', border: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => { setCurrentView('front'); setActiveMuscle(null); }}
              style={{ padding: '8px 24px', background: currentView === 'front' ? 'var(--accent-purple)' : 'transparent', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Front
            </button>
            <button 
              onClick={() => { setCurrentView('back'); setActiveMuscle(null); }}
              style={{ padding: '8px 24px', background: currentView === 'back' ? 'var(--accent-purple)' : 'transparent', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Back
            </button>
          </div>
        </div>
        
        <div className="glass-panel" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ position: 'relative', width: '400px', height: '600px', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', overflow: 'hidden' }}
          >
            {/* Background 2D Base Image */}
            <motion.img 
              key={currentView}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={currentView === 'front' ? '/muscles/front_base.png' : '/muscles/back_base.png'} 
              alt="Anatomy Base" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
            />

            {/* Interactive Overlays */}
            {filteredMuscles.map((m) => (
              <motion.div
                key={m.id}
                onClick={() => setActiveMuscle(m.id)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'var(--accent-cyan-glow)',
                  borderColor: 'var(--accent-cyan)',
                  boxShadow: '0 0 20px var(--accent-cyan)'
                }}
                style={{
                  position: 'absolute',
                  left: m.x + '%',
                  top: m.y + '%',
                  width: m.width + '%',
                  height: m.height + '%',
                  background: activeMuscle === m.id ? 'var(--accent-purple-glow)' : 'transparent',
                  border: activeMuscle === m.id ? '2px solid var(--accent-purple)' : '1px solid transparent',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: activeMuscle === m.id ? '0 0 30px var(--accent-purple-glow), inset 0 0 20px var(--accent-purple-glow)' : 'none',
                  backdropFilter: activeMuscle === m.id ? 'brightness(1.5)' : 'none'
                }}
              />
            ))}
          </motion.div>

        </div>
      </div>

      <motion.div 
        layout
        className="glass-panel custom-scroll" 
        style={{ width: '500px', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden' }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: activeMuscle ? 0 : 50, opacity: activeMuscle ? 1 : 0.5 }}
        transition={{ type: "spring" as any, damping: 25, stiffness: 200 }}
      >
        <AnimatePresence mode="wait">
        {activeData ? (
          <motion.div 
            key={activeData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ width: '100%', height: '260px', flexShrink: 0, position: 'relative', background: '#000', overflow: 'hidden' }}>
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={activeData.image} 
                alt={activeData.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, mixBlendMode: 'screen' }} 
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, var(--bg-card), transparent)' }}></div>
              <div style={{ position: 'absolute', bottom: '16px', left: '24px' }}>
                <h2 className="text-gradient" style={{ fontSize: '36px', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,1)' }}>
                  {activeData.name}
                </h2>
              </div>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ padding: '6px 12px', background: 'var(--accent-purple-glow)', border: '1px solid var(--accent-purple)', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', color: 'white' }}>{activeData.type}</span>
                <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>{activeData.area}</span>
                <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>{activeData.split}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}><Zap size={16} /> Recovery Time</span>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>{activeData.recovery}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}><Shield size={16} /> Difficulty</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{activeData.difficulty}</span>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={16} /> Sub-Muscles Anatomy
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activeData.subMuscles.map((sub, i) => (
                    <div key={i} style={{ padding: '8px 12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px', color: 'var(--text-primary)' }}>
                      {sub}
                    </div>
                  ))}
                </div>
              </div>

              <Accordion title="Routines & Exercises" icon={<Dumbbell size={18} color="var(--accent-purple)" />} defaultOpen={true}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Best Exercises</span>
                    <ul style={{ paddingLeft: '20px', color: 'white', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {activeData.bestExercises.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Home Alternatives</span>
                    <ul style={{ paddingLeft: '20px', color: 'white', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {activeData.homeAlternatives.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Required Equipment</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {activeData.equipment.map((eq, i) => (
                        <span key={i} style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(6, 182, 212, 0.2)', color: '#67e8f9', borderRadius: '4px' }}>{eq}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Intelligence & Guidance" icon={<Lightbulb size={18} color="#f97316" />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}><AlertTriangle size={14} /> Common Mistakes</span>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                      {activeData.mistakes.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}><User size={14} /> Beginner Tips</span>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                      {activeData.beginnerTips.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Preparation & Recovery" icon={<Activity size={18} color="var(--accent-blue)" />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Warmup Protocol</span>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                      {activeData.warmups.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Stretching Routine</span>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                      {activeData.stretches.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Injury Prevention</span>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                      {activeData.injuryPrevention.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </Accordion>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', marginTop: '16px' }}>
                <Activity size={20} />
                Generate {activeData.name} Workout
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '48px', gap: '24px' }}
          >
            <motion.div 
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}
            >
              <ArrowLeftRight size={32} color="var(--accent-purple)" />
            </motion.div>
            <p style={{ fontSize: '18px', lineHeight: 1.5 }}>
              Select a muscle group<br/>from the map to view advanced<br/>intelligence data.
            </p>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MuscleMap;
