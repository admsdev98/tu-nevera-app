import { Card } from '../shared/Card';

export const WelcomeCard = ({ username }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-primary-dark text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {getGreeting()}, {username}
      </h1>
      <p className="text-primary-light">
        ¿Qué te gustaría cocinar hoy?
      </p>
    </Card>
  );
};
