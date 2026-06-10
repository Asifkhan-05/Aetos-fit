import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'database.sqlite');

let db;

async function setupDatabase() {
  const SQL = await initSqlJs();
  
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Always attempt to create tables if they don't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      height TEXT,
      weight TEXT,
      xp INTEGER DEFAULT 0,
      streak INTEGER DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS progress_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      xp_data TEXT,
      strength_data TEXT,
      consistency_data TEXT,
      calories_data TEXT
    );

    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT,
      equipment TEXT,
      target TEXT,
      diff TEXT,
      environment TEXT,
      image TEXT,
      musclesWorked TEXT,
      steps TEXT,
      mistakes TEXT,
      alternatives TEXT,
      injuryRisk TEXT,
      aiTips TEXT
    );
  `);

  // Seed Exercises if table is empty
  const exCount = db.exec("SELECT COUNT(*) FROM exercises")[0].values[0][0];
  if (exCount === 0) {
    console.log("Seeding exercises table...");
    const exercisesToSeed = [
      { 
        name: 'Barbell Bench Press', type: 'Compound', equipment: 'Barbell', target: 'Chest', diff: 'Intermediate', environment: 'Gym',
        image: '/muscles/chest.png',
        musclesWorked: JSON.stringify(['Pectoralis Major', 'Anterior Deltoids', 'Triceps Brachii']),
        steps: JSON.stringify(['Lie flat on the bench with eyes directly under the bar.', 'Grip the bar slightly wider than shoulder-width apart.', 'Unrack the bar and hold it straight over your chest.', 'Lower the bar slowly to your mid-chest while keeping elbows at a 45-degree angle.', 'Press the bar back up to the starting position explosively.']),
        mistakes: JSON.stringify(['Flaring elbows out to 90 degrees', 'Bouncing the bar off the chest', 'Lifting hips off the bench']),
        alternatives: JSON.stringify(['Dumbbell Bench Press', 'Machine Chest Press', 'Push-ups']),
        injuryRisk: 'High risk to shoulder joints (rotator cuff) if elbows are flared excessively.',
        aiTips: 'AETOS COACH: Focus on retracting your scapula (pinching shoulder blades together) before you unrack. This stabilizes the shoulder and forces the chest to do the work.'
      },
      { 
        name: 'Romanian Deadlift (RDL)', type: 'Compound', equipment: 'Barbell', target: 'Legs', diff: 'Advanced', environment: 'Gym',
        image: '/muscles/legs.png',
        musclesWorked: JSON.stringify(['Hamstrings', 'Glutes', 'Erector Spinae']),
        steps: JSON.stringify(['Stand with feet hip-width apart, holding a barbell at hip level.', 'Keep your legs mostly straight with a soft bend in the knees.', 'Hinge at the hips, pushing your glutes straight back.', 'Lower the bar along your legs until you feel a deep stretch in your hamstrings.', 'Drive your hips forward to return to the starting position.']),
        mistakes: JSON.stringify(['Rounding the lower back', 'Squatting the weight instead of hinging', 'Moving the bar away from the body']),
        alternatives: JSON.stringify(['Dumbbell RDL', 'Leg Curl Machine', 'Good Mornings']),
        injuryRisk: 'High risk of lower back strain if the lumbar spine rounds during the eccentric phase.',
        aiTips: 'AETOS COACH: Imagine closing a car door with your glutes. Do not focus on how low the bar goes; focus on how far back your hips can travel.'
      },
      { 
        name: 'Pull-Up', type: 'Compound', equipment: 'Bodyweight', target: 'Back', diff: 'Intermediate', environment: 'Home/Gym',
        image: '/muscles/back.png',
        musclesWorked: JSON.stringify(['Latissimus Dorsi', 'Biceps', 'Rhomboids', 'Lower Traps']),
        steps: JSON.stringify(['Grab the bar with an overhand grip, slightly wider than shoulder-width.', 'Hang freely with straight arms and engaged core.', 'Pull your chest up toward the bar by driving your elbows down and back.', 'Pause at the top when your chin clears the bar.', 'Lower yourself down with control to a dead hang.']),
        mistakes: JSON.stringify(['Using momentum (kipping)', 'Not achieving full range of motion', 'Pulling with the biceps instead of the back']),
        alternatives: JSON.stringify(['Lat Pulldown', 'Assisted Pull-Up Machine', 'Inverted Rows']),
        injuryRisk: 'Moderate risk of elbow tendonitis if the eccentric phase is dropped too quickly.',
        aiTips: 'AETOS COACH: Initiate the movement by depressing your scapula (pulling your shoulders away from your ears) before your arms bend.'
      },
      { 
        name: 'Dumbbell Lateral Raise', type: 'Isolation', equipment: 'Dumbbell', target: 'Shoulders', diff: 'Beginner', environment: 'Home/Gym',
        image: '/muscles/arms.png',
        musclesWorked: JSON.stringify(['Lateral Deltoids', 'Anterior Deltoids']),
        steps: JSON.stringify(['Stand holding dumbbells at your sides with a slight bend in your elbows.', 'Raise the weights straight out to the sides until your arms are parallel with the floor.', 'Keep your wrists straight and pour the dumbbells slightly forward at the top.', 'Lower the weights slowly back to the starting position.']),
        mistakes: JSON.stringify(['Using momentum to swing the weights up', 'Raising the weights too high (above shoulder level)', 'Locking the elbows out completely']),
        alternatives: JSON.stringify(['Cable Lateral Raise', 'Machine Lateral Raise']),
        injuryRisk: 'Low risk, though shoulder impingement can occur if weights are raised excessively high with internal rotation.',
        aiTips: 'AETOS COACH: Think about pushing the dumbbells away from your body toward the walls, rather than just lifting them up.'
      }
    ];

    exercisesToSeed.forEach(ex => {
      db.run(
        "INSERT INTO exercises (name, type, equipment, target, diff, environment, image, musclesWorked, steps, mistakes, alternatives, injuryRisk, aiTips) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [ex.name, ex.type, ex.equipment, ex.target, ex.diff, ex.environment, ex.image, ex.musclesWorked, ex.steps, ex.mistakes, ex.alternatives, ex.injuryRisk, ex.aiTips]
      );
    });
  }

  // Seed Progress if empty
  const progCount = db.exec("SELECT COUNT(*) FROM progress_metrics")[0].values[0][0];
  if (progCount === 0) {
    console.log("Seeding progress table...");
    db.run(
      "INSERT INTO progress_metrics (user_id, xp_data, strength_data, consistency_data, calories_data) VALUES (?, ?, ?, ?, ?)",
      [1, JSON.stringify([10, 25, 45, 70, 110, 160, 230]), JSON.stringify([100, 105, 115, 130, 140, 165, 190]), JSON.stringify([2, 3, 3, 4, 5, 4, 6]), JSON.stringify([300, 450, 400, 600, 750, 600, 900])]
    );
  }

  saveDatabase();
}

function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

// API Routes
app.get('/api/user', (req, res) => {
  try {
    const result = db.exec("SELECT * FROM users LIMIT 1");
    if (result.length > 0 && result[0].values.length > 0) {
      const user = {
        id: result[0].values[0][0],
        name: result[0].values[0][1],
        age: result[0].values[0][2],
        height: result[0].values[0][3],
        weight: result[0].values[0][4],
        xp: result[0].values[0][5],
        streak: result[0].values[0][6]
      };
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.post('/api/user', (req, res) => {
  try {
    const { name, age, height, weight } = req.body;
    db.run(
      "INSERT INTO users (name, age, height, weight, xp, streak) VALUES (?, ?, ?, ?, 0, 0)",
      [name, age, height, weight]
    );
    saveDatabase();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/exercises', (req, res) => {
  try {
    const result = db.exec("SELECT * FROM exercises");
    if (result.length > 0) {
      const exercises = result[0].values.map(row => ({
        id: row[0],
        name: row[1],
        type: row[2],
        equipment: row[3],
        target: row[4],
        diff: row[5],
        environment: row[6],
        image: row[7],
        musclesWorked: JSON.parse(row[8]),
        steps: JSON.parse(row[9]),
        mistakes: JSON.parse(row[10]),
        alternatives: JSON.parse(row[11]),
        injuryRisk: row[12],
        aiTips: row[13]
      }));
      res.json(exercises);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/progress', (req, res) => {
  try {
    const result = db.exec("SELECT * FROM progress_metrics LIMIT 1");
    if (result.length > 0 && result[0].values.length > 0) {
      const prog = {
        xpData: JSON.parse(result[0].values[0][2]),
        strengthData: JSON.parse(result[0].values[0][3]),
        consistencyData: JSON.parse(result[0].values[0][4]),
        caloriesData: JSON.parse(result[0].values[0][5])
      };
      res.json(prog);
    } else {
      res.json({ error: "No progress data found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
  });
}).catch(console.error);
