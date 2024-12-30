import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import readParticipantByIdEvent from '../../api/directus/user/readParticipantByIdEvent';

const AgendaEventParticipant = ({ idEvent }: { idEvent: number }) => {
  const dispatch: AppDispatch = useDispatch();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await dispatch(readParticipantByIdEvent(idEvent));
      setParticipants(response.payload);
    };
    fetchParticipants();
  }, [dispatch, idEvent]);

  return (
    // Bulle de texte
    <div
      style={{ scrollbarWidth: 'none' }}
      className="absolute w-full p-2 mr-2 top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-500 text-white text-sm py-2 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto"
    >
      {/* Flèche en haut */}
      <div className="absolute left-1/4 transform -translate-x-1/2 top-[-8px] w-0 h-0 border-l-8 border-r-8 border-b-8 border-b-zinc-500 border-l-transparent border-r-transparent" />
      {participants &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        participants.map((participant: any) => (
          <p key={participant.id}>
            {participant.directus_users_id.first_name} {participant.directus_users_id.last_name}
            {participant.id_prestation && participant.id_prestation.aplicable_on === 'dog' && <span> {participant.number_dog_event} Chien(s)</span>}
            {participant.id_prestation && participant.id_prestation.aplicable_on === 'hunter' && (
              <span> {participant.number_hunter_event} Participant(s)</span>
            )}
          </p>
        ))}
      {participants.length === 0 && <p>Aucun participant</p>}
    </div>
  );
};

export default AgendaEventParticipant;
