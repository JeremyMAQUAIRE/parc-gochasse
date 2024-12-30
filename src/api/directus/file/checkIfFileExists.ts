import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createAsyncThunk('FETCH_CHECK_IF_FILE_EXIST', async (fileName: string) => {
  const response = await axios.get(`https://api.gochasse.com/files?filter[filename_download][_contains]=${fileName}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });

  return response.data;
});
