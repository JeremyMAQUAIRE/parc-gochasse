import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {
  actionChangeUserIdParcPhotoIllustrationOne,
  actionChangeUserIdParcPhotoIllustrationThree,
  actionChangeUserIdParcPhotoIllustrationTwo,
  actionChangeUserIdParcPhotoProfil,
} from '../../../components/store/actionCreator';
import updateUser from '../user/updateUser';
import createUsersCardDocument from '../usersCardDocument/createUsersCardDocument';

interface IdataImage {
  files: (File | null)[];
  type: string;
  idUser?: string;
}

export default createAsyncThunk('FETCH_SEND_FILE', async (data: IdataImage, thunkAPI) => {
  const formData = new FormData();

  const { files } = data;
  // Utilisez une boucle pour ajouter chaque fichier à FormData
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    if (file) {
      formData.append(`file${i}`, file);
    }
  }

  await axios
    .post('https://api.gochasse.com/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    })
    .then(async (response) => {
      switch (data.type) {
        case 'ParcPhotoProfil':
          thunkAPI.dispatch(
            updateUser({
              name: 'id_photo_profil',
              value: response.data.data.id,
            })
          );
          thunkAPI.dispatch(actionChangeUserIdParcPhotoProfil(response.data.data.id));
          thunkAPI.dispatch(updateUser({ name: 'status_photo_profil', value: 'en cours' }));
          break;
        case 'ParcPhotoIllustration1':
          thunkAPI.dispatch(
            updateUser({
              name: 'id_photo_illustration_one',
              value: response.data.data.id,
            })
          );
          thunkAPI.dispatch(actionChangeUserIdParcPhotoIllustrationOne(response.data.data.id));
          thunkAPI.dispatch(
            updateUser({
              name: 'status_photo_illustrataion_one',
              value: 'en cours',
            })
          );
          break;
        case 'ParcPhotoIllustration2':
          thunkAPI.dispatch(
            updateUser({
              name: 'id_photo_illustration_two',
              value: response.data.data.id,
            })
          );
          thunkAPI.dispatch(actionChangeUserIdParcPhotoIllustrationTwo(response.data.data.id));
          thunkAPI.dispatch(
            updateUser({
              name: 'status_photo_illustrataion_two',
              value: 'en cours',
            })
          );
          break;
        case 'ParcPhotoIllustration3':
          thunkAPI.dispatch(
            updateUser({
              name: 'id_photo_illustration_three',
              value: response.data.data.id,
            })
          );
          thunkAPI.dispatch(actionChangeUserIdParcPhotoIllustrationThree(response.data.data.id));
          thunkAPI.dispatch(
            updateUser({
              name: 'status_photo_illustrataion_three',
              value: 'en cours',
            })
          );
          break;
        case 'CarteChasse':
          thunkAPI.dispatch(
            createUsersCardDocument({
              idFile: response.data.data.id,
              idUser: data.idUser,
              cardHunter: true,
            })
          );
          break;
        case 'DocumentChasse':
          thunkAPI.dispatch(
            createUsersCardDocument({
              idFile: response.data.data.id,
              idUser: data.idUser,
              cardHunter: false,
            })
          );
          break;
        default:
          break;
      }
      return null;
    });
});
