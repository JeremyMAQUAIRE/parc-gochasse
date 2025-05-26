import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { actionChangeGestionParcData } from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_ALL_GESTION_PARC_BY_USER', async (_, thunkAPI) => {
  await axios
    .get(`${import.meta.env.VITE_GOCHASSE_API}items/parcs_description?filter[id_user][_eq]=${Cookies.get('userId')}&sort=name`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    })
    .then((response) => {
      thunkAPI.dispatch(actionChangeGestionParcData(response.data.data));
    });
});
