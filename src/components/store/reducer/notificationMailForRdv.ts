import { createReducer } from '@reduxjs/toolkit';
import DOMPurify from 'dompurify';
import {
  actionChangeNotificationMailData,
  actionChangeNotificationMailId,
  actionChangeNotificationMailMail,
  actionResetNotificationMailState,
} from '../actionCreator';

const initialState = {
  id: 0,
  mail: '',
  mailsData: [],
};

const notificationMailForRdv = createReducer(initialState, (builder) => {
  builder
    .addCase(actionResetNotificationMailState, (state) => {
      const { mailsData } = state; // Sauvegarde de listUsers
      return { ...initialState, mailsData };
    })
    .addCase(actionChangeNotificationMailId, (state, action) => {
      state.id = action.payload;
    })
    .addCase(actionChangeNotificationMailMail, (state, action) => {
      state.mail = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeNotificationMailData, (state, action) => {
      state.mailsData = action.payload;
    });
});

export default notificationMailForRdv;
