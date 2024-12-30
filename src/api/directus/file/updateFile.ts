import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import IdataImageUpdate from '../../../@types/dataImageUpdate';

export default createAsyncThunk('FETCH_UPDATE_FILE', async (data: IdataImageUpdate) => {
  const formData = new FormData();

  const { files } = data;
  // Utilisez une boucle pour ajouter chaque fichier à FormData
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    if (file) {
      formData.append(`file${i}`, file);
    }
  }

  await axios.patch(`https://api.gochasse.com/files/${data.id_file}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });
});
