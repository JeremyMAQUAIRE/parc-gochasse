import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_DELETE_EVENT', async (id: number) => {
  // recupere les inscrits à l'évent
  const response = await axios.get(
    `${import.meta.env.VITE_GOCHASSE_API}items/events_directus_users?filter[events_id][_eq]=${id}
      &fields=directus_users_id.email`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
  const mailList = response.data.data;

  // récupere les information de l'event
  const event = await axios.get(
    `${import.meta.env.VITE_GOCHASSE_API}items/events/${id}?fields=*,id_prestation.id,id_prestation.title,id_user.business_name`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  // Envoi des mails
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mailList.map(async (mail: any) => {
    const eventDate = new Date(event.data.data.date_event);
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(eventDate);
    // Combine la date et les heures de début et de fin dans le format souhaité
    const formattedDateTime = `${formattedDate} - ${event.data.data.start_time_event} / ${event.data.data.end_time_event}`;

    const participant = event.data.data.number_dog_event !== 0 ? event.data.data.number_dog_event : event.data.data.number_hunter_event;

    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        to: [
          {
            email: mail.directus_users_id.email,
          },
        ],
        templateId: 11,
        params: {
          EVENT_DATE: formattedDateTime,
          EVENT_PRESTATION: event.data.data.id_prestation.title,
          EVENT_PARTICIPANT: participant,
          EVENT_LINK: `${import.meta.env.VITE_GOCHASSE_URL}`,
        },
      },
      {
        headers: {
          accept: 'application/json',
          'api-key': import.meta.env.VITE_BREVO_API_KEY,
          'content-type': 'application/json',
        },
      }
    );
  });

  // Supprimer l'évent
  await axios.delete(`${import.meta.env.VITE_GOCHASSE_API}items/events/${id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });
});
