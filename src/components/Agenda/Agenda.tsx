import FullCalendar from '@fullcalendar/react';
import { useEffect, useRef, useState } from 'react';
import timeGrid from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import AgendaToolbar from './AgendaToolbar';
import './Agenda.scss';
import { AppDispatch, RootState } from '../store/store';
import readAllEventsByUser from '../../api/directus/event/readAllEventsByUser';
import IEvent from '../../@types/event';
import EventContent from './AgendaEventContent';
import readAllEventsByUserBySlugParc from '../../api/directus/event/readAllEventsByUserBySlugParc';
import IParc from '../../@types/parc';

const Agenda = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { parcAgenda } = useParams();
  const calendarRef = useRef<FullCalendar | null>(null);
  const parcs: IParc[] = useSelector((state: RootState) => state.parcReducer.data);
  const eventFullCalendar = useSelector((state: RootState) => state.eventReducer.dataEvent);
  const [events, setEvents] = useState<{ title: string; start: Date; end: Date; eventItem: IEvent }[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(localStorage.getItem('displayCurrentDate') || new Date().toISOString().split('T')[0]);

  const headerToolbar = {
    left: 'prev title next today',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
    className: 'default-class', // Add a default className or customize as needed
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (parcAgenda) {
        setEvents([]); // Réinitialiser les événements avant de charger les nouveaux
        await dispatch(readAllEventsByUserBySlugParc(parcAgenda));
      } else if (parcs.length > 0) {
        navigate(`/agenda/${parcs[0].slug}`);
      } else {
        await dispatch(readAllEventsByUser());
      }
    };

    fetchEvents();
  }, [dispatch, navigate, parcAgenda, parcs]);

  useEffect(() => {
    if (eventFullCalendar.length > 0) {
      const newEvents = eventFullCalendar.map((event: IEvent) => {
        const [year, month, day] = event.date_event.split('-');
        const baseDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
        const [startHours, startMinutes] = event.start_time_event.split(':');
        const startDate = new Date(baseDate.setHours(parseInt(startHours, 10), parseInt(startMinutes, 10), 0, 0));
        const [endHours, endMinutes] = event.end_time_event.split(':');
        const endDate = new Date(baseDate.setHours(parseInt(endHours, 10), parseInt(endMinutes, 10), 0, 0)); // Ajout de l'heure et des minutes

        return {
          title: event.id_prestation.title,
          start: startDate, // Date complète avec l'heure
          end: endDate, // Date complète avec l'heure
          style: event.id_category.color,
          eventItem: event,
        };
      });

      // Ajouter les nouveaux événements si nécessaire
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents];

        // Ajouter seulement les événements qui ne sont pas déjà dans l'état
        newEvents.forEach((newEvent) => {
          const exists = prevEvents.some((event) => new Date(event.start).getTime() === newEvent.start.getTime() && event.title === newEvent.title);
          if (!exists) {
            updatedEvents.push(newEvent);
          }
        });

        return updatedEvents;
      });
    } else {
      setEvents([]); // Réinitialiser les événements si aucun n'est disponible
    }
  }, [eventFullCalendar]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!calendarRef.current) return;
      const calendarApi = calendarRef.current.getApi();

      if (e.key === 'ArrowLeft') {
        calendarApi.prev(); // Navigate to the previous date
      } else if (e.key === 'ArrowRight') {
        calendarApi.next(); // Navigate to the next date
      }
    };

    // Ajouter un écouteur d'événements pour les touches du clavier
    window.addEventListener('keydown', handleKeyDown);

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const dayHeaderContent = (args: { isToday: boolean; text: string }) => {
    const todayClass = args.isToday ? 'text-green-600 font-normal' : 'text-inherit font-normal';

    return <div className={`h-[60px] w-[200px] flex items-center justify-center ${todayClass}`}>{args.text}</div>;
  };

  const handleDateChange = (arg: { start: Date; end: Date }) => {
    // Crée une copie de la date de début
    const newDate = new Date(arg.start);
    // Ajoute un jour
    newDate.setDate(newDate.getDate() + 1);
    // Convertit la nouvelle date en ISO (format YYYY-MM-DD)
    const formattedDate = newDate.toISOString().split('T')[0];
    setCurrentDate(formattedDate); // Met à jour l'état avec la nouvelle date
    localStorage.setItem('displayCurrentDate', formattedDate); // Enregistre la date dans le localStorage
  };

  return (
    <section
      className="px-40 overflow-scroll"
      style={{ height: 'calc(100% - 5rem)' }}
      key={parcAgenda || 'default'} // Ajoutez la clé ici
    >
      <AgendaToolbar />
      <FullCalendar
        ref={calendarRef}
        locale={frLocale}
        plugins={[timeGrid, dayGridPlugin]}
        initialView="timeGridWeek"
        initialDate={currentDate}
        allDaySlot={false}
        events={events}
        eventContent={EventContent}
        slotMinTime="06:00"
        slotMaxTime="22:00"
        dayHeaderFormat={{
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        }}
        dayHeaderContent={dayHeaderContent}
        headerToolbar={headerToolbar}
        nowIndicator
        weekNumbers
        datesSet={handleDateChange} // Gérer le changement de date
      />
    </section>
  );
};

export default Agenda;
