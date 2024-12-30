import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_CREATE_NOTIFICTAION_MAIL_RDV', async (mail: string) => {
  await axios.post(
    'https://api.gochasse.com/items/notification_mail_for_rdv',
    {
      mail,
      id_user_pro: Cookies.get('userId'),
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
});
