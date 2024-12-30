import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeEventData } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_ALL_EVENTS_BY_USER', async (_, thunkAPI) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/events?filter[id_user][_eq]=${Cookies.get('userId')}&fields=*,
      id_prestation.title,
      id_prestation.aplicable_on,
      id_prestation.description,
      id_prestation.number_of_participants,
      id_prestation.number_of_dogs,
      id_category.color&sort=date_event&sort=start_time_event`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  thunkAPI.dispatch(actionChangeEventData(response.data.data));
  return response.data.data;
});
