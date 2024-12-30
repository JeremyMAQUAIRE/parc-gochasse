import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import createUserSocietyMember from '../directus/userSocietyMember/createUserSocietyMember';

export default createAsyncThunk('FETCH_SEND_VSOCIETY_INVITATION', async (emails: string[], thunkAPI) => {
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;

  const response = await axios.get(
    `https://api.gochasse.com/items/user_society_member?filter[user_pro][_eq]=${Cookies.get(
      'userId'
    )}&filter[user_member][_eq]=null&fields=id,user_member_mail`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
      },
    }
  );

  const emailsFiltered: string[] = emails.filter((email: string) => {
    return !response.data.data.some((user: { user_member_mail: string }) => user.user_member_mail === email);
  });

  if (Array.isArray(emailsFiltered)) {
    emailsFiltered.forEach(async (email) => {
      thunkAPI.dispatch(createUserSocietyMember(email));
    });
  }

  const formattedEmails = emails.map((email) => ({ email }));

  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      to: formattedEmails,
      templateId: 12,
      params: {
        SOCIETE_NAME: userData.business_name,
        LINK_INVITATION: `${import.meta.env.VITE_GOCHASSE_URL}login`,
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
