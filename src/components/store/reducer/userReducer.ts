/* eslint-disable import/no-cycle */
import { createReducer } from '@reduxjs/toolkit';
import DOMPurify from 'dompurify';
import {
  actionChangeUserBusinessName,
  actionChangeUserCity,
  actionChangeUserCloseDate,
  actionChangeUserCodeZip,
  actionChangeUserConfirmPassword,
  actionChangeUserErrorMail,
  actionChangeUserErrorPassword,
  actionChangeUserErrorPhone,
  actionChangeUserFirstname,
  actionChangeUserFormatErrorImageAssurance,
  actionChangeUserFormatErrorImagePermis,
  actionChangeUserFormatErrorImageValidation,
  actionChangeUserIdImageAssurrance,
  actionChangeUserIdImageAvatar,
  actionChangeUserIdImagePermis,
  actionChangeUserIdImageValidation,
  actionChangeUserIdParcPhotoIllustrationOne,
  actionChangeUserIdParcPhotoIllustrationThree,
  actionChangeUserIdParcPhotoIllustrationTwo,
  actionChangeUserIdParcPhotoProfil,
  actionChangeUserLinkFacebook,
  actionChangeUserLinkInstagram,
  actionChangeUserLinkWeb,
  actionChangeUserMail,
  actionChangeUserMailNotification,
  actionChangeUserMailNotificationIdOne,
  actionChangeUserName,
  actionChangeUserNumberStreet,
  actionChangeUserOpenDate,
  actionChangeUserOpenDayFriday,
  actionChangeUserOpenDayMonday,
  actionChangeUserOpenDaySaturday,
  actionChangeUserOpenDaySunday,
  actionChangeUserOpenDayThursday,
  actionChangeUserOpenDayTuesday,
  actionChangeUserOpenDayWednesday,
  actionChangeUserPassword,
  actionChangeUserPhone,
  actionChangeUserRandomKey,
  actionChangeUserSpecialityPetitGibier,
  actionChangeUserSpecialityPiegeur,
  actionChangeUserSpecialityPoste,
  actionChangeUserSpecialityRecherAuSang,
  actionChangeUserSpecialityTraqueur,
  actionChangeUserStatusParcPhotoIllustrationOne,
  actionChangeUserStatusParcPhotoIllustrationThree,
  actionChangeUserStatusParcPhotoIllustrationTwo,
  actionChangeUserStatusParcPhotoProfil,
  actionChangeUserStreet,
  actionChangeUserTextDescription,
  actionChangeUserTextMailDescription,
  actionChangeUserTitleImageAssurrance,
  actionChangeUserTitleImagePermis,
  actionChangeUserTitleImageValidation,
  actionCleanFormCreateUser,
  actionUserIsConnected,
  actionUserStatutProfil,
  actionChangeUserMondayHourOpen,
  actionChangeUserMondayHourClose,
  actionChangeUserThursdayHourClose,
  actionChangeUserThursdayHourOpen,
  actionChangeUserTuesdayHourClose,
  actionChangeUserWednesdayHourOpen,
  actionChangeUserWednesdayHourClose,
  actionChangeUserTuesdayHourOpen,
  actionChangeUserFridayHourOpen,
  actionChangeUserFridayHourClose,
  actionChangeUserSaturdayHourOpen,
  actionChangeUserSaturdayHourClose,
  actionChangeUserSundayHourOpen,
  actionChangeUserSundayHourClose,
  actionChangeUserDelayRdv,
  actionChangeUserDelayAnnulationRdv,
  actionChangeUserSendMailNEwRdvForAnnulation,
  actionChangeUserTextConsigne,
  actionChangeUserDisplayConsigne,
  actionChangeUserSendNotification,
  actionChangeUserListFollows,
  actionChangeUserid,
} from '../actionCreator';
import IUser from '../../../@types/user';

const initialState: IUser = {
  id: '',
  name: '',
  businessName: '',
  firstname: '',
  mail: '',
  errorPhone: false,
  phone: '',
  errorEmail: false,
  password: '',
  confirmPassword: '',
  errorPassword: false,
  isConnected: false,
  statutProfil: false,
  randomKey: '',
  numberStreet: '',
  street: '',
  codeZip: '',
  city: '',
  idImageAvatar: '',
  idImagePermis: '',
  titleImagePermis: '',
  idImageValidation: '',
  titleImageValidation: '',
  idImageAssurance: '',
  titleImageAssurrance: '',
  errorFormatImagePermis: false,
  errorFormatImageValidation: false,
  errorFormatImageAssurance: false,
  isTraqueur: false,
  isPoste: false,
  isPetitGibier: false,
  isPiegeur: false,
  isRechercheAuSang: false,
  idParcPhotoProfil: '',
  idParcPhotoIllustrationOne: '',
  idParcPhotoIllustrationTwo: '',
  idParcPhotoIllustrationThree: '',
  statusParcPhotoProfil: '',
  statusParcIllustrationOne: '',
  statusParcIllustrationTwo: '',
  statusParcIllustrationThree: '',
  linkWeb: '',
  linkFacebook: '',
  linkInstagram: '',
  textDescription: '',
  mailNotification: [],
  textMailDescription: '',
  mailNotificationIdOne: '',
  openDate: '',
  closeDate: '',
  isMonday: true,
  mondayHoursOpen: '',
  mondayHoursClose: '',
  isTuesday: true,
  isWednesday: true,
  isThursday: true,
  isFriday: true,
  isSaturday: true,
  isSunday: true,
  tuesdayHoursOpen: '',
  tuesdayHoursClose: '',
  wednesdayHoursOpen: '',
  wednesdayHoursClose: '',
  thursdayHoursOpen: '',
  thursdayHoursClose: '',
  fridayHoursOpen: '',
  fridayHoursClose: '',
  saturdayHoursOpen: '',
  saturdayHoursClose: '',
  sundayHoursOpen: '',
  sundayHoursClose: '',
  delayRdv: null,
  delayAnnulaitionRdv: null,
  isSendForNewRdv: true,
  textConsigne: '',
  isDisplayConsigne: true,
  isSendNotification: true,
  listFollows: [],
  listMailInvitations: [],
  listMembers: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionUserIsConnected, (state, action) => {
      state.isConnected = action.payload;
    })
    .addCase(actionUserStatutProfil, (state, action) => {
      state.statutProfil = action.payload;
    })
    .addCase(actionChangeUserid, (state, action) => {
      state.id = action.payload;
    })
    .addCase(actionChangeUserFirstname, (state, action) => {
      state.firstname = DOMPurify.sanitize(action.payload).charAt(0).toUpperCase() + DOMPurify.sanitize(action.payload).slice(1).toLowerCase();
    })
    .addCase(actionChangeUserName, (state, action) => {
      state.name = DOMPurify.sanitize(action.payload).toUpperCase();
    })
    .addCase(actionChangeUserBusinessName, (state, action) => {
      state.businessName = DOMPurify.sanitize(action.payload).toUpperCase();
    })
    .addCase(actionChangeUserMail, (state, action) => {
      state.mail = DOMPurify.sanitize(action.payload).toLowerCase();
    })
    .addCase(actionChangeUserErrorMail, (state, action) => {
      state.errorEmail = action.payload;
    })
    .addCase(actionChangeUserPhone, (state, action) => {
      state.phone = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserErrorPhone, (state, action) => {
      state.errorPhone = action.payload;
    })
    .addCase(actionChangeUserPassword, (state, action) => {
      state.password = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserConfirmPassword, (state, action) => {
      state.confirmPassword = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserErrorPassword, (state, action) => {
      state.errorPassword = action.payload;
    })
    .addCase(actionChangeUserRandomKey, (state, action) => {
      state.randomKey = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserStreet, (state, action) => {
      state.street = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserNumberStreet, (state, action) => {
      state.numberStreet = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserCodeZip, (state, action) => {
      state.codeZip = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserCity, (state, action) => {
      state.city = DOMPurify.sanitize(action.payload).toUpperCase();
    })
    .addCase(actionCleanFormCreateUser, (state) => {
      state.name = '';
      state.mail = '';
      state.phone = '';
      state.firstname = '';
      state.password = '';
      state.confirmPassword = '';
      state.errorEmail = false;
      state.errorPhone = false;
      state.errorPassword = false;
    })
    .addCase(actionChangeUserIdImageAvatar, (state, action) => {
      state.idImageAvatar = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserIdImagePermis, (state, action) => {
      state.idImagePermis = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserTitleImagePermis, (state, action) => {
      state.titleImagePermis = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserIdImageValidation, (state, action) => {
      state.idImageValidation = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserTitleImageValidation, (state, action) => {
      state.titleImageValidation = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserIdImageAssurrance, (state, action) => {
      state.idImageAssurance = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserTitleImageAssurrance, (state, action) => {
      state.titleImageAssurrance = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserFormatErrorImageAssurance, (state, action) => {
      state.errorFormatImageAssurance = action.payload;
    })
    .addCase(actionChangeUserFormatErrorImagePermis, (state, action) => {
      state.errorFormatImagePermis = action.payload;
    })
    .addCase(actionChangeUserFormatErrorImageValidation, (state, action) => {
      state.errorFormatImageValidation = action.payload;
    })
    .addCase(actionChangeUserSpecialityPetitGibier, (state, action) => {
      state.isPetitGibier = action.payload;
    })
    .addCase(actionChangeUserSpecialityPiegeur, (state, action) => {
      state.isPiegeur = action.payload;
    })
    .addCase(actionChangeUserSpecialityPoste, (state, action) => {
      state.isPoste = action.payload;
    })
    .addCase(actionChangeUserSpecialityTraqueur, (state, action) => {
      state.isTraqueur = action.payload;
    })
    .addCase(actionChangeUserSpecialityRecherAuSang, (state, action) => {
      state.isRechercheAuSang = action.payload;
    })
    .addCase(actionChangeUserIdParcPhotoProfil, (state, action) => {
      state.idParcPhotoProfil = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserIdParcPhotoIllustrationOne, (state, action) => {
      state.idParcPhotoIllustrationOne = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserIdParcPhotoIllustrationTwo, (state, action) => {
      state.idParcPhotoIllustrationTwo = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserIdParcPhotoIllustrationThree, (state, action) => {
      state.idParcPhotoIllustrationThree = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserStatusParcPhotoProfil, (state, action) => {
      state.statusParcPhotoProfil = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserStatusParcPhotoIllustrationOne, (state, action) => {
      state.statusParcIllustrationOne = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserStatusParcPhotoIllustrationTwo, (state, action) => {
      state.statusParcIllustrationTwo = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserStatusParcPhotoIllustrationThree, (state, action) => {
      state.statusParcIllustrationThree = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserLinkWeb, (state, action) => {
      state.linkWeb = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserLinkFacebook, (state, action) => {
      state.linkFacebook = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserLinkInstagram, (state, action) => {
      state.linkInstagram = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserTextDescription, (state, action) => {
      state.textDescription = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserTextMailDescription, (state, action) => {
      state.textMailDescription = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserMailNotification, (state, action) => {
      state.mailNotification = action.payload;
    })
    .addCase(actionChangeUserMailNotificationIdOne, (state, action) => {
      state.mailNotificationIdOne = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserOpenDate, (state, action) => {
      state.openDate = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserCloseDate, (state, action) => {
      state.closeDate = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserOpenDayMonday, (state, action) => {
      state.isMonday = action.payload;
    })
    .addCase(actionChangeUserOpenDayTuesday, (state, action) => {
      state.isTuesday = action.payload;
    })
    .addCase(actionChangeUserOpenDayWednesday, (state, action) => {
      state.isWednesday = action.payload;
    })
    .addCase(actionChangeUserOpenDayThursday, (state, action) => {
      state.isThursday = action.payload;
    })
    .addCase(actionChangeUserOpenDayFriday, (state, action) => {
      state.isFriday = action.payload;
    })
    .addCase(actionChangeUserOpenDaySaturday, (state, action) => {
      state.isSaturday = action.payload;
    })
    .addCase(actionChangeUserOpenDaySunday, (state, action) => {
      state.isSunday = action.payload;
    })
    .addCase(actionChangeUserMondayHourOpen, (state, action) => {
      state.mondayHoursOpen = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserMondayHourClose, (state, action) => {
      state.mondayHoursClose = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserThursdayHourOpen, (state, action) => {
      state.thursdayHoursOpen = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserThursdayHourClose, (state, action) => {
      state.thursdayHoursClose = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserWednesdayHourOpen, (state, action) => {
      state.wednesdayHoursOpen = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserWednesdayHourClose, (state, action) => {
      state.wednesdayHoursClose = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserTuesdayHourOpen, (state, action) => {
      state.tuesdayHoursOpen = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserTuesdayHourClose, (state, action) => {
      state.tuesdayHoursClose = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserFridayHourOpen, (state, action) => {
      state.fridayHoursOpen = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserFridayHourClose, (state, action) => {
      state.fridayHoursClose = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserSaturdayHourOpen, (state, action) => {
      state.saturdayHoursOpen = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserSaturdayHourClose, (state, action) => {
      state.saturdayHoursClose = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserSundayHourOpen, (state, action) => {
      state.sundayHoursOpen = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserSundayHourClose, (state, action) => {
      state.sundayHoursClose = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserDelayRdv, (state, action) => {
      state.delayRdv = action.payload;
    })
    .addCase(actionChangeUserDelayAnnulationRdv, (state, action) => {
      state.delayAnnulaitionRdv = action.payload;
    })
    .addCase(actionChangeUserSendMailNEwRdvForAnnulation, (state, action) => {
      state.isSendForNewRdv = action.payload;
    })
    .addCase(actionChangeUserTextConsigne, (state, action) => {
      state.textConsigne = DOMPurify.sanitize(action.payload);
    })
    .addCase(actionChangeUserDisplayConsigne, (state, action) => {
      state.isDisplayConsigne = action.payload;
    })
    .addCase(actionChangeUserSendNotification, (state, action) => {
      state.isSendNotification = action.payload;
    })
    .addCase(actionChangeUserListFollows, (state, action) => {
      state.listFollows = action.payload;
    });
});

export default userReducer;
