import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { persistor } from '../../../components/store/store';

import { actionUserIsConnected } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_LOGOUT_USER', async (_, thunkAPI) => {
  await axios.post(
    'https://api.gochasse.com/auth/logout',
    {
      refresh_token: `Bearer ${Cookies.get('refreshTokenJWT')}`,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  Cookies.remove('tokenJWT');
  Cookies.remove('refreshTokenJWT');
  Cookies.remove('isConnected');
  Cookies.remove('userId');
  Cookies.remove('userName');
  Cookies.remove('userFirstname');
  Cookies.remove('profil');
  Cookies.remove('role');
  localStorage.removeItem('userData');
  persistor.purge();
  thunkAPI.dispatch(actionUserIsConnected(false));
  window.location.href = '/';
});
