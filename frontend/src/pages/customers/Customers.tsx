import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [message, setMessage] = useState('');

  const fetchCustomers = () => {
    api.get('/customer').then(res => setCustomers(res.data));
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleSubmit = async () => {
    try {
      await api.post('/customer', form);
      setMessage('Customer added successfully!');
      setForm({ name: '', email: '', phone: '', address: '' });
      fetchCustomers();
    } catch {
      setMessage('Error adding customer');
    }
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/customer/${id}`);
    fetchCustomers();
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
        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Customers</h2>
        <div style={{ display: 'flex', gap: '2rem' }}>

          {/* Add Customer Form */}
          <div style={{ background: '#16213e', padding: '1.5rem', borderRadius: '10px', width: '350px' }}>
            <h3 style={{ color: '#e94560', marginBottom: '1rem' }}>Add Customer</h3>
            {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
            <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
            <input placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} style={inputStyle} />
            <button onClick={handleSubmit} style={{ width: '100%', padding: '0.75rem', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Add Customer
            </button>
          </div>

          {/* Customers List */}
          <div style={{ flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#16213e' }}>
                  {['Name', 'Email', 'Phone', 'Address', 'Action'].map(h => (
                    <th key={h} style={{ color: '#e94560', padding: '1rem', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((c: any) => (
                  <tr key={c._id} style={{ borderBottom: '1px solid #0f3460' }}>
                    <td style={{ color: 'white', padding: '1rem' }}>{c.name}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{c.email}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{c.phone}</td>
                    <td style={{ color: 'white', padding: '1rem' }}>{c.address}</td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleDelete(c._id)} style={{ background: '#e94560', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {customers.length === 0 && <p style={{ color: 'gray', marginTop: '1rem' }}>No customers yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;