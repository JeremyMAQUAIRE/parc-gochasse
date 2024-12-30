import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeUserListMailInvitations } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_USER_SOCIETY_MEMBER_BY_USER_PRO_MAIL_NO_NULL', async (_, thunkAPI) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/user_society_member?filter[user_pro][_eq]=${Cookies.get(
      'userId'
    )}&fields=id,user_member_mail&sort=user_member_mail`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  // Filtrer les données pour enlever les objets où user_member_mail est null
  const filteredData = response.data.data.filter((item: { user_member_mail: string | null }) => item.user_member_mail !== null);

  thunkAPI.dispatch(actionChangeUserListMailInvitations(filteredData));
  return filteredData;
});
