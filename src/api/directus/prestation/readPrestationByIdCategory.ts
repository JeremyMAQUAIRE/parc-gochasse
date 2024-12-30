import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_READ_PRESTATION_BY_IDCATEGORY', async (id: number) => {
  const response = await axios.get(
    `https://api.gochasse.com/items/prestations?filter[id_category][_eq]=${id}&fields=id,title,start_time,end_time,price`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  return response.data.data;
});
