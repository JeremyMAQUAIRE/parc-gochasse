import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  actionChangePrestationApplicableOn,
  actionChangePrestationDescription,
  actionChangePrestationNumberDog,
  actionChangePrestationNumberHunter,
  actionChangePrestationPrice,
  actionChangePrestationTimeStart,
  actionChangePrestationTimeStop,
  actionChangePrestationTitle,
} from '../../../components/store/actionCreator';

export default createAsyncThunk('FETCH_READ_PRESTATION_BY_ID', async (id: number, thunkAPI) => {
  await axios
    .get(
      `https://api.gochasse.com/items/prestations/${id}?fields=id,title,description,start_time,end_time,price,aplicable_on,number_of_dogs,number_of_participants`,
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
        },
      }
    )
    .then((response) => {
      thunkAPI.dispatch(actionChangePrestationTitle(response.data.data.title));
      thunkAPI.dispatch(actionChangePrestationPrice(response.data.data.price));
      thunkAPI.dispatch(actionChangePrestationDescription(response.data.data.description));
      thunkAPI.dispatch(actionChangePrestationTimeStart(response.data.data.start_time));
      thunkAPI.dispatch(actionChangePrestationTimeStop(response.data.data.end_time));
      thunkAPI.dispatch(actionChangePrestationApplicableOn(response.data.data.aplicable_on));
      thunkAPI.dispatch(actionChangePrestationNumberDog(response.data.data.number_of_dogs));
      thunkAPI.dispatch(actionChangePrestationNumberHunter(response.data.data.number_of_participants));
      return response.data.data;
    });
});
