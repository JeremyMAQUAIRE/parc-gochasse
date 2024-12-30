/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import { actionChangeUserListMailInvitations, actionChangeUserListMembers, actionChangeUserListVisitor } from '../actionCreator';
import IUserMember from '../../../@types/userMember';

const initialState: { listMailInvitations: string[]; listMembers: IUserMember[]; listVisitors: IUserMember[] } = {
  listMailInvitations: [],
  listMembers: [],
  listVisitors: [],
};

const ListUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionChangeUserListMailInvitations, (state, action) => {
      state.listMailInvitations = action.payload;
    })
    .addCase(actionChangeUserListMembers, (state, action) => {
      state.listMembers = action.payload;
    })
    .addCase(actionChangeUserListVisitor, (state, action) => {
      state.listVisitors = action.payload;
    });
});

export default ListUserReducer;
