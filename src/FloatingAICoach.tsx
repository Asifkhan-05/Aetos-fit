import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

const FloatingAICoach = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Athlete recognized. How can I optimize your protocol today?' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'ai', text: 'Processing biomechanical data... I recommend a hyper-focused chest day based on your 72-hour recovery strain.' }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Orb */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(10, 10, 15, 0.8)',
          border: '2px solid var(--accent-cyan)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 999,
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
        }}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <Bot size={32} color="var(--accent-cyan)" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass-panel"
            style={{
              position: 'fixed',
              bottom: '110px',
              right: '32px',
              width: '350px',
              height: '500px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(6, 182, 212, 0.15)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6, 182, 212, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={20} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '16px', color: 'var(--accent-cyan)' }}>AETOS Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }} className="custom-scroll">
              {chatHistory.map((chat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: chat.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    alignSelf: chat.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: chat.sender === 'user' ? 'var(--bg-gradient-accent)' : 'rgba(255,255,255,0.05)',
                    border: chat.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                    borderBottomRightRadius: chat.sender === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: chat.sender === 'ai' ? '4px' : '16px',
                    fontSize: '14px',
                    lineHeight: 1.5
                  }}
                >
                  {chat.text}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask AETOS..."
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <motion.button 
                onClick={handleSend}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-cyan)', 
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
                }}
              >
                <Send size={16} color="black" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAICoach;
