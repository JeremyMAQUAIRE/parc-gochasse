import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_DELETE_USER_CONNECTION_BY_ID_USER_ID_PRO', async (idUser: string | number) => {
  // Recupération de l'id a sup
  const idDeleteUser = await axios.get(`https://api.gochasse.com/items/user_connection`, {
    params: {
      'filter[id_pro][_eq]': Cookies.get('userId'),
      'filter[id_user][_eq]': idUser,
      fields: 'id',
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });

  await axios.delete(`https://api.gochasse.com/items/user_connection/${idDeleteUser.data.data[0].id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });
});
