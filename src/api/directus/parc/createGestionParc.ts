import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../../components/store/store';

export default createAsyncThunk('FETCH_CREATE_GESTION_PARC', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const newgestionParc = state.parcReducer;
  const slug = newgestionParc.title.replace(/ /g, '-');
  const slugLower = slug.toLowerCase();
  await axios.post(
    `${import.meta.env.VITE_GOCHASSE_API}items/parcs_description`,
    {
      name: newgestionParc.title,
      slug: slugLower,
      id_user: Cookies.get('userId'),
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
});
