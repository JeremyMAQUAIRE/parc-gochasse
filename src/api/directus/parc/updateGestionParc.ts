import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { RootState } from '../../../components/store/store';

export default createAsyncThunk('FETCH_UPDATE_GESTION_PARC', async (id: number, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const updateItem = state.parcReducer;
  const slug = updateItem.title.replace(/ /g, '-');
  const slugLower = slug.toLowerCase();
  await axios.patch(
    `${import.meta.env.VITE_GOCHASSE_API}items/parcs_description/${id}`,
    {
      name: updateItem.title,
      slug: slugLower,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
});
