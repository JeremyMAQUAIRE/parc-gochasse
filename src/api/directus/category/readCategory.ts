import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeCategoryData } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_ALL_CATEGORY', async (_, thunkAPI) => {
  const userDataString = localStorage.getItem('userData');
  if (!userDataString) {
    throw new Error('User data not found in localStorage');
  }
  const userData = JSON.parse(userDataString);

  await axios
    .get(`https://api.gochasse.com/items/categories?filter[id_user][_eq]=${userData.id}&fields=id,title,color&sort=title`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    })
    .then((response) => {
      thunkAPI.dispatch(actionChangeCategoryData(response.data.data));
    });
});
