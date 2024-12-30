import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { AppDispatch, RootState } from '../store/store';
import IEvent from '../../@types/event';
import readAllEventsByUser from '../../api/directus/event/readAllEventsByUser';

const AdminNavRevenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const revenue = useSelector((state: RootState) => state.revenueReducer);
  const [events, setEvents] = useState<IEvent[]>([]);
  const month = ['_', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await dispatch(readAllEventsByUser());
      setEvents(response.payload);
    };
    fetchCategory();
  }, [dispatch]);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date_event);
    const eventMonth = eventDate.getMonth() + 1;
    const eventYear = eventDate.getFullYear();
    return eventMonth === revenue.month && eventYear === revenue.year;
  });

  // Fonction pour calculer le total des prix des événements filtrés
  const calculateTotalRevenue = () => {
    return filteredEvents.reduce((total, event) => {
      let eventTotal = event.price_event || 0;

      // Si l'application est 'dog', multiplier par number_dog
      if (event.id_prestation.aplicable_on === 'dog') {
        eventTotal *= event.number_dog_event;
      }

      // Si l'application est 'hunter', multiplier par number_hunter
      if (event.id_prestation.aplicable_on === 'hunter') {
        eventTotal *= event.number_hunter_event;
      }

      return total + eventTotal;
    }, 0);
  };

  const totalRevenue = calculateTotalRevenue(); // Total des revenus

  return (
    <div className=" w-5/6 m-auto">
      <section className="flex flex-col items-center justify-center mt-4 border-2 bg-black border-black rounded-lg">
        <div className="flex flex-col justify-center items-center gap-1 pt-1 pb-3 w-5/6">
          <p className="text-2xl font-semibold text-white mt-4">Chiffre d&apos;affaires</p>
          <p className="text-lg font-semibold text-white mt-2">
            {month[revenue.month]} {revenue.year}
          </p>
          <p className="text-2xl font-bold text-brown mt-2">{totalRevenue} €</p>
        </div>
      </section>
    </div>
  );
};

export default AdminNavRevenu;
