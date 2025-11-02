import { createContext, useState, useEffect } from 'react';
import { authService, profileService } from '../services/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const { data: authListener } = authService.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data } = await authService.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        await fetchProfile(data.session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await profileService.getProfile(userId);
      if (!error && data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email, password, username) => {
    const { data, error } = await authService.signUp(email, password, username);
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await authService.signIn(email, password);
    return { data, error };
  };

  const signInWithOAuth = async (provider) => {
    const { data, error } = await authService.signInWithOAuth(provider);
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await authService.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
    }
    return { error };
  };

  const updateProfile = async (updates) => {
    if (!user) return false;
    
    const { data, error } = await profileService.updateProfile(user.id, updates);
    if (!error && data) {
      setProfile(data);
      return true;
    }
    return false;
  };

  const completeOnboarding = async (profileData) => {
    if (!user) return { error: new Error('No user logged in') };
    
    const { data, error } = await profileService.completeOnboarding(
      user.id,
      profileData
    );
    if (!error && data) {
      setProfile(data);
      return { data, error: null };
    }
    return { data: null, error };
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    updateProfile,
    completeOnboarding,
    refreshProfile: () => fetchProfile(user?.id),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
