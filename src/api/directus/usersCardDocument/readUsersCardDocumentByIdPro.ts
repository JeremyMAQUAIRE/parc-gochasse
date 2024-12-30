import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeUserListCard } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_USER_CARD_DOCUMENT_BY_ID', async (cardHunter: boolean, thunkAPI) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/users_card_document?filter[pro_id][_eq]=${Cookies.get(
      'userId'
    )}&filter[card_hunter][_eq]=${cardHunter}&fields=id,document.id,document.filename_download,date_created,user_id.last_name,user_id.first_name&sort=user_id.last_name&sort=user_id.first_name`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  thunkAPI.dispatch(actionChangeUserListCard(response.data.data));
  return response.data.data;
});
