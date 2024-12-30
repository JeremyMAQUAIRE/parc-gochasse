import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_DELETE_USER_SOCIETY_MEMBER', async (id: number | string) => {
  await axios.delete(`https://api.gochasse.com/items/user_society_member/${id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });
});
