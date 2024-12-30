import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface UserCardDocumentParams {
  idFile: string;
  idUser: string | undefined;
  cardHunter: boolean;
}

export default createAsyncThunk('FETCH_CREATE_USER_CARD_DOCUMENT', async ({ idFile, idUser, cardHunter }: UserCardDocumentParams) => {
  await axios.post(
    'https://api.gochasse.com/items/users_card_document',
    {
      document: idFile,
      user_id: idUser,
      pro_id: Cookies.get('userId'),
      card_hunter: cardHunter,
    },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
});
