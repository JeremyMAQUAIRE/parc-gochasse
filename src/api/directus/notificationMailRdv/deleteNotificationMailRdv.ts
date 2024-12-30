import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_DELETE_NOTIFICTAION_MAIL_RDV', async (mail: string) => {
  // retrieve the item ID to delete
  const response = await axios.get(
    `https://api.gochasse.com/items/notification_mail_for_rdv?filter[mail][_eq]=${mail}&filter[id_user_pro][_eq]=${Cookies.get('userId')}`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  // delete the item
  await axios.delete(`https://api.gochasse.com/items/notification_mail_for_rdv/${response.data.data[0].id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });
});
