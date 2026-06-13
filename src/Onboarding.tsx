import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { supabase } from './lib/supabase';
import { useAuth } from './context/AuthContext';

const Onboarding = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    age: '',
    height: '',
    weight: '',
    goal: 'Hypertrophy'
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

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
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (signInError) throw signInError;
        
        await refreshProfile();
        navigate('/');
      } else {
        // Sign Up
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (signUpError) throw signUpError;

        if (authData.user) {
          // Create Profile in public.users
          const { error: profileError } = await supabase.from('users').insert({
            id: authData.user.id,
            username: formData.username,
            age: parseInt(formData.age),
            height: formData.height,
            weight: formData.weight,
            goal: formData.goal,
            xp: 0,
            streak: 0
          });

          if (profileError) throw profileError;

          await refreshProfile();
          navigate('/');
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
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
          {isLogin ? 'Welcome back. Access your database.' : 'Welcome. Enter your parameters to initialize your AI training intelligence.'}
        </p>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Email</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Password</label>
            <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={inputStyle} minLength={6} />
          </div>

          {!isLogin && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Upload Current Physique Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="physique-upload" />
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
                <input required type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Age (Years)</label>
                <input required type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Height (e.g. 180cm, 5'11")</label>
                <input required type="text" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Weight (e.g. 80kg, 180lbs)</label>
                <input required type="text" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>Primary Goal</label>
                <select value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} style={inputStyle}>
                  <option value="Hypertrophy">Hypertrophy (Build Muscle)</option>
                  <option value="Strength">Strength (Lift Heavier)</option>
                  <option value="Fat Loss">Fat Loss (Cut)</option>
                  <option value="Endurance">Endurance (Stamina)</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '16px', width: '100%', padding: '16px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Processing...' : isLogin ? 'Access Database' : 'Initialize Protocol'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have a profile? " : "Already initialized? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(null); }} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none'
};

export default Onboarding;
