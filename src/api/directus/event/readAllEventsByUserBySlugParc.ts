import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeEventData } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_ALL_EVENTS_BY_USER_BY_SLUG_PARC', async (slug: string, thunkAPI) => {
  const idparc = await axios.get(`${import.meta.env.VITE_GOCHASSE_API}items/parcs_description?filter[slug][_eq]=${slug}&fields=id`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });

  const response = await axios.get(
    `${import.meta.env.VITE_GOCHASSE_API}items/events?filter[id_user][_eq]=${Cookies.get('userId')}&filter[id_parcs][_eq]=${
      idparc.data.data[0].id
    }&fields=*,
      id_prestation.title,
      id_prestation.aplicable_on,
      id_prestation.description,
      id_prestation.number_of_participants,
      id_prestation.number_of_dogs,
      id_category.color,
      id_parcs.name
      &sort=date_event&sort=start_time_event`,
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
