import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface IFileDelete {
  id: string;
  type: string;
}

export default createAsyncThunk('FETCH_DELETE_FILE', async (dataFile: IFileDelete) => {
  await axios.delete(`https://api.gochasse.com/files/${dataFile.id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });
});
