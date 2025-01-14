import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export default createAsyncThunk('FETCH_SEND_MAIL_PASSWORD_LOST', async (email: string) => {
  const token = uuidv4();

  const response = await axios.get(`https://api.gochasse.com/users?filter[email][_eq]=${email}`, {
    headers: {
      'content-type': 'application/json',
    },
  });

  await axios.patch(
    `https://api.gochasse.com/users/${response.data.data[0].id}`,
    {
      token_password: token,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      to: [
        {
          email,
        },
      ],
      templateId: 5,
      params: {
        LIEN_VALIDATION_MAIL_PASSWORD_LOST: `https://parc.gochasse.com/nouveau-mot-de-passe/${token}`,
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
