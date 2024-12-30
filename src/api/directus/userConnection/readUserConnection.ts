import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeUserListVisitor } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_USER_CONNECTION', async (_, thunkAPI) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/user_connection?filter[id_pro][_eq]=${Cookies.get(
      'userId'
    )}&fields=id,banned,id_user.id,id_user.first_name,id_user.last_name,id_user.email,id_user.id_avatar,id_user.petitGibier,id_user.piegeur, id_user.poste,id_user.traqueur&sort=id_user.last_name`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  thunkAPI.dispatch(actionChangeUserListVisitor(response.data.data));
});
