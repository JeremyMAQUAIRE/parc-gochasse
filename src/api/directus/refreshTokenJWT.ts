import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_REFRESH_TOKEN_JWT', async () => {
  const response = await axios.post('https://api.gochasse.com/auth/refresh', {
    refresh_token: Cookies.get('refreshTokenJWT'),
  });

  if (response.status === 200) {
    Cookies.set('tokenJWT', response.data.data.access_token, {});
    Cookies.set('refreshTokenJWT', response.data.data.refresh_token);
  }
});
