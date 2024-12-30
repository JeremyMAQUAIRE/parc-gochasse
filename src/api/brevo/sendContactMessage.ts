import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../components/store/store';

export default createAsyncThunk('FETCH_SEND_VALIDATE_MAIL', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const contactForm = state.contactReducer;

  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      to: [
        {
          email: 'readyhunter@hotmail.com',
        },
      ],
      templateId: 3,
      params: {
        NAME: contactForm.name,
        LASTNAME: contactForm.lastname,
        MAIL: contactForm.mail,
        MESSAGE: contactForm.message,
      },
    },
    {
      headers: {
        accept: 'application/json',
        'api-key': import.meta.env.VITE_BREVO_API_KEY,
        'content-type': 'application/json',
      },
    }
  );
});
