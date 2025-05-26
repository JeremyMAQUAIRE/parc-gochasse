import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_DELETE_GESTION_PARC', async (id: number) => {
  await axios.delete(`${import.meta.env.VITE_GOCHASSE_API}items/parcs_description/${id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });
});
