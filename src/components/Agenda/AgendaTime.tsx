import { useEffect, useState } from 'react';

const AgendaTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    // Nettoyer l'interval à chaque démontage du composant
    return () => clearInterval(timerID);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="flex items-center justify-center px-4 rounded-lg text-xl border-2 border-dotted border-brown h-10 font-medium">
      {formatTime(currentTime)}
    </div>
  );
};

export default AgendaTime;
