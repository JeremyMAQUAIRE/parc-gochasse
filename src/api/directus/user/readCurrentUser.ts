import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_READ_USER', async () => {
  if (localStorage.getItem('userData')) {
    localStorage.removeItem('userData');
  }

  await axios
    .get(`${import.meta.env.VITE_GOCHASSE_API}users/me`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    })
    .then((response) => {
      Cookies.set('userId', response.data.data.id);
      Cookies.set('businessName', response.data.data.business_name);
      localStorage.setItem('userData', JSON.stringify(response.data.data));
    });
});
