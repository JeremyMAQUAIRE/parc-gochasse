import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IUpdatePasswordUser {
  token: string | undefined;
  password: string;
}

export default createAsyncThunk('FETCH_UPDATE_PASSWORD_USER', async (data: IUpdatePasswordUser) => {
  const response = await axios.get(`https://api.gochasse.com/users?filter[token_password][_eq]=${data.token}&fields=id,email`, {
    headers: {
      'content-type': 'application/json',
    },
  });

  await axios.patch(
    `https://api.gochasse.com/users/${response.data.data[0].id}`,
    {
      password: data.password,
      token_password: null,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  // Navigate to login page after successful password update
  window.location.href = '/login';
});
