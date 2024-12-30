/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import DOMPurify from 'dompurify';

import {
  actionChangeCategoryColor,
  actionChangeCategoryData,
  actionChangeCategoryId,
  actionChangeCategoryTitle,
  actionResetCategoryState,
} from '../actionCreator';

const initialState = {
  id: 0,
  title: '',
  color: '',
  dataCategory: [],
};

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionResetCategoryState, (state) => {
      const { dataCategory } = state; // Sauvegarde de listUsers
      return { ...initialState, dataCategory };
    })
    .addCase(actionChangeCategoryId, (state, action) => {
      state.id = action.payload;
    })
    .addCase(actionChangeCategoryTitle, (state, action) => {
      state.title = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeCategoryColor, (state, action) => {
      state.color = action.payload;
    })
    .addCase(actionChangeCategoryData, (state, action) => {
      state.dataCategory = action.payload;
    });
});
export default categoryReducer;
