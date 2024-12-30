/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import {
  actionClickDialogCreateCategory,
  actionClickDialogCreateEvent,
  actionClickDialogCreateNotificationMail,
  actionClickDialogCreatePrestation,
  actionClickDialogDeleteCategory,
  actionClickDialogDeleteDocument,
  actionClickDialogDeleteEvent,
  actionClickDialogDeleteMember,
  actionClickDialogDeleteNotificationMail,
  actionClickDialogDeletePrestation,
  actionClickDialogDeleteVisitor,
  actionClickDialogInfoMember,
  actionClickDialogNewUserInTheTeam,
  actionClickDialogUpdateCategory,
  actionClickDialogUpdateEvent,
  actionClickDialogUpdatePrestation,
} from '../actionCreator';

const initialState = {
  dialogCreateCategory: false,
  dialogUpdateCategory: false,
  dialogDeleteCategory: false,
  dialogCreatePrestation: false,
  dialogUpdatePrestation: false,
  dialogDeletePrestation: false,
  dialogCreateEvent: false,
  dialogUpdateEvent: false,
  dialogDeleteEvent: false,
  dialogCreateNotificationMail: false,
  dialogDeleteNotificationMail: false,
  dialogNewUserInTheTeam: false,
  dialogDeleteMember: false,
  dialogInfoMember: false,
  dialogDeleteVisitor: false,
  dialogDeleteDocument: false,
};

const dialogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionClickDialogCreateCategory, (state, action) => {
      state.dialogCreateCategory = action.payload;
    })
    .addCase(actionClickDialogUpdateCategory, (state, action) => {
      state.dialogUpdateCategory = action.payload;
    })
    .addCase(actionClickDialogDeleteCategory, (state, action) => {
      state.dialogDeleteCategory = action.payload;
    })
    .addCase(actionClickDialogCreatePrestation, (state, action) => {
      state.dialogCreatePrestation = action.payload;
    })
    .addCase(actionClickDialogUpdatePrestation, (state, action) => {
      state.dialogUpdatePrestation = action.payload;
    })
    .addCase(actionClickDialogDeletePrestation, (state, action) => {
      state.dialogDeletePrestation = action.payload;
    })
    .addCase(actionClickDialogCreateEvent, (state, action) => {
      state.dialogCreateEvent = action.payload;
    })
    .addCase(actionClickDialogUpdateEvent, (state, action) => {
      state.dialogUpdateEvent = action.payload;
    })
    .addCase(actionClickDialogDeleteEvent, (state, action) => {
      state.dialogDeleteEvent = action.payload;
    })
    .addCase(actionClickDialogCreateNotificationMail, (state, action) => {
      state.dialogCreateNotificationMail = action.payload;
    })
    .addCase(actionClickDialogDeleteNotificationMail, (state, action) => {
      state.dialogDeleteNotificationMail = action.payload;
    })
    .addCase(actionClickDialogNewUserInTheTeam, (state, action) => {
      state.dialogNewUserInTheTeam = action.payload;
    })
    .addCase(actionClickDialogDeleteMember, (state, action) => {
      state.dialogDeleteMember = action.payload;
    })
    .addCase(actionClickDialogInfoMember, (state, action) => {
      state.dialogInfoMember = action.payload;
    })
    .addCase(actionClickDialogDeleteVisitor, (state, action) => {
      state.dialogDeleteVisitor = action.payload;
    })
    .addCase(actionClickDialogDeleteDocument, (state, action) => {
      state.dialogDeleteDocument = action.payload;
    });
});
export default dialogReducer;
