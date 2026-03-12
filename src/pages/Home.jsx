import React from 'react';
import { careTips } from '../services/tipsService';

export default function Home() {
  return (
    <div className="home-wrapper">
      <style>{`
        /* 🎨 The Design Palette: Minimal & Fresh */
        .home-wrapper { 
          font-family: 'Inter', -apple-system, sans-serif;
          color: #2c3e50; /* Softer, deep grey for readability */
          background-color: #fdfdfd; /* Not pure white, slightly soft */
        }
        
        /* 🍃 1. Natural Hero Banner */
        .hero-banner { 
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200'); /* Soft bokeh nature image */
          background-size: cover;
          background-position: center;
          color: white; /* Important for contrast */
          padding: 6rem 2rem; /* More padding for a premium feel */
          margin-bottom: 4rem;
          text-align: center;
        }
        /* Add a subtle dark overlay so text is *always* readable */
        .hero-banner::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(45, 90, 39, 0.4); /* Subtle deep green filter */
          z-index: 1;
        }
        /* Keep text above the overlay */
        .hero-content { position: relative; z-index: 2; max-width: 600px; margin: 0 auto; }
        .hero-banner h1 { 
          color: white; 
          font-size: 3.5rem; 
          margin: 0; 
          letter-spacing: -2px; 
          font-weight: 800;
        }
        .hero-banner p { 
          font-size: 1.25rem; 
          color: rgba(255, 255, 255, 0.9); 
          margin-top: 10px;
          line-height: 1.6;
        }

        /* 🖼️ 2. New Plant Sanctuary Grid Section */
        .sanctuary-section {
          padding: 0 2rem;
          max-width: 1000px;
          margin: 0 auto 5rem auto;
        }
        .sanctuary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .sanctuary-card {
          border-radius: 16px;
          color: white;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end; /* Text at the bottom */
          height: 350px;
          cursor: pointer;
        }
        .sanctuary-card:hover { transform: scale(1.02); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .sanctuary-card.care { 
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.8), rgba(45, 90, 39, 0.9)),
                      url('https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=600'); /* Soft gradient + plant photo */
          background-size: cover;
        }
        .sanctuary-card.water { 
          background: linear-gradient(135deg, rgba(33, 150, 243, 0.7), rgba(45, 90, 39, 0.9)),
                      url('https://images.unsplash.com/photo-1541620215039-b9d9c57d0d0f?q=80&w=600'); /* Water gradient + droplets photo */
          background-size: cover;
        }
        .sanctuary-card h3 { font-size: 1.8rem; margin: 0; font-weight: 700; color: white; }
        .sanctuary-card p { font-size: 1rem; color: rgba(255, 255, 255, 0.9); margin-top: 8px; }

        /* 💡 3. Daily Tips Section - Plant Emojis Added */
        .tips-section { 
          padding: 0 2rem 5rem 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .tips-container {
          background: #fdfdfd; 
          padding: 3rem; 
          border-radius: 20px; 
          border: 1px solid #e8f5e9;
          box-shadow: 0 10px 30px rgba(45, 90, 39, 0.05); /* Softest green shadow */
        }
        .tips-section h2 { color: #2d5a27; margin-top: 0; margin-bottom: 2rem; font-size: 1.8rem; text-align: center; }
        .home-tips { 
          list-style: none; 
          padding: 0; 
          display: grid; 
          gap: 1.25rem; 
        }
        .home-tips li { 
          background: white; 
          padding: 1.25rem; 
          border-radius: 12px; 
          box-shadow: 0 2px 4px rgba(0,0,0,0.03);
          border-left: 5px solid #4caf50;
          display: flex;
          align-items: center; /* Center the icon */
          gap: 15px; /* Spacing for the new icons */
          transition: 0.2s ease;
        }
        .home-tips li:hover { box-shadow: 0 5px 10px rgba(0,0,0,0.05); }
        .tip-text { line-height: 1.6; color: #444; flex: 1; }
        .tip-icon { font-size: 1.5rem; }
      `}</style>

      {/* 🍃 1. Natural Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Grow Together.</h1>
          <p>Your personal sanctuary for plant care and watering schedules.</p>
        </div>
      </div>

      {/* 🖼️ 2. Plant Sanctuary Grid (Gradients + Text Images) */}
      <section className="sanctuary-section">
        <div className="sanctuary-grid">
          <div className="sanctuary-card care">
            <h3>Nurture Every Leaf</h3>
            <p>From Monstera to Cactus, find specialized care paths for all your friends.</p>
          </div>
          <div className="sanctuary-card water">
            <h3>Schedule with Ease</h3>
            <p>Never miss a drop. Plan and receive gentle hydration reminders.</p>
          </div>
        </div>
      </section>

      {/* 💡 3. Daily Tips Section (Plant Emojis Added) */}
      <section className="tips-section">
        <div className="tips-container">
          <h2>🌱 Daily Greenery Tips</h2>
          <ul className="home-tips">
            {careTips.map((tip, idx) => (
              <li key={idx}>
                <span className="tip-icon">✨</span>
                <span className="tip-text">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}