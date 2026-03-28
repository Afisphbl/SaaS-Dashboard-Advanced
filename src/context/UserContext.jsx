import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getUserProfile } from '../api/userApi';
import { useAuth } from '../hooks/useAuth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getUserProfile(userId);
      setProfile(data);
    } catch (err) {
      setError(err.message);
      setProfile({ role: 'user' }); // Fallback on missing profile
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile(user?.id);
  }, [user?.id, fetchProfile]);

  const value = useMemo(() => ({
    profile,
    loading,
    error,
    refreshProfile: () => fetchProfile(user?.id)
  }), [profile, loading, error, fetchProfile, user?.id]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
