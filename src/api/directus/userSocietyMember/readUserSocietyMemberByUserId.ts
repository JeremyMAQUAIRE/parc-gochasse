import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeUserListMembers } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_USER_SOCIETY_MEMBER_BY_USER_ID', async (_, thunkAPI) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/user_society_member?filter[user_pro][_eq]=${Cookies.get(
      'userId'
    )}&filter[user_member][_neq]=null&fields=id,is_member,user_member.id,user_member.first_name,user_member.last_name,user_member.email,user_member.id_avatar,user_member.petitGibier,user_member.piegeur, user_member.poste,user_member.traqueur&sort=user_member.last_name`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  thunkAPI.dispatch(actionChangeUserListMembers(response.data.data));
});
