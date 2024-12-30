import { Plus, Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { AppDispatch, RootState } from '../../../store/store';
import {
  actionChangeEventId,
  actionChangePrestationTitle,
  actionClickDialogCreateEvent,
  actionClickDialogDeleteEvent,
} from '../../../store/actionCreator';
import DialogCreateEvent from './DialogCreateEvent';
import readAllEventsByUser from '../../../../api/directus/event/readAllEventsByUser';
import IEvent from '../../../../@types/event';
import transformData from '../../../../utils/eventSort';
import dog from '../../../../../public/dog.webp';
import hunter from '../../../../../public/hunter.webp';
import DialogDeleteEvent from './DialogDeleteEvent';
import AdminAgendaEvenementParticipants from './AdminAgendaEvenementParticipants';

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  // Format the date to show "day month year" (e.g., "16 décembre 2024")
  return dateObj.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatDateEvent = (date: string) => {
  const dateObj = new Date(date); // Create a Date object from the string
  const day = dateObj.getDate().toString().padStart(2, '0'); // Get day with leading zero if needed
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero if needed
  const year = dateObj.getFullYear(); // Get the full year
  return `${day}/${month}/${year}`; // Return formatted date as 'dd-mm-yyyy'
};

const AdminAgendaEvenement = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentDate = new Date();
  const dialogOpen = useSelector((state: RootState) => state.dialogReducer);
  const events: IEvent[] = useSelector((state: RootState) => state.eventReducer.dataEvent);
  const [eventsSort, setEventsSort] = useState<{
    [key: number]: { weekNumber: number; year: number; startOfWeek: string; endOfWeek: string; events: IEvent[] };
  }>({});
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(readAllEventsByUser());
  }, [dispatch]);
  useEffect(() => {
    if (events.length > 0) {
      setEventsSort(transformData(events, isArchived));
    }
  }, [events, isArchived]);

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Liste des évènements</h1>
        <div className="flex items-center">
          {!isArchived && (
            <button
              type="button"
              onClick={() => dispatch(actionClickDialogCreateEvent(true))}
              className="flex items-center justify-center gap-3 px-10 rounded-md py-2 text-brown hover:text-white hover:bg-brown"
            >
              <Plus className="text-white bg-brown w-8 h-8" /> Créer un évènement
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsArchived(!isArchived)}
            className="flex items-center justify-center gap-3 px-10 h-10 rounded-md py-2 text-brown hover:text-white hover:bg-brown"
          >
            {isArchived ? 'Voir les évènements à venir' : 'Voir les évènements passés'}
          </button>
        </div>
      </header>
      <div className="mt-20 mb-20">
        {Object.values(eventsSort).map((weekData) => (
          <div key={weekData.weekNumber + weekData.year} className="w-10/12 m-auto mt-4">
            <h2 className="flex border-4 border-black w-96 rounded-md">
              <span className="flex flex-col items-center justify-center px-2 pb-2 bg-white rounded-l-sm">
                <span className="h-4 text-brown font-bold">Sem</span>
                <span className="h-4">{weekData.weekNumber}</span>
              </span>
              <span className="flex flex-grow items-center pl-4 bg-brown w-full rounded-r-sm text-white font-semibold text-base">
                Du {formatDate(weekData.startOfWeek).slice(0, -4)} au {formatDate(weekData.endOfWeek).slice(0, -4)}{' '}
                {new Date(weekData.endOfWeek).getFullYear()}
              </span>
            </h2>
            {weekData.events.map((event) => (
              <div
                key={`${weekData.weekNumber}-${event.id}`}
                className={
                  currentDate < new Date(event.date_event)
                    ? 'flex flex-col justify-between px-4 h-16 rounded-lg mt-2 hover:scale-105'
                    : 'flex flex-col justify-between px-4 h-16 rounded-lg mt-2 hover:scale-105 bg-zinc-300 opacity-50'
                }
                style={{
                  border: `3px solid ${event.id_category.color}`,
                  height: selectedEventId === event.id ? 'auto' : '64px', // Conditionally adjust height
                }}
                role="button" // Add a role of "button" to indicate interactivity
                tabIndex={0} // Make the div focusable for keyboard interaction
                onClick={() => setSelectedEventId(selectedEventId === event.id ? null : event.id)} // Toggle selection
                onKeyDown={(e) => {
                  // Handle keyboard events
                  if (e.key === 'Enter' || e.key === ' ') {
                    // Enter or Space key
                    setSelectedEventId(selectedEventId === event.id ? null : event.id);
                  }
                }}
              >
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <p className="font-bold">{event.id_prestation.title}</p>
                    <p className="text-brown font-semibold pl-2">{formatDateEvent(event.date_event)}</p>
                    <p className="text-zinc-500/75 font-semibold pl-2">
                      {event.start_time_event}/{event.end_time_event}
                    </p>
                    <p className="text-zinc-500/75 font-semibold pl-2">- {event.price_event}€</p>
                    {currentDate > new Date(event.date_event) && <p className="text-zinc-500/75 font-semibold pl-2">(Evénement clos)</p>}
                  </div>
                  <div className="flex items-center">
                    <p
                      className={
                        currentDate < new Date(event.date_event)
                          ? 'flex border-4 border-black rounded-md h-10 items-center gap-6 mr-4 px-2 text-brown font-semibold'
                          : 'flex border-4 border-black rounded-md h-10 items-center gap-6 mr-4 px-2 text-white bg-brown font-semibold'
                      }
                    >
                      <img src={event.id_prestation.aplicable_on === 'hunter' ? hunter : dog} alt="Chien" className="h-6 w-6" />
                      <span>
                        <span className="text-xl">
                          {event.id_prestation.aplicable_on === 'hunter'
                            ? event.number_max_hunter_event - event.number_hunter_event
                            : event.number_max_dog_event - event.number_dog_event}
                        </span>
                        /{event.id_prestation.aplicable_on === 'hunter' ? event.number_max_hunter_event : event.number_max_dog_event}
                      </span>
                    </p>
                    <button type="button">
                      {currentDate < new Date(event.date_event) && (
                        <Trash2
                          className="bg-red-500 rounded-full p-2 h-10 w-10 text-white hover:bg-white hover:text-red-500"
                          style={{ border: '1px solid black' }}
                          onClick={() => {
                            dispatch(actionClickDialogDeleteEvent(true));
                            dispatch(actionChangePrestationTitle(event.id_prestation.title));
                            dispatch(actionChangeEventId(event.id));
                          }}
                        />
                      )}
                    </button>
                  </div>
                </div>
                {selectedEventId === event.id && <AdminAgendaEvenementParticipants idEvent={event.id} />}
              </div>
            ))}
          </div>
        ))}
        {dialogOpen.dialogCreateEvent && <DialogCreateEvent />}
        {dialogOpen.dialogDeleteEvent && <DialogDeleteEvent />}
      </div>
    </div>
  );
};

export default AdminAgendaEvenement;
