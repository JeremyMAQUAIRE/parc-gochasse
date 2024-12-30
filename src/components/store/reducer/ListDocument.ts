/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import { actionChangeUserListCard, actionChangeUserListDocument } from '../actionCreator';
import ICardUser from '../../../@types/userCard';

const initialState: { listCard: ICardUser[]; listDocument: ICardUser[] } = {
  listCard: [],
  listDocument: [],
};

const ListDocument = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeUserListCard, (state, action) => {
      state.listCard = action.payload;
    })
    .addCase(actionChangeUserListDocument, (state, action) => {
      state.listDocument = action.payload;
    });
});

export default ListDocument;
