import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import initSqlJs from 'sql.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'database.sqlite');

let db: any;

async function setupDatabase() {
  const SQL = await initSqlJs();
  
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
    // Initialize schema
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        xp INTEGER DEFAULT 0,
        streak INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        workouts_completed INTEGER DEFAULT 0,
        calories_burned INTEGER DEFAULT 0,
        duration_minutes INTEGER DEFAULT 0
      );
      INSERT INTO users (name, xp, streak) VALUES ('Aetos User', 1250, 5);
      INSERT INTO stats (date, workouts_completed, calories_burned, duration_minutes) VALUES ('2026-05-16', 3, 1450, 120);
    `);
    saveDatabase();
  }
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
        xp: result[0].values[0][2],
        streak: result[0].values[0][3]
      };
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const result = db.exec("SELECT * FROM stats ORDER BY id DESC LIMIT 7");
    if (result.length > 0) {
      const stats = result[0].values.map((row: any) => ({
        id: row[0],
        date: row[1],
        workouts_completed: row[2],
        calories_burned: row[3],
        duration_minutes: row[4]
      }));
      res.json(stats);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(console.error);
