import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_READ_USER_CARD_DOCUMENT_BY_MEMBER', async (userId: string) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/users_card_document?filter[user_id][_eq]=${userId}&fields=document.id,document.filename_download`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  return response.data.data;
});
