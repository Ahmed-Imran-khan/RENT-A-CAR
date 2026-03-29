import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ customerId: '', vehicleId: '', startDate: '', endDate: '', totalAmount: '' });
  const [message, setMessage] = useState('');

  const fetchAll = () => {
    api.get('/booking').then(res => setBookings(res.data));
    api.get('/customer').then(res => setCustomers(res.data));
    api.get('/vehicle').then(res => setVehicles(res.data));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async () => {
    try {
      await api.post('/booking', { ...form, totalAmount: Number(form.totalAmount) });
      setMessage('Booking created successfully!');
      setForm({ customerId: '', vehicleId: '', startDate: '', endDate: '', totalAmount: '' });
      fetchAll();
    } catch {
      setMessage('Error creating booking');
    }
  };

  const handleComplete = async (id: string) => {
    await api.patch(`/booking/${id}/complete`);
    fetchAll();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/booking/${id}`);
    fetchAll();
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem', marginBottom: '1rem',
    borderRadius: '5px', border: 'none', boxSizing: 'border-box' as const,
    background: '#0f3460', color: 'white'
  };

  const selectStyle = {
    ...inputStyle, cursor: 'pointer'
  };

  return (
    <div style={{ background: '#1a1a2e', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Bookings</h2>
        <div style={{ display: 'flex', gap: '2rem' }}>

          {/* Add Booking Form */}
          <div style={{ background: '#16213e', padding: '1.5rem', borderRadius: '10px', width: '350px' }}>
            <h3 style={{ color: '#e94560', marginBottom: '1rem' }}>Create Booking</h3>
            {message && <p style={{ color: 'lightgreen' }}>{message}</p>}

            <select value={form.customerId} onChange={e => setForm({ ...form, customerId: e.target.value })} style={selectStyle}>
              <option value="">Select Customer</option>
              {customers.map((c: any) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <select value={form.vehicleId} onChange={e => setForm({ ...form, vehicleId: e.target.value })} style={selectStyle}>
              <option value="">Select Vehicle</option>
              {vehicles.filter((v: any) => v.status === 'available').map((v: any) => (
                <option key={v._id} value={v._id}>{v.make} {v.model} - ${v.dailyRate}/day</option>
              ))}
            </select>

            <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} style={inputStyle} />
            <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} style={inputStyle} />
            <input placeholder="Total Amount ($)" value={form.totalAmount} onChange={e => setForm({ ...form, totalAmount: e.target.value })} style={inputStyle} />

            <button onClick={handleSubmit} style={{ width: '100%', padding: '0.75rem', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Create Booking
            </button>
          </div>

          {/* Bookings List */}
          <div style={{ flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#16213e' }}>
                  {['Customer', 'Vehicle', 'Start Date', 'End Date', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ color: '#e94560', padding: '1rem', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b: any) => (
                  <tr key={b._id} style={{ borderBottom: '1px solid #0f3460' }}>
                    <td style={{ color: 'white', padding: '1rem' }}>{b.customerId?.name}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{b.vehicleId?.make} {b.vehicleId?.model}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{b.startDate}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{b.endDate}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>${b.totalAmount}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: b.status === 'active' ? 'lightgreen' : 'orange' }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                      {b.status === 'active' && (
                        <button onClick={() => handleComplete(b._id)} style={{ background: 'lightgreen', color: 'black', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>
                          Complete
                        </button>
                      )}
                      <button onClick={() => handleDelete(b._id)} style={{ background: '#e94560', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && <p style={{ color: 'gray', marginTop: '1rem' }}>No bookings yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;