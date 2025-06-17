'use client';

import React from 'react';

// Placeholder data - replace with actual data source
const placeholderChartData = {
  bar: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  },
  line: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Activity',
        data: [120, 150, 100, 180, 130, 160, 90],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  },
};

const DashboardPage = () => {
  // In a real application, you would fetch data and use a charting library (e.g., Chart.js, Recharts)
  // For now, these are just styled placeholders.

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        
        {/* Placeholder for Bar Graph */}
        <div style={{
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          minWidth: '300px',
          flex: 1
        }}>
          <h2>Sales Overview (Bar Graph)</h2>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #aaa', marginTop: '10px' }}>
            [Bar Graph Placeholder - Data: {JSON.stringify(placeholderChartData.bar.datasets[0].data)}]
          </div>
          <p style={{textAlign: 'center', marginTop: '10px', fontSize: '0.9em', color: '#555'}}>
            Labels: {placeholderChartData.bar.labels.join(', ')}
          </p>
        </div>

        {/* Placeholder for Line Graph */}
        <div style={{
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          minWidth: '300px',
          flex: 1
        }}>
          <h2>User Activity (Line Graph)</h2>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #aaa', marginTop: '10px' }}>
            [Line Graph Placeholder - Data: {JSON.stringify(placeholderChartData.line.datasets[0].data)}]
          </div>
          <p style={{textAlign: 'center', marginTop: '10px', fontSize: '0.9em', color: '#555'}}>
            Labels: {placeholderChartData.line.labels.join(', ')}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage; 