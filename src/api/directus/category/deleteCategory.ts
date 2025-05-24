import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import readCategory from './readCategory';

export default createAsyncThunk('FETCH_DELETE_CATEGORY', async (id: number, thunkAPI) => {
  await axios
    .delete(`${import.meta.env.VITE_GOCHASSE_API}items/categories/${id}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    })
    .then(() => {
      thunkAPI.dispatch(readCategory());
    });
});
