import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import updateUser from '../directus/user/updateUser';

export default createAsyncThunk('FETCH_CREATE_ACCOUNT', async (_, thunkAPI) => {
  // Récupérer userData
  const userDataLocal = localStorage.getItem('userData');
  const userData = userDataLocal ? JSON.parse(userDataLocal) : null;
  if (!userData?.id) throw new Error('User ID not found in localStorage.');

  // Récupérer email depuis API gochasse
  const mail = await axios.get(`${import.meta.env.VITE_GOCHASSE_API}users/${userData.id}?fields=email`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
    },
  });

  // Créer le compte stripe
  const formData = new URLSearchParams();
  formData.append('type', 'express');
  formData.append('country', 'FR');
  formData.append('email', mail.data.data.email || '');
  formData.append('capabilities[card_payments][requested]', 'true');
  formData.append('capabilities[transfers][requested]', 'true');

  const response = await axios.post('https://api.stripe.com/v1/accounts', formData.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SK_KEY}`,
    },
  });

  // Rediriger vers le lien de création de compte
  const formDataCreate = new URLSearchParams();
  formDataCreate.append('account', response.data.id);
  formDataCreate.append('refresh_url', `${import.meta.env.VITE_GOCHASSE_URL}administration/paiement-en-ligne`);
  formDataCreate.append('return_url', `${import.meta.env.VITE_GOCHASSE_URL}administration/paiement-en-ligne`);
  formDataCreate.append('type', 'account_onboarding');

  const linkResponse = await axios.post('https://api.stripe.com/v1/account_links', formDataCreate.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SK_KEY}`,
    },
  });

  thunkAPI.dispatch(
    updateUser({
      name: 'id_stripe_account',
      value: response.data.id,
    })
  );
  thunkAPI.dispatch(
    updateUser({
      name: 'stripe_account',
      value: true,
    })
  );

  // ✅ Redirige l'utilisateur directement vers Stripe
  window.location.href = linkResponse.data.url;
});
