import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import readUserConnection from './readUserConnection';

interface IUserConnectionUpdate {
  idUser: string | number;
  banned: boolean;
}

export default createAsyncThunk('FETCH_UPADTE_USER_CONNECTION', async (metaUpdate: IUserConnectionUpdate, thunkAPI) => {
  // Recupération de l'id a update
  const idDeleteUser = await axios.get(`https://api.gochasse.com/items/user_connection`, {
    params: {
      'filter[id_pro][_eq]': Cookies.get('userId'),
      'filter[id_user][_eq]': metaUpdate.idUser,
      fields: 'id, banned',
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });

  await axios.patch(
    `https://api.gochasse.com/items/user_connection/${idDeleteUser.data.data[0].id}`,
    {
      banned: metaUpdate.banned,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  thunkAPI.dispatch(readUserConnection());
});
