/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import DOMPurify from 'dompurify';
import {
  actionChangeContactLastname,
  actionChangeContactMail,
  actionChangeContactMessage,
  actionChangeContactName,
  actionChangeContactObjet,
  actionResetContactState,
} from '../actionCreator';

const initialState = {
  name: '',
  lastname: '',
  mail: '',
  objet: '',
  message: '',
};

const contactReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionResetContactState, () => initialState)
    .addCase(actionChangeContactName, (state, action) => {
      state.name = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeContactLastname, (state, action) => {
      state.lastname = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeContactMail, (state, action) => {
      state.mail = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeContactObjet, (state, action) => {
      state.objet = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeContactMessage, (state, action) => {
      state.message = DOMPurify.sanitize(action.payload);
    });
});

export default contactReducer;
