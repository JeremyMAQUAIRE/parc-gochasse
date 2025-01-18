import FullCalendar from '@fullcalendar/react';
import { useEffect, useRef, useState } from 'react';
import timeGrid from '@fullcalendar/timegrid';
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
  const initialDate: string = localStorage.getItem('displayCurrentDate') || new Date().toISOString().split('T')[0];

  const headerToolbar = {
    left: 'prev title next today',
    right: 'timeGridWeek,timeGridDay',
    className: 'default-class',
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (parcAgenda) {
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
        const endDate = new Date(baseDate.setHours(parseInt(endHours, 10), parseInt(endMinutes, 10), 0, 0));

        return {
          title: event.id_prestation.title,
          start: startDate,
          end: endDate,
          style: event.id_category.color,
          eventItem: event,
        };
      });

      setEvents(newEvents); // Remplacez directement les anciens événements
    } else {
      setEvents([]);
    }
  }, [eventFullCalendar]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!calendarRef.current) return;
      const calendarApi = calendarRef.current.getApi();

      if (e.key === 'ArrowLeft') {
        calendarApi.prev();
      } else if (e.key === 'ArrowRight') {
        calendarApi.next();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const dayHeaderContent = (args: { isToday: boolean; text: string }) => {
    const todayClass = args.isToday ? 'text-brown font-normal' : 'text-inherit font-normal';

    return <div className={`h-[60px] w-[200px] flex items-center justify-center ${todayClass}`}>{args.text}</div>;
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
        plugins={[timeGrid]}
        initialView="timeGridWeek"
        initialDate={initialDate}
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
      />
    </section>
  );
};

export default Agenda;
