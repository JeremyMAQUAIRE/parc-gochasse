import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeEventData } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_ALL_EVENT_BY_CATEGORY', async (id: number, thunkAPI) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_GOCHASSE_API
    }items/events?filter[id_category][_eq]=${id}&fields=*,id_prestation.description,id_prestation.title,id_prestation.aplicable_on,id_category.color,id_parcs.name&sort=start_time_event&sort=date_event`,
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
