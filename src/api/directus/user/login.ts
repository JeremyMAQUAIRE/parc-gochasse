import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import readCurrentUser from './readCurrentUser';

interface ICredentials {
  email: string;
  password: string;
}

// Action to log in the user
export default createAsyncThunk('FETCH_LOGIN_USER', async (credentials: ICredentials, thunkAPI) => {
  try {
    // Make the API request to log the user in
    const response = await axios.post(
      `${import.meta.env.VITE_GOCHASSE_API}auth/login`,
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    Cookies.set('tokenJWT', response.data.data.access_token, {});
    Cookies.set('refreshTokenJWT', response.data.data.refresh_token);
    Cookies.set('isConnected', 'true');
    // If successful, dispatch readCurrentUser and return the response data
    await thunkAPI.dispatch(readCurrentUser());

    // Return response data for the logged-in user (if necessary)
    return response.data;
  } catch (error) {
    // If the request fails, reject with the error message
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
    }
    return thunkAPI.rejectWithValue('Login failed');
  }
});
