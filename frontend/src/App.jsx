import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import { useAuth } from './hooks/useAuth';
import { LoadingScreen } from './components/shared/Spinner';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MenuHistoryPage } from './pages/MenuHistoryPage';
import { SettingsPage } from './pages/SettingsPage';

import './index.css';
import './styles/animations.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Si el usuario está autenticado, redirigir al dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const OnboardingRoute = ({ children }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si ya completó el onboarding, redirigir al dashboard
  if (profile?.onboarding_completed) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const DashboardRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Ya no verificamos onboarding aquí - permitimos acceso directo
  return children;
};

const HomeRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Si está autenticado, redirigir al dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // Si no está autenticado, mostrar landing
  return <LandingPage />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      
      <Route
        path="/onboarding"
        element={
          <OnboardingRoute>
            <OnboardingPage />
          </OnboardingRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <DashboardRoute>
            <DashboardPage />
          </DashboardRoute>
        }
      />

      <Route
        path="/history"
        element={
          <DashboardRoute>
            <MenuHistoryPage />
          </DashboardRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <DashboardRoute>
            <SettingsPage />
          </DashboardRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <AppRoutes />
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
