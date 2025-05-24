import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_DELETE_PRESTATION', async (id: number) => {
  await axios.delete(`${import.meta.env.VITE_GOCHASSE_API}items/prestations/${id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });
});
