import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalBookings: 0, totalRevenue: 0 });
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get('/booking/stats').then(res => setStats(res.data));
    api.get('/customer').then(res => setCustomers(res.data));
    api.get('/vehicle').then(res => setVehicles(res.data));
  }, []);

  return (
    <div style={{ background: '#1a1a2e', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: 'white', marginBottom: '2rem' }}>Dashboard</h2>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#16213e', padding: '1.5rem', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
            <h3 style={{ color: '#e94560' }}>Total Bookings</h3>
            <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalBookings}</p>
          </div>
          <div style={{ background: '#16213e', padding: '1.5rem', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
            <h3 style={{ color: '#e94560' }}>Total Revenue</h3>
            <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>${stats.totalRevenue}</p>
          </div>
          <div style={{ background: '#16213e', padding: '1.5rem', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
            <h3 style={{ color: '#e94560' }}>Total Customers</h3>
            <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>{customers.length}</p>
          </div>
          <div style={{ background: '#16213e', padding: '1.5rem', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
            <h3 style={{ color: '#e94560' }}>Total Vehicles</h3>
            <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>{vehicles.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;