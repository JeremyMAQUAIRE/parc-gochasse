import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk('FETCH_READ_DASHBOARD_STRIPE', async () => {
  const userDataLocal = localStorage.getItem('userData');
  const userData = userDataLocal ? JSON.parse(userDataLocal) : null;

  if (!userData?.id || !userData?.id_stripe_account) {
    return false; // données manquantes
  }

  const response = await axios.post(import.meta.env.VITE_DIRECTUS_DASHBOARD_STRIPE, {
    account: userData.id_stripe_account,
    url: import.meta.env.VITE_GOCHASSE_URL,
  });

  if (response.data.status === 200) {
    return true;
  }
  return false; // erreur de validation
});
