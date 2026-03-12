// Displays a single plant's basic info and next watering date
import React from 'react';

export default function PlantCard({ plant }) {
  // compute next watering placeholder: createdAt + frequencyDays
  let nextWater = 'N/A';
  if (plant.createdAt && plant.frequencyDays) {
    const created = plant.createdAt.toDate ? plant.createdAt.toDate() : new Date(plant.createdAt);
    const next = new Date(created);
    next.setDate(next.getDate() + plant.frequencyDays);
    nextWater = next.toLocaleDateString();
  }

  const cardStyle = {
    border: '1px solid #ddd',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    background: '#fff',
  };
  const imgStyle = { maxWidth: '100px', display: 'block', marginTop: '0.5rem' };

  return (
    <div style={cardStyle}>
      <h4>{plant.name}</h4>
      <p>Water every {plant.frequencyDays} days</p>
      <p>Next watering: {nextWater}</p>
      {plant.notes && <p>Notes: {plant.notes}</p>}
      {plant.photoUrl && <img src={plant.photoUrl} alt="plant" style={imgStyle} />}
    </div>
  );
}
