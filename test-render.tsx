import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import MuscleMap from './src/pages/MuscleMap.tsx';
import WorkoutGenerator from './src/pages/WorkoutGenerator.tsx';
import Statistics from './src/pages/Statistics.tsx';

try {
  console.log("Rendering MuscleMap...");
  renderToString(React.createElement(MuscleMap));
  console.log("MuscleMap OK");
} catch (e) {
  console.error("MuscleMap Error:", e);
}

try {
  console.log("Rendering WorkoutGenerator...");
  renderToString(React.createElement(WorkoutGenerator));
  console.log("WorkoutGenerator OK");
} catch (e) {
  console.error("WorkoutGenerator Error:", e);
}

try {
  console.log("Rendering Statistics...");
  renderToString(React.createElement(Statistics));
  console.log("Statistics OK");
} catch (e) {
  console.error("Statistics Error:", e);
}
