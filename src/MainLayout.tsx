import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import FloatingAICoach from './FloatingAICoach';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopNavbar />
        <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </div>
      </div>
      <FloatingAICoach />
    </div>
  );
};

export default MainLayout;
