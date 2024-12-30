import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_CREATE_USER_SOCIETY_MEMBER', async (mail: string) => {
  await axios.post(
    'https://api.gochasse.com/items/user_society_member',
    {
      user_member_mail: mail,
      user_pro: Cookies.get('userId'),
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
});
