import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_READ_USER', async (idUser: string | number) => {
  const response = await axios.get(
    `https://api.gochasse.com/users/${idUser}?fields=email,first_name,last_name,phone,id_avatar,id_assurrance,id_permis,id_validation`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  return response.data.data;
});
