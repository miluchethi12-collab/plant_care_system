import { useState } from 'react';

// A very simple form to collect basic plant info
export default function AddPlantForm({ onAdd }) {
  const [name, setName] = useState('');
  const [frequencyDays, setFrequencyDays] = useState(7);
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onAdd({ name, frequencyDays: Number(frequencyDays), notes, photoUrl });
    setName('');
    setFrequencyDays(7);
    setNotes('');
    setPhotoUrl('');
  };

  const formStyle = { marginBottom: '1rem', background: '#fff', padding: '1rem', borderRadius: '4px' };
  const fieldStyle = { marginBottom: '0.5rem' };
  const inputStyle = { padding: '0.3rem', width: '100%' };
  const labelStyle = { display: 'block', marginBottom: '0.2rem' };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={fieldStyle}>
        <label style={labelStyle}>Name: </label>
        <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Frequency (days): </label>
        <input
          style={inputStyle}
          type="number"
          value={frequencyDays}
          min="1"
          onChange={e => setFrequencyDays(e.target.value)}
          required
        />
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Notes: </label>
        <input style={inputStyle} value={notes} onChange={e => setNotes(e.target.value)} />
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Photo URL: </label>
        <input style={inputStyle} value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
      </div>
      <button type="submit">Add plant</button>
    </form>
  );
}
