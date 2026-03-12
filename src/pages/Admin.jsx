import React, { useEffect, useState } from 'react';
import { getPlantsForUser } from '../services/plantService';

export default function Admin({ user }) {
  const [plantCount, setPlantCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetchStats() {
      try {
        const plants = await getPlantsForUser(user.id);
        setPlantCount(plants.length);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [user]);

  if (!user) {
    return (
      <div className="admin-empty">
        <style>{`
          .admin-empty { padding: 4rem; text-align: center; color: #666; font-family: 'Inter', sans-serif; }
          .lock-icon { font-size: 3rem; margin-bottom: 1rem; }
        `}</style>
        <div className="lock-icon">🔒</div>
        <h3>Access Denied</h3>
        <p>Please log in to view your account dashboard.</p>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <style>{`
        .admin-wrapper { padding: 2rem 1rem; max-width: 900px; margin: 0 auto; font-family: 'Inter', sans-serif; }
        .admin-header { margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .admin-header h2 { color: #2d5a27; margin: 0; font-size: 2rem; }
        .user-email { color: #666; font-size: 0.9rem; margin-top: 5px; }

        .admin-stats { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 1.5rem; 
          margin-bottom: 3rem; 
        }
        .stat-card { 
          background: #fff; 
          padding: 1.5rem; 
          border-radius: 12px; 
          border: 1px solid #eee; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: transform 0.2s;
        }
        .stat-card:hover { transform: translateY(-3px); }
        .stat-label { color: #888; font-size: 0.75rem; text-transform: uppercase; font-weight: bold; }
        .stat-number { display: block; font-size: 2.2rem; font-weight: 800; color: #2d5a27; margin-top: 5px; }

        .settings-section { 
          background: #fff; 
          border: 1px solid #eee; 
          padding: 2rem; 
          border-radius: 12px;
        }
        .settings-section h3 { margin-top: 0; color: #333; font-size: 1.2rem; }
        .setting-row { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 12px 0; 
          border-bottom: 1px solid #f5f5f5; 
        }
        .setting-row:last-child { border-bottom: none; }
        .setting-info h4 { margin: 0; font-size: 0.95rem; color: #444; }
        .setting-info p { margin: 0; font-size: 0.8rem; color: #999; }
        
        .badge { background: #e8f5e9; color: #2d5a27; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
      `}</style>

      <div className="admin-header">
        <h2>Account Dashboard</h2>
        <div className="user-email">Logged in as: <strong>{user.email || 'User'}</strong></div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="stat-label">Your Plants</span>
          <span className="stat-number">{loading ? "..." : plantCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Account Status</span>
          <span className="stat-number" style={{ fontSize: '1.2rem', marginTop: '15px' }}>
            <span className="badge">Active Member</span>
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Member Since</span>
          <span className="stat-number" style={{ fontSize: '1.2rem', marginTop: '15px' }}>
            {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <div className="settings-section">
        <h3>User Preferences</h3>
        <div className="setting-row">
          <div className="setting-info">
            <h4>Email Notifications</h4>
            <p>Receive watering reminders via email</p>
          </div>
          <span style={{ color: '#ccc' }}>Coming Soon</span>
        </div>
        <div className="setting-row">
          <div className="setting-info">
            <h4>Dark Mode</h4>
            <p>Switch to a darker visual theme</p>
          </div>
          <span style={{ color: '#ccc' }}>Coming Soon</span>
        </div>
        <div className="setting-row">
          <div className="setting-info">
            <h4>Privacy Mode</h4>
            <p>Keep your collection private</p>
          </div>
          <span className="badge">Enabled</span>
        </div>
      </div>
    </div>
  );
}