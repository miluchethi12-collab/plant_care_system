import { useEffect, useState } from 'react';
import PlantList from '../components/PlantList';
import AddPlantForm from '../components/AddPlantForm';
import { getPlantsForUser, addPlant, deletePlant, waterPlant } from '../services/plantService';

export default function YourPlants({ user }) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load plants
  useEffect(() => {
    if (!user) return;
    async function load() {
      setLoading(true);
      const data = await getPlantsForUser(user.id);
      setPlants(data);
      setLoading(false);
    }
    load();
  }, [user]);

  // Handle adding a new plant
  const handleAdd = async (plantData) => {
    if (!user) return;
    await addPlant(user.id, plantData);
    const data = await getPlantsForUser(user.id);
    setPlants(data);
  };

  // FIXED: Handle watering logic
  const handleWater = async (plantId) => {
    const plantToUpdate = plants.find(p => p.id === plantId);
    if (!plantToUpdate) return;

    // Calculate next date based on frequency (default 7 days)
    const nextDate = new Date();
    const daysToAdd = parseInt(plantToUpdate.frequency || 7);
    nextDate.setDate(nextDate.getDate() + daysToAdd);

    // Update local state for immediate feedback
    const updatedPlants = plants.map(p => 
      p.id === plantId 
        ? { ...p, lastWateredDate: new Date().toISOString(), nextWateringDate: nextDate.toISOString() }
        : p
    );
    setPlants(updatedPlants);

    // Update Firebase
    await waterPlant(user.id, plantId);
  };

  // Handle deleting a plant
  const handleDelete = async (plantId) => {
    if (!window.confirm("Are you sure you want to remove this plant?")) return;
    setPlants(plants.filter(p => p.id !== plantId));
    await deletePlant(user.id, plantId);
  };

  if (!user) {
    return (
      <div className="login-prompt">
        <style>{`.login-prompt { padding: 4rem; text-align: center; color: #666; }`}</style>
        <h2>🌿 Welcome!</h2>
        <p>Please log in to manage your plant collection.</p>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <style>{`
        .collection-page { padding: 2rem 1rem; max-width: 1100px; margin: 0 auto; font-family: sans-serif; }
        .header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #e8f5e9; padding-bottom: 1rem; }
        .header-flex h2 { color: #2d5a27; margin: 0; font-size: 2rem; }
        .count-badge { background: #e8f5e9; color: #2d5a27; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
        
        .add-section { background: #fff; padding: 1.5rem; border-radius: 12px; border: 1px solid #eee; margin-bottom: 3rem; }
        
        /* Grid Layout */
        .plant-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
        
        /* Card Styling */
        .plant-card { background: #fff; border-radius: 15px; overflow: hidden; border: 1px solid #eee; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s; display: flex; flex-direction: column; }
        .plant-card:hover { transform: translateY(-5px); }
        .card-img { width: 100%; height: 200px; object-fit: cover; background: #f0f0f0; }
        .card-content { padding: 1.5rem; flex-grow: 1; }
        .card-content h3 { margin: 0 0 10px 0; color: #2d5a27; font-size: 1.4rem; }
        .info-item { font-size: 0.9rem; color: #555; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
        .notes { font-size: 0.85rem; color: #888; border-top: 1px solid #f5f5f5; margin-top: 12px; padding-top: 12px; font-style: italic; }
        
        /* Buttons */
        .card-footer { padding: 1rem 1.5rem; display: flex; gap: 10px; background: #fafafa; }
        .btn { flex: 1; padding: 10px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .btn-water { background: #2d5a27; color: white; }
        .btn-water:hover { background: #3d7a35; }
        .btn-delete { background: white; color: #e53935; border: 1px solid #e53935; }
        .btn-delete:hover { background: #ffeeee; }
        
        .status-badge { position: absolute; top: 10px; right: 10px; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: bold; text-transform: uppercase; background: rgba(255,255,255,0.9); }
      `}</style>
      
      <div className="header-flex">
        <h2>Your Collection</h2>
        <span className="count-badge">{plants.length} Plants</span>
      </div>

      <div className="add-section">
        <AddPlantForm onAdd={handleAdd} />
      </div>

      <div className="plant-grid">
        {plants.map(plant => (
          <div key={plant.id} className="plant-card" style={{ position: 'relative' }}>
            {plant.photoURL ? (
              <img src={plant.photoURL} alt={plant.name} className="card-img" />
            ) : (
              <div className="card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🌿</div>
            )}
            
            <div className="card-content">
              <h3>{plant.name}</h3>
              <div className="info-item">💧 Every {plant.frequency} days</div>
              <div className="info-item">📅 Next: {new Date(plant.nextWateringDate).toLocaleDateString()}</div>
              {plant.notes && <p className="notes">"{plant.notes}"</p>}
            </div>

            <div className="card-footer">
              <button onClick={() => handleWater(plant.id)} className="btn btn-water">Watered</button>
              <button onClick={() => handleDelete(plant.id)} className="btn btn-delete">Remove</button>
            </div>
          </div>
        ))}
      </div>
      
      {plants.length === 0 && !loading && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '3rem' }}>No plants found. Start by adding one above!</p>
      )}
    </div>
  );
}