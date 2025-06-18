'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/home', label: 'Dashboard' },
    { href: '/admin/addproduct', label: 'Add Product' },
    { href: '/admin/users', label: 'Users' }, // Placeholder, will create later if needed
    { href: '/admin/settings', label: 'Settings' }, // Changed from Agent Settings
    { href: '/admin/notifications', label: 'Notifications' }, // Placeholder
  ];

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #ddd',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      <h2 style={{ marginBottom: '30px', textAlign: 'center', color: '#333' }}>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.href} style={{ marginBottom: '15px' }}>
              <Link href={item.href} legacyBehavior>
                <a style={{
                  textDecoration: 'none',
                  color: pathname === item.href ? '#007bff' : '#333',
                  fontWeight: pathname === item.href ? 'bold' : 'normal',
                  display: 'block',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  backgroundColor: pathname === item.href ? '#e9ecef' : 'transparent',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => { if (pathname !== item.href) e.currentTarget.style.backgroundColor = '#e0e0e0'; }}
                onMouseOut={(e) => { if (pathname !== item.href) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 