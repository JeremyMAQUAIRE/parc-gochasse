import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../../components/store/store';

export default createAsyncThunk('FETCH_UPDATE_PRESTATION', async (id: number, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const updatePrestation = state.prestationReducer;

  await axios.patch(
    `${import.meta.env.VITE_GOCHASSE_API}items/prestations/${id}`,
    {
      title: updatePrestation.title,
      description: updatePrestation.description,
      price: updatePrestation.price,
      number_of_participants: updatePrestation.numberHunter,
      number_of_dogs: updatePrestation.numberDog,
      aplicable_on: updatePrestation.applicableOn,
      start_time: updatePrestation.startTime,
      end_time: updatePrestation.endTime,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
});
