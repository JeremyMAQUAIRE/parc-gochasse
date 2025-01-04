/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import DOMPurify from 'dompurify';

import {
  actionChangeEventData,
  actionChangeEventDate,
  actionChangeEventId,
  actionChangeEventIdCategory,
  actionChangeEventIdParc,
  actionChangeEventIdPrestation,
  actionChangeEventRecurrence,
  actionChangeEventRepetition,
  actionChangeEventTimeUnit,
  actionChangeEventTitle,
  actionResetEventState,
} from '../actionCreator';

const initialState = {
  id: 0,
  title: '',
  dateEvent: '',
  idCategory: 0,
  idPrestation: 0,
  idParc: 0,
  isRecurrent: false,
  timeUnit: 'day',
  repetitionNumber: 0,
  dataEvent: [],
};

const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionResetEventState, (state) => {
      const { dataEvent } = state; // Sauvegarde de listUsers
      return { ...initialState, dataEvent };
    })
    .addCase(actionChangeEventId, (state, action) => {
      state.id = action.payload;
    })
    .addCase(actionChangeEventTitle, (state, action) => {
      state.title = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeEventDate, (state, action) => {
      state.dateEvent = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeEventIdCategory, (state, action) => {
      state.idCategory = action.payload;
    })
    .addCase(actionChangeEventIdPrestation, (state, action) => {
      state.idPrestation = action.payload;
    })
    .addCase(actionChangeEventIdParc, (state, action) => {
      state.idParc = action.payload;
    })
    .addCase(actionChangeEventRecurrence, (state, action) => {
      state.isRecurrent = action.payload;
    })
    .addCase(actionChangeEventTimeUnit, (state, action) => {
      state.timeUnit = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeEventRepetition, (state, action) => {
      state.repetitionNumber = action.payload;
    })
    .addCase(actionChangeEventData, (state, action) => {
      state.dataEvent = action.payload;
    });
});
export default eventReducer;
