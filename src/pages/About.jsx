import React from 'react';

export default function About() {
  return (
    <div className="about-wrapper">
      <style>{`
        .about-wrapper { 
          padding: 3rem 1rem; 
          max-width: 700px; 
          margin: 0 auto; 
          line-height: 1.7; 
          color: #444;
        }
        .about-card {
          background: #fff;
          border: 1px solid #eee;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        h1 { color: #2d5a27; margin-bottom: 1.5rem; border-bottom: 2px solid #e8f5e9; display: inline-block; }
        .tech-stack { 
          margin-top: 2rem; 
          display: flex; 
          gap: 10px; 
          flex-wrap: wrap; 
        }
        .tag { 
          background: #e8f5e9; 
          color: #2d5a27; 
          padding: 4px 12px; 
          border-radius: 20px; 
          font-size: 0.85rem; 
          font-weight: 600;
        }
      `}</style>
      
      <div className="about-card">
        <h1>About PlantCaare</h1>
        <p>
          PlantCaare was born out of a simple need: keeping our leafy friends alive in a busy world. 
          We believe everyone has a green thumb—sometimes it just needs a little digital nudge.
        </p>
        <p>
          This project serves as a clean, full-stack template demonstrating 
          modern web development practices.
        </p>
        
        <div className="tech-stack">
          <span className="tag">React</span>
          <span className="tag">Vite</span>
          <span className="tag">Firebase</span>
          <span className="tag">Minimal UI</span>
        </div>
      </div>
    </div>
  );
}