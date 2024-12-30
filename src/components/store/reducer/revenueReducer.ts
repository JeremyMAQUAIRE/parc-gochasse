/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import { actionChangeRevenuData, actionChangeRevenuMOnthlyTotal, actionChangeRevenuMonth, actionChangeRevenuYear } from '../actionCreator';
import IEvent from '../../../@types/event';

const initialState = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  monthlyTotal: 0,
  data: [] as IEvent[],
};

const revenueReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeRevenuMonth, (state, action) => {
      state.month = action.payload;
    })
    .addCase(actionChangeRevenuYear, (state, action) => {
      state.year = action.payload;
    })
    .addCase(actionChangeRevenuMOnthlyTotal, (state, action) => {
      state.monthlyTotal = action.payload;
    })
    .addCase(actionChangeRevenuData, (state, action) => {
      state.data = action.payload;
    });
});

export default revenueReducer;
