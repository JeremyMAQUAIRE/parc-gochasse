/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import DOMPurify from 'dompurify';
import {
  actionChangePrestationApplicableOn,
  actionChangePrestationData,
  actionChangePrestationDescription,
  actionChangePrestationId,
  actionChangePrestationIdCategory,
  actionChangePrestationNumberDog,
  actionChangePrestationNumberHunter,
  actionChangePrestationPrice,
  actionChangePrestationTimeStart,
  actionChangePrestationTimeStop,
  actionChangePrestationTitle,
  actionResetPrestationState,
} from '../actionCreator';

const initialState = {
  id: 0,
  title: '',
  description: '',
  price: 0,
  numberHunter: 0,
  numberDog: 0,
  applicableOn: 'dog',
  startTime: '',
  endTime: '',
  idCategory: 0,
  dataPrestation: [],
};

const prestationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionResetPrestationState, (state) => {
      const { dataPrestation } = state;
      return { ...initialState, dataPrestation };
    })
    .addCase(actionChangePrestationId, (state, action) => {
      state.id = action.payload;
    })
    .addCase(actionChangePrestationTitle, (state, action) => {
      state.title = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangePrestationDescription, (state, action) => {
      state.description = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangePrestationPrice, (state, action) => {
      state.price = action.payload;
    })
    .addCase(actionChangePrestationNumberHunter, (state, action) => {
      state.numberHunter = action.payload;
    })
    .addCase(actionChangePrestationNumberDog, (state, action) => {
      state.numberDog = action.payload;
    })
    .addCase(actionChangePrestationApplicableOn, (state, action) => {
      state.applicableOn = action.payload;
    })
    .addCase(actionChangePrestationTimeStart, (state, action) => {
      state.startTime = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangePrestationTimeStop, (state, action) => {
      state.endTime = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangePrestationIdCategory, (state, action) => {
      state.idCategory = action.payload;
    })
    .addCase(actionChangePrestationData, (state, action) => {
      state.dataPrestation = action.payload;
    });
});
export default prestationReducer;
