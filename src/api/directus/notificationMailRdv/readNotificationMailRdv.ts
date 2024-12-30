import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeNotificationMailData } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_CREATE_NOTIFICTAION_MAIL_RDV', async (_, thunkApi) => {
  await axios
    .get(`https://api.gochasse.com/items/notification_mail_for_rdv?filter[id_user_pro][_eq]=${Cookies.get('userId')}&fields=mail&sort=mail`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    })
    .then((response) => {
      thunkApi.dispatch(actionChangeNotificationMailData(response.data.data));
    });
});
