import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import readParticipantByIdEvent from '../../../../api/directus/user/readParticipantByIdEvent';

interface IAdminAgendaEvenementParticipants {
  idEvent: number;
}

interface IParticipant {
  id: number;
  number_hunter_event: number;
  number_dog_event: number;
  events_id: {
    id_prestation: {
      aplicable_on: string;
    };
  };
  directus_users_id: {
    first_name: string;
    last_name: string;
  };
}

const AdminAgendaEvenementParticipants = ({ idEvent }: IAdminAgendaEvenementParticipants) => {
  const disaptch: AppDispatch = useDispatch();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await disaptch(readParticipantByIdEvent(idEvent));
      setParticipants(response.payload);
    };
    fetchParticipants();
  }, [disaptch, idEvent]);

  return (
    <div>
      {participants.length > 0 ? (
        <ul className="ml-20 my-4">
          {participants.map((participant: IParticipant) => (
            <li key={participant.id}>
              {participant.directus_users_id.first_name} {participant.directus_users_id.last_name} :
              <span className="text-brown font-bold ml-2">
                {participant.number_hunter_event} {participant.events_id.id_prestation.aplicable_on === 'dog' ? 'chien(s)' : 'participant(s)'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="ml-20 mb-4 italic">Aucune inscription</h1>
      )}
    </div>
  );
};

export default AdminAgendaEvenementParticipants;
