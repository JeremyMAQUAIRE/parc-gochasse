/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import DOMPurify from 'dompurify';
import { actionChangeGestionParcData, actionChangeGestionParcId, actionChangeGestionParcTitle, actionCleanGestionParc } from '../actionCreator';

const initialState = {
  id: 0,
  title: '',
  data: [],
};

const parcReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeGestionParcTitle, (state, action) => {
      state.title = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeGestionParcId, (state, action) => {
      state.id = action.payload;
    })
    .addCase(actionChangeGestionParcData, (state, action) => {
      state.data = action.payload;
    })
    .addCase(actionCleanGestionParc, (state) => {
      state.title = initialState.title;
      state.id = initialState.id;
    });
});

export default parcReducer;
