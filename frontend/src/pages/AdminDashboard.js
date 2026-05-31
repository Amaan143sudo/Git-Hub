import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, BarElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, Filler
);

const AdminDashboard = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#8b949e' } },
      y: { beginAtZero: true, grid: { color: '#2a2a2a' }, ticks: { color: '#8b949e' } }
    },
    plugins: { legend: { display: false } }
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3, 5, 2],
      borderColor: '#7e57c2',
      backgroundColor: 'rgba(126, 87, 194, 0.2)',
      tension: 0.4,
      fill: true
    }]
  };

  const barData = {
    labels: ['M', 'T', 'W', 'T', 'F'],
    datasets: [{
      label: 'Orders',
      data: [5, 10, 8, 12, 7],
      backgroundColor: '#ef5350',
      borderRadius: 6
    }]
  };

  return (
    <div style={{ padding: '30px', background: '#0a0c10', minHeight: '100vh', color: '#fff' }}>
      <h2 style={{ marginBottom: '30px', fontWeight: '600' }}>Dashboard Overview</h2>

      {/* Stats Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        {[
          { title: 'Total Orders', val: '8,052', color: '#7e57c2' },
          { title: 'Total Revenue', val: '56.2K', color: '#42a5f5' },
          { title: 'Active Users', val: '1.3K', color: '#66bb6a' },
          { title: 'New Regs', val: '986', color: '#ffa726' }
        ].map((item, i) => (
          <div key={i} style={{ 
            background: '#161b22', 
            padding: '25px', 
            borderRadius: '16px', 
            borderBottom: `4px solid ${item.color}` // Modern look
          }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0' }}>{item.val}</h3>
            <p style={{ color: '#8b949e', fontSize: '0.85rem', marginTop: '5px' }}>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '25px', 
        marginTop: '30px' 
      }}>
        <div style={{ background: '#161b22', padding: '20px', borderRadius: '16px', height: '300px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>Sales Overview</h3>
          <Line data={lineData} options={chartOptions} />
        </div>
        <div style={{ background: '#161b22', padding: '20px', borderRadius: '16px', height: '300px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>Order Status</h3>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;