import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_READ_PARTICIPANT_BY_ID_EVENT', async (id: number) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/events_directus_users?filter[events_id][_eq]=${id}&fields=*,
      directus_users_id.first_name,
      directus_users_id.last_name,
      events_id.id_prestation.aplicable_on`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  return response.data.data;
});
