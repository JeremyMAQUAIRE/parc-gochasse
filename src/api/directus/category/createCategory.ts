import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../../components/store/store';
import readCategory from './readCategory';

export default createAsyncThunk('FETCH_CREATE_CATEGORY', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const newCatgerory = state.categoryReducer;
  await axios
    .post(
      `${import.meta.env.VITE_GOCHASSE_API}items/categories`,
      {
        title: newCatgerory.title,
        color: newCatgerory.color,
        id_user: Cookies.get('userId'),
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
        },
      }
    )
    .then(() => {
      thunkAPI.dispatch(readCategory());
    });
});
