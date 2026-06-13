export const exercises = [
  { 
    name: 'Barbell Bench Press', type: 'Compound', equipment: 'Barbell', target: 'Chest', diff: 'Intermediate', environment: 'Gym',
    image: '/muscles/chest.png',
    musclesWorked: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps Brachii'],
    steps: ['Lie flat on the bench with eyes directly under the bar.', 'Grip the bar slightly wider than shoulder-width apart.', 'Unrack the bar and hold it straight over your chest.', 'Lower the bar slowly to your mid-chest while keeping elbows at a 45-degree angle.', 'Press the bar back up to the starting position explosively.'],
    mistakes: ['Flaring elbows out to 90 degrees', 'Bouncing the bar off the chest', 'Lifting hips off the bench'],
    alternatives: ['Dumbbell Bench Press', 'Machine Chest Press', 'Push-ups'],
    injuryRisk: 'High risk to shoulder joints (rotator cuff) if elbows are flared excessively.',
    aiTips: 'AETOS COACH: Focus on retracting your scapula (pinching shoulder blades together) before you unrack. This stabilizes the shoulder and forces the chest to do the work.'
  },
  { 
    name: 'Romanian Deadlift (RDL)', type: 'Compound', equipment: 'Barbell', target: 'Legs', diff: 'Advanced', environment: 'Gym',
    image: '/muscles/legs.png',
    musclesWorked: ['Hamstrings', 'Glutes', 'Erector Spinae'],
    steps: ['Stand with feet hip-width apart, holding a barbell at hip level.', 'Keep your legs mostly straight with a soft bend in the knees.', 'Hinge at the hips, pushing your glutes straight back.', 'Lower the bar along your legs until you feel a deep stretch in your hamstrings.', 'Drive your hips forward to return to the starting position.'],
    mistakes: ['Rounding the lower back', 'Squatting the weight instead of hinging', 'Moving the bar away from the body'],
    alternatives: ['Dumbbell RDL', 'Leg Curl Machine', 'Good Mornings'],
    injuryRisk: 'High risk of lower back strain if the lumbar spine rounds during the eccentric phase.',
    aiTips: 'AETOS COACH: Imagine closing a car door with your glutes. Do not focus on how low the bar goes; focus on how far back your hips can travel.'
  },
  { 
    name: 'Pull-Up', type: 'Compound', equipment: 'Bodyweight', target: 'Back', diff: 'Intermediate', environment: 'Home/Gym',
    image: '/muscles/back.png',
    musclesWorked: ['Latissimus Dorsi', 'Biceps', 'Rhomboids', 'Lower Traps'],
    steps: ['Grab the bar with an overhand grip, slightly wider than shoulder-width.', 'Hang freely with straight arms and engaged core.', 'Pull your chest up toward the bar by driving your elbows down and back.', 'Pause at the top when your chin clears the bar.', 'Lower yourself down with control to a dead hang.'],
    mistakes: ['Using momentum (kipping)', 'Not achieving full range of motion', 'Pulling with the biceps instead of the back'],
    alternatives: ['Lat Pulldown', 'Assisted Pull-Up Machine', 'Inverted Rows'],
    injuryRisk: 'Moderate risk of elbow tendonitis if the eccentric phase is dropped too quickly.',
    aiTips: 'AETOS COACH: Initiate the movement by depressing your scapula (pulling your shoulders away from your ears) before your arms bend.'
  },
  { 
    name: 'Dumbbell Lateral Raise', type: 'Isolation', equipment: 'Dumbbell', target: 'Shoulders', diff: 'Beginner', environment: 'Home/Gym',
    image: '/muscles/arms.png',
    musclesWorked: ['Lateral Deltoids', 'Anterior Deltoids'],
    steps: ['Stand holding dumbbells at your sides with a slight bend in your elbows.', 'Raise the weights straight out to the sides until your arms are parallel with the floor.', 'Keep your wrists straight and pour the dumbbells slightly forward at the top.', 'Lower the weights slowly back to the starting position.'],
    mistakes: ['Using momentum to swing the weights up', 'Raising the weights too high (above shoulder level)', 'Locking the elbows out completely'],
    alternatives: ['Cable Lateral Raise', 'Machine Lateral Raise'],
    injuryRisk: 'Low risk, though shoulder impingement can occur if weights are raised excessively high with internal rotation.',
    aiTips: 'AETOS COACH: Think about pushing the dumbbells away from your body toward the walls, rather than just lifting them up.'
  }
];
