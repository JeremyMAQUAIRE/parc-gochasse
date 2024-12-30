import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../../components/store/store';

export default createAsyncThunk('FETCH_CREATE_PRESTATION', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const newPrestation = state.prestationReducer;

  await axios.post(
    'https://api.gochasse.com/items/prestations',
    {
      title: newPrestation.title,
      description: newPrestation.description,
      price: newPrestation.price,
      number_of_participants: newPrestation.numberHunter,
      number_of_dogs: newPrestation.numberDog,
      aplicable_on: newPrestation.applicableOn,
      start_time: newPrestation.startTime,
      end_time: newPrestation.endTime,
      id_category: newPrestation.idCategory,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
});
