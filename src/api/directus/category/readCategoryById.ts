import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeCategoryColor, actionChangeCategoryTitle } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_CATEGORY_BY_ID', async (id: number, thunkAPI) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/categories/${id}?filter[id_user][_eq]=${Cookies.get('userId')}&fields=id,title,color&sort=title`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );
  thunkAPI.dispatch(actionChangeCategoryTitle(response.data.data.title));
  thunkAPI.dispatch(actionChangeCategoryColor(response.data.data.color));
  return response.data.data;
});
