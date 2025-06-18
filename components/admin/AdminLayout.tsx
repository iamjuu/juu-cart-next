import React from 'react';
import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{
        marginLeft: '250px', // Same as sidebar width
        padding: '20px',
        width: 'calc(100% - 250px)', // Adjust width to account for sidebar
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 