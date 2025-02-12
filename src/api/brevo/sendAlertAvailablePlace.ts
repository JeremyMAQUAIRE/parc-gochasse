import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_SEND_ALERT_AVALAIBLE_PLACE', async (eventid: number) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/events_directus_users/${eventid}?fields=*,events_id.id_prestation.title,
      events_id.date_event,
      events_id.id,
      events_id.user_created,
      events_id.start_time_event,
      events_id.end_time_event,
      events_id.id_user.business_name,
      events_id.id_prestation.aplicable_on,
      events_id.number_dog_event,
      events_id.number_hunter_event,
      events_id.number_max_dog_event,
      events_id.number_max_hunter_event`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  const { data } = response.data;

  const placeAvailable = data.events_id.id_prestation.aplicable_on === 'dog' ? data.events_id.number_hunter_event : data.events_id.number_dog_event;

  const responseMail = await axios.get(
    `https://api.gochasse.com/items/user_availability_alerts?filter[id_event][_eq]=${data.events_id.id}&fields=id_user.email`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  // Extract email addresses from responseMail.data.data
  const emails = responseMail.data.data.map((user: { id_user: { email: string } }) => user.id_user.email);

  await Promise.all(
    emails.map(async (email: string) => {
      await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          to: [
            {
              email,
            },
          ],
          templateId: 6,
          params: {
            EVENT_LINK: `${import.meta.env.VITE_GOCHASSE_URL}pro/${data.events_id.user_created}`,
            EVENT_DATE: data.events_id.date_event,
            EVENT_HOUR: data.events_id.start_time_event, // Assuming `start_time_event` is the event hour
            EVENT_BUSINAME: data.events_id.id_user.business_name,
            EVENT_PRESTATION_TITLE: data.events_id.id_prestation.title,
            EVENT_PLACE_AVAILABLE: placeAvailable,
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
    })
  );
});
