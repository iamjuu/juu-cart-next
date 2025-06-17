import AdminLayout from '@/components/admin/AdminLayout';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
} 