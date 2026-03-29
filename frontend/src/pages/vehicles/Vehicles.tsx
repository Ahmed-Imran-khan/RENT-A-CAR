import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ make: '', model: '', year: '', licensePlate: '', dailyRate: '' });
  const [message, setMessage] = useState('');

  const fetchVehicles = () => {
    api.get('/vehicle').then(res => setVehicles(res.data));
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleSubmit = async () => {
    try {
      await api.post('/vehicle', { ...form, year: Number(form.year), dailyRate: Number(form.dailyRate) });
      setMessage('Vehicle added successfully!');
      setForm({ make: '', model: '', year: '', licensePlate: '', dailyRate: '' });
      fetchVehicles();
    } catch {
      setMessage('Error adding vehicle');
    }
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/vehicle/${id}`);
    fetchVehicles();
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem', marginBottom: '1rem',
    borderRadius: '5px', border: 'none', boxSizing: 'border-box' as const,
    background: '#0f3460', color: 'white'
  };

  return (
    <div style={{ background: '#1a1a2e', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Vehicles</h2>
        <div style={{ display: 'flex', gap: '2rem' }}>

          {/* Add Vehicle Form */}
          <div style={{ background: '#16213e', padding: '1.5rem', borderRadius: '10px', width: '350px' }}>
            <h3 style={{ color: '#e94560', marginBottom: '1rem' }}>Add Vehicle</h3>
            {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
            <input placeholder="Make (e.g. Toyota)" value={form.make} onChange={e => setForm({ ...form, make: e.target.value })} style={inputStyle} />
            <input placeholder="Model (e.g. Corolla)" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} style={inputStyle} />
            <input placeholder="Year (e.g. 2022)" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} style={inputStyle} />
            <input placeholder="License Plate" value={form.licensePlate} onChange={e => setForm({ ...form, licensePlate: e.target.value })} style={inputStyle} />
            <input placeholder="Daily Rate ($)" value={form.dailyRate} onChange={e => setForm({ ...form, dailyRate: e.target.value })} style={inputStyle} />
            <button onClick={handleSubmit} style={{ width: '100%', padding: '0.75rem', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Add Vehicle
            </button>
          </div>

          {/* Vehicles List */}
          <div style={{ flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#16213e' }}>
                  {['Make', 'Model', 'Year', 'License Plate', 'Daily Rate', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ color: '#e94560', padding: '1rem', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v: any) => (
                  <tr key={v._id} style={{ borderBottom: '1px solid #0f3460' }}>
                    <td style={{ color: 'white', padding: '1rem' }}>{v.make}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{v.model}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{v.year}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{v.licensePlate}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>${v.dailyRate}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: v.status === 'available' ? 'lightgreen' : 'orange' }}>
                        {v.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleDelete(v._id)} style={{ background: '#e94560', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {vehicles.length === 0 && <p style={{ color: 'gray', marginTop: '1rem' }}>No vehicles yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;