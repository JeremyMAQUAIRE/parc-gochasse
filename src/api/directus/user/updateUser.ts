import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import readCurrentUser from './readCurrentUser';

interface IitemUpdate {
  name: string;
  value: string | boolean | null | number;
}

export default createAsyncThunk('FETCH_UPDATE_USER', async (itemUpdate: IitemUpdate, thunkAPI) => {
  await axios.patch(
    `${import.meta.env.VITE_GOCHASSE_API}users/${Cookies.get('userId')}`,
    {
      [itemUpdate.name]: itemUpdate.value,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  thunkAPI.dispatch(readCurrentUser());
});
