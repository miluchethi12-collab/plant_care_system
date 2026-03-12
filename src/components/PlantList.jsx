import React from 'react';
import PlantCard from './PlantCard';

// receives an array of plant objects and renders them
export default function PlantList({ plants }) {
  if (!plants || plants.length === 0) {
    return <p>You have no plants yet.</p>;
  }
  return (
    <div>
      {plants.map(p => (
        <PlantCard key={p.id} plant={p} />
      ))}
    </div>
  );
}
