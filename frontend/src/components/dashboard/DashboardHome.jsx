import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { WelcomeCard } from './WelcomeCard';
import { QuickActions } from './QuickActions';
import { RecentMenus } from './RecentMenus';

export const DashboardHome = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <WelcomeCard username={profile?.username} />
      <QuickActions />
      <RecentMenus />
    </div>
  );
};
