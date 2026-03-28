import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { Loader } from '../components/Loader/Loader';
import { useToast } from '../context/ToastContext';

export function AdminRoute() {
  const { profile, loading } = useUser();
  const { addToast } = useToast();

  if (loading) return <Loader fullScreen />;

  if (profile?.role !== 'admin') {
    // Optionally trigger a toast inside a useEffect, 
    // but here we just redirect with a bit of a delay or immediate.
    // React Router DOM state can be used, or just replace
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
