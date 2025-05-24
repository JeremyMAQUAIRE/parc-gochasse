import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import readCategory from './readCategory';
import { RootState } from '../../../components/store/store';

export default createAsyncThunk('FETCH_UPDATE_CATEGORY', async (id: number, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const newCatgerory = state.categoryReducer;
  await axios
    .patch(
      `${import.meta.env.VITE_GOCHASSE_API}items/categories/${id}`,
      {
        title: newCatgerory.title,
        color: newCatgerory.color,
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
