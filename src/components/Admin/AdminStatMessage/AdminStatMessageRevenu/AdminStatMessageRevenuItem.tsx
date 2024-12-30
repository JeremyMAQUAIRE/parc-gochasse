import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { AppDispatch, RootState } from '../../../store/store';
import readCategoryById from '../../../../api/directus/category/readCategoryById';
import ICategory from '../../../../@types/category';
import IEvent from '../../../../@types/event';
import readAllEventsByCategory from '../../../../api/directus/event/readAllEventsByCategory';

interface IAdminStatMessageRevenuItem {
  id: number;
}

// Function to format the date to JJ/MM/AAAA
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AdminStatMessageRevenuItem = ({ id }: IAdminStatMessageRevenuItem) => {
  const dispatch: AppDispatch = useDispatch();
  const revenue = useSelector((state: RootState) => state.revenueReducer);
  const [category, setCategory] = useState<ICategory>({ id: 0, title: '', color: '' });
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await dispatch(readCategoryById(id));
      setCategory(response.payload);
    };
    fetchCategory();
  }, [dispatch, id]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await dispatch(readAllEventsByCategory(id));
      setEvents(response.payload);
    };
    fetchCategory();
  }, [dispatch, id]);

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
    <section className="mb-6 flex flex-col items-center gap-2">
      <h2
        className="flex w-full h-10 items-center justify-between bg-white px-4 rounded-lg text-lg py-1"
        style={{ border: `1px solid ${category.color}` }}
      >
        <p className="flex items-center w-full">{category.title}</p>
        <p className="text-brown font-semibold w-40"> Total : {totalRevenue}€</p>
      </h2>
      <div className="flex flex-col gap-1 w-10/12 m-auto">
        {filteredEvents.map((event) => {
          let eventTotal = event.price_event || 0;

          // Si l'application est 'dog', multiplier par number_dog_event
          if (event.id_prestation.aplicable_on === 'dog') {
            eventTotal *= event.number_dog_event;
          }

          // Si l'application est 'hunter', multiplier par number_hunter_event
          if (event.id_prestation.aplicable_on === 'hunter') {
            eventTotal *= event.number_hunter_event;
          }

          return (
            <div key={event.id} className="flex justify-between px-4">
              <p className="w-full flex items-center">
                <span className="text-brown font-semibold w-20 flex">{formatDate(event.date_event)}</span>
                <span className="mx-2">-</span>
                {event.id_prestation.title}
              </p>
              <p>{eventTotal}€</p> {/* Affichage du prix calculé */}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdminStatMessageRevenuItem;
