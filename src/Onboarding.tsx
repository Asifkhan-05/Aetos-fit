import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        localStorage.setItem('aetos_user_image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          height: formData.height,
          weight: formData.weight
        })
      });
      navigate('/');
      window.location.reload(); // Quick refresh to load MainLayout state
    } catch (err) {
      console.error(err);
      navigate('/');
      window.location.reload(); // Still navigate on error for demo purposes
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--accent-purple)', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'var(--accent-cyan)', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%' }}></div>
      
      <div className="glass-panel" style={{ width: '450px', padding: '48px', position: 'relative', zIndex: 10, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <h1 className="text-gradient" style={{ fontSize: '36px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity size={36} color="var(--accent-cyan)" />
            AETOS FIT
          </h1>
        </div>
        
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Welcome. Enter your parameters to initialize your AI training intelligence.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Upload Current Physique Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="physique-upload"
            />
            <label htmlFor="physique-upload" style={{
              width: '120px', height: '120px', borderRadius: '50%', border: '2px dashed var(--accent-cyan)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden',
              background: 'rgba(255,255,255,0.05)'
            }}>
              {imagePreview ? (
                <img src={imagePreview} alt="Physique" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: 'var(--accent-cyan)', fontSize: '24px' }}>+</span>
              )}
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Operative Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Age (Years)</label>
            <input 
              required
              type="number" 
              value={formData.age}
              onChange={e => setFormData({...formData, age: e.target.value})}
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Height (e.g. 180cm, 5'11")</label>
            <input 
              required
              type="text" 
              value={formData.height}
              onChange={e => setFormData({...formData, height: e.target.value})}
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Weight (e.g. 80kg, 180lbs)</label>
            <input 
              required
              type="text" 
              value={formData.weight}
              onChange={e => setFormData({...formData, weight: e.target.value})}
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '16px', width: '100%', padding: '16px', fontSize: '16px' }}>
            Initialize Protocol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
