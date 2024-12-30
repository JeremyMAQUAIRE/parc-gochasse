import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import readUserSocietyMemberByUserId from './readUserSocietyMemberByUserId';

interface IitemUpdateUsermember {
  id: number | string;
  name: string;
  value: string | boolean | null | number;
}

export default createAsyncThunk('FETCH_UPDATE_USER_SOCIETY_MEMBER', async (itemUpdate: IitemUpdateUsermember, thunkAPI) => {
  await axios.patch(
    `https://api.gochasse.com/items/user_society_member/${itemUpdate.id}`,
    {
      [itemUpdate.name]: itemUpdate.value,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  thunkAPI.dispatch(readUserSocietyMemberByUserId());
});
