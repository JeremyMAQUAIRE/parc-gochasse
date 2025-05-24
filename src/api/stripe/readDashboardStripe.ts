import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk('FETCH_READ_DASHBOARD_STRIPE', async (_, thunkAPI) => {
  const userDataLocal = localStorage.getItem('userData');
  const userData = userDataLocal ? JSON.parse(userDataLocal) : null;
  if (!userData?.id || !userData?.id_stripe_account) {
    return thunkAPI.rejectWithValue('ID utilisateur ou Stripe manquant');
  }

  try {
    const response = await axios.post(import.meta.env.VITE_DIRECTUS_DASHBOARD_STRIPE, {
      account: userData.id_stripe_account,
      url: import.meta.env.VITE_GOCHASSE_URL,
    });

    if (response.data?.error) {
      return thunkAPI.rejectWithValue(response.data.error.message);
    }

    // ✅ Ouvre le lien Stripe dans un nouvel onglet
    window.open(response.data.body.checkout_url, '_blank');
    return response.data.body.checkout_url; // Return the checkout URL
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Axios error (réseau ou 400)
    const message =
      error?.response?.data?.error?.message ||
      `Veuillez contacter l'administrateur Gochasse afin de réinitialiser votre compte Stripe et reprendre l'intégralité du processus de création. Votre Id Compte Stripe est : ${userData.id_stripe_account}`;
    return thunkAPI.rejectWithValue(message);
  }
});
