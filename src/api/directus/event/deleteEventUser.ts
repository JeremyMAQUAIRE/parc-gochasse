import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface IUserAlert {
  id: string;
}

interface IEventMailPro {
  idEvent: number;
  date: string;
  prestation: string;
  start: string;
  end: string;
  participant: string | boolean | null | number;
}

export default createAsyncThunk('FETCH_DELETE_EVENT_USER', async (eventMail: IEventMailPro) => {
  // Step 1: Récupérer l’événement à modifier
  const response = await axios.get(
    `${import.meta.env.VITE_GOCHASSE_API}items/events_directus_users/${eventMail.idEvent}
      ?fields=*,
              events_id.id,
              events_id.number_dog_event,
              events_id.number_hunter_event,
              events_id.date_event,
              events_id.id_prestation.title,
              events_id.id_prestation.aplicable_on,
              events_id.start_time_event,
              events_id.end_time_event,
              events_id.id_user.business_name,
              events_id.id_user.id`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
  const currentEvent = response.data.data;
  let newNumberDogEvent = currentEvent.number_dog_event;
  let newNumberHunterEvent = currentEvent.number_hunter_event;

  if (currentEvent.events_id.id_prestation.aplicable_on === 'dog') {
    newNumberDogEvent = currentEvent.number_dog_event - parseInt(eventMail.participant as string, 10);
    newNumberHunterEvent = newNumberDogEvent;
  }
  if (currentEvent.events_id.id_prestation.aplicable_on === 'hunter') {
    newNumberHunterEvent = currentEvent.number_hunter_event - parseInt(eventMail.participant as string, 10);
    newNumberDogEvent = newNumberHunterEvent;
  }

  // Step 2: Send the updated value to the API
  await axios.patch(
    `${import.meta.env.VITE_GOCHASSE_API}items/events/${currentEvent.events_id.id}`,
    {
      number_dog_event: newNumberDogEvent,
      number_hunter_event: newNumberHunterEvent,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  // Step : Delete reservation
  await axios.delete(`${import.meta.env.VITE_GOCHASSE_API}items/events_directus_users/${eventMail.idEvent}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });

  // Step : Delete user_availability_alerts
  const alerts = await axios.get(
    `${import.meta.env.VITE_GOCHASSE_API}items/user_availability_alerts?filter[id_event][_eq]=${currentEvent.events_id.id}&fields=id`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
  await Promise.all(
    alerts.data.data.map(async (alert: IUserAlert) => {
      await axios.delete(`${import.meta.env.VITE_GOCHASSE_API}items/user_availability_alerts/${alert.id}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
        },
      });
    })
  );
});
