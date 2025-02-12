import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import readUserConnection from './readUserConnection';
import sendAlertAvailablePlace from '../../brevo/sendAlertAvailablePlace';
import deleteEventUser from '../event/deleteEventUser';

interface IUserConnectionUpdate {
  idUser: string | number;
  banned: boolean;
}

interface IEventMailPro {
  idEvent: number;
  date: string;
  prestation: string;
  start: string;
  end: string;
  participant: string | boolean | null | number;
}

export default createAsyncThunk('FETCH_UPADTE_USER_CONNECTION', async (metaUpdate: IUserConnectionUpdate, thunkAPI) => {
  // Recupération de l'id a update
  const idDeleteUser = await axios.get(`https://api.gochasse.com/items/user_connection`, {
    params: {
      'filter[id_pro][_eq]': Cookies.get('userId'),
      'filter[id_user][_eq]': metaUpdate.idUser,
      fields: 'id, banned',
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });

  // Je recupere les event de l'utilisateur bannie
  if (metaUpdate.banned) {
    const responseEvent = await axios.get(`https://api.gochasse.com/items/events_directus_users`, {
      params: {
        'filter[directus_users_id][_eq]': metaUpdate.idUser,
        fields:
          'id, events_id.id, events_id.user_created, events_id.date_event, events_id.start_time_event, events_id.end_time_event, events_id.id_prestation.title, events_id.id_prestation.aplicable_on, events_id.number_dog_event, events_id.number_hunter_event',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    });
    // Filtrer les objets dont 'id_event.user_created' est égal à 'Cookies.get('userId')
    interface IUserEvents {
      id: string | number;
      events_id: {
        id: string | number;
        user_created: string | number;
        date_event: string;
        start_time_event: string;
        end_time_event: string;
        id_prestation: {
          title: string;
          aplicable_on: string;
        };
        number_dog_event: number;
        number_hunter_event: number;
      };
    }
    const filteredEvents: IUserEvents[] = responseEvent.data.data.filter(
      (item: IUserEvents) => item.events_id.user_created === Cookies.get('userId')
    );
    if (filteredEvents) {
      filteredEvents.forEach(async (item: IUserEvents) => {
        // J'envoi les mails d'alerte disponible
        await thunkAPI.dispatch(sendAlertAvailablePlace(Number(item.id)));
        // Je mets a jour les event
        const mailProAlert: IEventMailPro = {
          idEvent: Number(item.id),
          date: item.events_id.date_event,
          prestation: item.events_id.id_prestation.title,
          start: item.events_id.start_time_event,
          end: item.events_id.end_time_event,
          participant: item.events_id.id_prestation.aplicable_on === 'dog' ? item.events_id.number_dog_event : item.events_id.number_hunter_event,
        };
        await thunkAPI.dispatch(deleteEventUser(mailProAlert));
      });
    }
  }

  // Si l'utilisateur est banni, on le supprime de mes suivis
  if (metaUpdate.banned) {
    const responseBannedFollow = await axios.get(`https://api.gochasse.com/items/user_follow`, {
      params: {
        'filter[id_pro][_eq]': Cookies.get('userId'),
        'filter[id_user][_eq]': metaUpdate.idUser,
        fields: 'id',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    });
    if (responseBannedFollow.data.data.length > 0) {
      await axios.delete(`https://api.gochasse.com/items/user_follow/${responseBannedFollow.data.data[0].id}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
        },
      });
    }
  }

  // Si l'utilisateur est banni, on le supprime de mes prevenir
  if (metaUpdate.banned) {
    const responseAlerts = await axios.get(`https://api.gochasse.com/items/user_availability_alerts`, {
      params: {
        'filter[id_user][_eq]': metaUpdate.idUser,
        fields: 'id, id_event.user_created',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    });
    // Filtrer les objets dont 'id_event.user_created' est égal à 'Cookies.get('userId')
    interface IUserAvailabilityAlert {
      id: string | number;
      id_event: {
        user_created: string | number;
      };
    }
    const filteredAlerts: IUserAvailabilityAlert[] = responseAlerts.data.data.filter(
      (item: IUserAvailabilityAlert) => item.id_event.user_created === Cookies.get('userId')
    );
    if (filteredAlerts) {
      filteredAlerts.forEach(async (item: IUserAvailabilityAlert) => {
        await axios.delete(`https://api.gochasse.com/items/user_availability_alerts/${item.id}`, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
          },
        });
      });
    }
  }

  // Update de l'utilisateur
  await axios.patch(
    `https://api.gochasse.com/items/user_connection/${idDeleteUser.data.data[0].id}`,
    {
      banned: metaUpdate.banned,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  thunkAPI.dispatch(readUserConnection());
});
