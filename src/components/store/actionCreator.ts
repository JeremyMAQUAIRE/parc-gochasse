import { createAction } from '@reduxjs/toolkit';
import IEvent from '../../@types/event';
import IUserMember from '../../@types/userMember';
import ICardUser from '../../@types/userCard';

// management of user
export const actionResetState = createAction('@user/RESET_STATE');
export const actionUserIsConnected = createAction<boolean>('@user/USER_IS_CONNECTED');
export const actionUserStatutProfil = createAction<boolean>('@user/USER_STATUT_PROFIL');
export const actionChangeUserid = createAction<string>('@user/CHANGE_USER_ID');
export const actionChangeUserName = createAction<string>('@user/CHANGE_USER_NAME');
export const actionChangeUserBusinessName = createAction<string>('@user/CHANGE_USER_BUSINESS_NAME');
export const actionChangeUserFirstname = createAction<string>('@user/CHANGE_USER_FIRSTNAME');
export const actionChangeUserMail = createAction<string>('@user/CHANGE_USER_MAIL');
export const actionChangeUserErrorMail = createAction<boolean>('@user/CHANGE_USER_ERROR_MAIL');
export const actionChangeUserPhone = createAction<string>('@user/CHANGE_USER_PHONE');
export const actionChangeUserErrorPhone = createAction<boolean>('@user/CHANGE_USER_ERROR_PHONE');
export const actionChangeUserPassword = createAction<string>('@user/CHANGE_USER_PASSWORD');
export const actionChangeUserConfirmPassword = createAction<string>('@user/CHANGE_USER_CONFIRM_PASSWORD');
export const actionChangeUserErrorPassword = createAction<boolean>('@user/CHANGE_USER_ERROR_PASSWORD');
export const actionChangeUserRandomKey = createAction<string>('@user/CHANGE_USER_RANDOM_KEY');
export const actionCleanFormCreateUser = createAction('@user/CLEAN_FORM_CREATE_USER');
export const actionChangeUserNumberStreet = createAction<string>('@user/CHANGE_USER_NUMBER_STREET');
export const actionChangeUserStreet = createAction<string>('@user/CHANGE_USER_STREET');
export const actionChangeUserCodeZip = createAction<string>('@user/CHANGE_USER_CODEZIP');
export const actionChangeUserCity = createAction<string>('@user/CHANGE_USER_CITY');
export const actionChangeUserIdImageAvatar = createAction<string>('@user/CHANGE_USER_ID_IMAGE_AVATAR');
export const actionChangeUserIdImagePermis = createAction<string>('@user/CHANGE_USER_ID_IMAGE_PERMIS');
export const actionChangeUserTitleImagePermis = createAction<string>('@user/CHANGE_USER_TITLE_IMAGE_PERMIS');
export const actionChangeUserIdImageValidation = createAction<string>('@user/CHANGE_USER_ID_IMAGE_VALIDATION');
export const actionChangeUserTitleImageValidation = createAction<string>('@user/CHANGE_USER_TITLE_IMAGE_VALIDATION');
export const actionChangeUserIdImageAssurrance = createAction<string>('@user/CHANGE_USER_ID_IMAGE_ASSURRANCE');
export const actionChangeUserTitleImageAssurrance = createAction<string>('@user/CHANGE_USER_TITLE_IMAGE_ASSURRANCE');
export const actionChangeUserFormatErrorImagePermis = createAction<boolean>('@user/CHANGE_USER_FORMAT_ERROR_IMAGE_PERMIS');
export const actionChangeUserFormatErrorImageValidation = createAction<boolean>('@user/CHANGE_USER_FORMAT_ERROR_IMAGE_VALIDATION');
export const actionChangeUserFormatErrorImageAssurance = createAction<boolean>('@user/CHANGE_USER_FORMAT_ERROR_IMAGE_ASSURRANCE');
export const actionChangeUserSpecialityTraqueur = createAction<boolean>('@user/CHANGE_USER_SPECIALITY_TRAQUEUR');
export const actionChangeUserSpecialityPoste = createAction<boolean>('@user/CHANGE_USER_SPECIALITY_POSTE');
export const actionChangeUserSpecialityPetitGibier = createAction<boolean>('@user/CHANGE_USER_SPECIALITY_PETITGIBIER');
export const actionChangeUserSpecialityPiegeur = createAction<boolean>('@user/CHANGE_USER_SPECIALITY_PIEGEUR');
export const actionChangeUserSpecialityRecherAuSang = createAction<boolean>('@user/CHANGE_USER_SPECIALITY_RECHERCHEAUSANG');
export const actionChangeUserIdParcPhotoProfil = createAction<string>('@user/CHANGE_USER_ID_PARC_PHOTO_PROFIL');
export const actionChangeUserIdParcPhotoIllustrationOne = createAction<string>('@user/CHANGE_USER_ID_PARC_PHOTO_ILLUSTRATION1');
export const actionChangeUserIdParcPhotoIllustrationTwo = createAction<string>('@user/CHANGE_USER_ID_PARC_PHOTO_ILLUSTRATION2');
export const actionChangeUserIdParcPhotoIllustrationThree = createAction<string>('@user/CHANGE_USER_ID_PARC_PHOTO_ILLUSTRATION3');
export const actionChangeUserStatusParcPhotoProfil = createAction<string>('@user/CHANGE_USER_STATUS_PARC_PHOTO_PROFIL');
export const actionChangeUserStatusParcPhotoIllustrationOne = createAction<string>('@user/CHANGE_USER_STATUS_PARC_PHOTO_ILLUSTRATION1');
export const actionChangeUserStatusParcPhotoIllustrationTwo = createAction<string>('@user/CHANGE_USER_STATUS_PARC_PHOTO_ILLUSTRATION2');
export const actionChangeUserStatusParcPhotoIllustrationThree = createAction<string>('@user/CHANGE_USER_STATUS_PARC_PHOTO_ILLUSTRATION3');
export const actionChangeUserLinkWeb = createAction<string>('@user/CHANGE_USER_LINK_WEB');
export const actionChangeUserLinkFacebook = createAction<string>('@user/CHANGE_USER_LINK_FACEBOOK');
export const actionChangeUserLinkInstagram = createAction<string>('@user/CHANGE_USER_LINK_INSTAGRAM');
export const actionChangeUserTextDescription = createAction<string>('@user/CHANGE_USER_TEXT_DESCRIPTION');
export const actionChangeUserTextMailDescription = createAction<string>('@user/CHANGE_USER_TEXT_MAIL_DESCRIPTION');
export const actionChangeUserMailNotification = createAction<[]>('@user/CHANGE_USER_MAIL_NOTIFICATION');
export const actionChangeUserMailNotificationIdOne = createAction<string>('@user/CHANGE_USER_MAIL_NOTIFICATION_ID_ONE');
export const actionChangeUserOpenDate = createAction<string>('@user/CHANGE_USER_OPEN_DATE');
export const actionChangeUserCloseDate = createAction<string>('@user/CHANGE_USER_CLOSE_DATE');
export const actionChangeUserOpenDayMonday = createAction<boolean>('@user/CHANGE_USER_OPEN_DAY_MONDAY');
export const actionChangeUserOpenDayTuesday = createAction<boolean>('@user/CHANGE_USER_OPEN_DAY_TUESDAY');
export const actionChangeUserOpenDayWednesday = createAction<boolean>('@user/CHANGE_USER_OPEN_DAY_WEDNESDAY');
export const actionChangeUserOpenDayThursday = createAction<boolean>('@user/CHANGE_USER_OPEN_DAY_THURSDAY');
export const actionChangeUserOpenDayFriday = createAction<boolean>('@user/CHANGE_USER_OPEN_DAY_FRIDAY');
export const actionChangeUserOpenDaySaturday = createAction<boolean>('@user/CHANGE_USER_OPEN_DAY_SATURDAY');
export const actionChangeUserOpenDaySunday = createAction<boolean>('@user/CHANGE_USER_OPEN_DAY_SUNDAY');
export const actionChangeUserMondayHourOpen = createAction<string>('@user/CHANGE_USER_HOUR_MONDAY_OPEN');
export const actionChangeUserMondayHourClose = createAction<string>('@user/CHANGE_USER_HOUR_MONDAY_CLOSE');
export const actionChangeUserThursdayHourOpen = createAction<string>('@user/CHANGE_USER_HOUR_THURSDAY_OPEN');
export const actionChangeUserThursdayHourClose = createAction<string>('@user/CHANGE_USER_HOUR_THURSDAY_CLOSE');
export const actionChangeUserWednesdayHourOpen = createAction<string>('@user/CHANGE_USER_HOUR_WEDNESDAY_OPEN');
export const actionChangeUserWednesdayHourClose = createAction<string>('@user/CHANGE_USER_HOUR_WEDNESDAY_CLOSE');
export const actionChangeUserTuesdayHourOpen = createAction<string>('@user/CHANGE_USER_HOUR_TUESDAY_OPEN');
export const actionChangeUserTuesdayHourClose = createAction<string>('@user/CHANGE_USER_HOUR_TUESDAY_CLOSE');
export const actionChangeUserFridayHourOpen = createAction<string>('@user/CHANGE_USER_HOUR_FRIDAY_OPEN');
export const actionChangeUserFridayHourClose = createAction<string>('@user/CHANGE_USER_HOUR_FRIDAY_CLOSE');
export const actionChangeUserSaturdayHourOpen = createAction<string>('@user/CHANGE_USER_HOUR_SATURDAY_OPEN');
export const actionChangeUserSaturdayHourClose = createAction<string>('@user/CHANGE_USER_HOUR_SATURDAY_CLOSE');
export const actionChangeUserSundayHourOpen = createAction<string>('@user/CHANGE_USER_HOUR_SUNDAY_OPEN');
export const actionChangeUserSundayHourClose = createAction<string>('@user/CHANGE_USER_HOUR_SUNDAY_CLOSE');
export const actionChangeUserDelayRdv = createAction<number | null>('@user/CHANGE_USER_DELAY_RDV');
export const actionChangeUserDelayAnnulationRdv = createAction<number | null>('@user/CHANGE_USER_DELAY_ANNULATION_RDV');
export const actionChangeUserSendMailNEwRdvForAnnulation = createAction<boolean>('@user/CHANGE_USER_SEND_MAIL_NEWRVD_FOR_ANNULATION');
export const actionChangeUserTextConsigne = createAction<string>('@user/CHANGE_USER_TEXT_CONSIGNE');
export const actionChangeUserDisplayConsigne = createAction<boolean>('@user/CHANGE_USER_DISPLAY_CONSIGNE');
export const actionChangeUserSendNotification = createAction<boolean>('@user/CHANGE_USER_SEND_NOTIFICTION');
export const actionChangeUserListFollows = createAction<[]>('@user/CHANGE_USER_LIST_FOLLOW');

// management of dialog
export const actionClickDialogCreateCategory = createAction<boolean>('@dialog/CLICK_DIALOG_CREATE_CATEGORY');
export const actionClickDialogUpdateCategory = createAction<boolean>('@dialog/CLICK_DIALOG_UPDATE_CATEGORY');
export const actionClickDialogDeleteCategory = createAction<boolean>('@dialog/CLICK_DIALOG_DELETE_CATEGORY');
export const actionClickDialogCreatePrestation = createAction<boolean>('@dialog/CLICK_DIALOG_CREATE_PRESTATION');
export const actionClickDialogUpdatePrestation = createAction<boolean>('@dialog/CLICK_DIALOG_UPDATE_PRESTATION');
export const actionClickDialogDeletePrestation = createAction<boolean>('@dialog/CLICK_DIALOG_DELETE_PRESTATION');
export const actionClickDialogCreateEvent = createAction<boolean>('@dialog/CLICK_DIALOG_CREATE_EVENT');
export const actionClickDialogUpdateEvent = createAction<boolean>('@dialog/CLICK_DIALOG_UPDATE_EVENT');
export const actionClickDialogDeleteEvent = createAction<boolean>('@dialog/CLICK_DIALOG_DELETE_EVENT');
export const actionClickDialogCreateNotificationMail = createAction<boolean>('@dialog/CLICK_DIALOG_CREATE_NOTIFICATION_MAIL');
export const actionClickDialogDeleteNotificationMail = createAction<boolean>('@dialog/CLICK_DIALOG_DELETE_NOTIFICATION_MAIL');
export const actionClickDialogNewUserInTheTeam = createAction<boolean>('@dialog/CLICK_DIALOG_NEW_USER_IN_THE_TEAM');
export const actionClickDialogDeleteMember = createAction<boolean>('@dialog/CLICK_DIALOG_DELETE_MEMBER');
export const actionClickDialogInfoMember = createAction<boolean>('@dialog/CLICK_DIALOG_INFO_MEMBER');
export const actionClickDialogDeleteVisitor = createAction<boolean>('@dialog/CLICK_DIALOG_DELETE_VISITOR');
export const actionClickDialogDeleteDocument = createAction<boolean>('@dialog/CLICK_DIALOG_DELETE_DOCUMENT');
export const actionClickDialogCreateParc = createAction<boolean>('@dialog/CLICK_DIALOG_CREATE_PARC');
export const actionClickDialogUpdateParc = createAction<boolean>('@dialog/CLICK_DIALOG_UPDATE_PARC');
export const actionClickDialogDeleteParc = createAction<boolean>('@dialog/CLICK_DIALOG_DELETE_PARC');

// management of category
export const actionResetCategoryState = createAction('@category/RESET_CATEGORY_STATE');
export const actionChangeCategoryId = createAction<number>('@category/CHANGE_CATEGORY_ID');
export const actionChangeCategoryTitle = createAction<string>('@category/CHANGE_CATEGORY_TITLE');
export const actionChangeCategoryColor = createAction<string>('@category/CHANGE_CATEGORY_COLOR');
export const actionChangeCategoryData = createAction<[]>('@category/CHANGE_CATEGORY_DATA');

// management of prestation
export const actionResetPrestationState = createAction('@prestation/RESET_PRESTATION_STATE');
export const actionChangePrestationId = createAction<number>('@prestation/CHANGE_PRESTATION_ID');
export const actionChangePrestationTitle = createAction<string>('@prestation/CHANGE_PRESTATION_CATEGORY_TITLE');
export const actionChangePrestationDescription = createAction<string>('@prestation/CHANGEPRESTATION_DESCRIPTION');
export const actionChangePrestationTimeStart = createAction<string>('@prestation/CHANGE_PRESTATION_TIMESTART');
export const actionChangePrestationTimeStop = createAction<string>('@prestation/CHANGEPRESTATION_TIMESTOP');
export const actionChangePrestationPrice = createAction<number>('@prestation/CHANGE_PRESTATION_PRICE');
export const actionChangePrestationNumberHunter = createAction<number>('@prestation/CHANGE_PRESTATION_NUMBER_HUNTER');
export const actionChangePrestationNumberDog = createAction<number>('@prestation/CHANGE_PRESTATION_NUMBER_DOG');
export const actionChangePrestationApplicableOn = createAction<string>('@prestation/CHANGE_PRESTATION_APPLICABLE_ON');
export const actionChangePrestationIdCategory = createAction<number>('@prestation/CHANGE_PRESTATION_IDCATEGORY');
export const actionChangePrestationData = createAction<[]>('@prestation/CHANGE_PRESTATION_DATA');

// management of event
export const actionResetEventState = createAction('@event/RESET_EVENT_STATE');
export const actionChangeEventId = createAction<number>('@event/CHANGE_EVENT_ID');
export const actionChangeEventTitle = createAction<string>('@event/CHANGE_EVENT_TITLE');
export const actionChangeEventDate = createAction<string>('@event/CHANGE_EVENT_DATE');
export const actionChangeEventIdCategory = createAction<number>('@event/CHANGE_EVENT_ID_CATEGORY');
export const actionChangeEventIdPrestation = createAction<number>('@event/CHANGE_EVENT_ID_PRESTATION');
export const actionChangeEventIdParc = createAction<number>('@event/CHANGE_EVENT_ID_PARC');
export const actionChangeEventRecurrence = createAction<boolean>('@event/CHANGE_EVENT_RECURRENCE');
export const actionChangeEventTimeUnit = createAction<string>('@event/CHANGE_EVENT_TIMEUNIT');
export const actionChangeEventRepetition = createAction<number>('@event/CHANGE_EVENT_REPETITION');
export const actionChangeEventData = createAction<[]>('@event/CHANGE_EVENT_DATA');

// management of mail for notification
export const actionResetNotificationMailState = createAction('@notificationMail/RESET_NOTIFICATION _MAIL_STATE');
export const actionChangeNotificationMailId = createAction<number>('@notificationMail/CHANGE_NOTIFICATION _MAIL_ID');
export const actionChangeNotificationMailMail = createAction<string>('@notificationMail/CHANGE_NOTIFICATION _MAIL_MAIL');
export const actionChangeNotificationMailData = createAction<[]>('@notificationMail/CHANGE_NOTIFICATION _MAIL_DATA');

// management of user revenus
export const actionChangeRevenuMonth = createAction<number>('@revenu/CHANGE_REVENU_MONTH');
export const actionChangeRevenuYear = createAction<number>('@revenu/CHANGE_REVENU_YEAR');
export const actionChangeRevenuMOnthlyTotal = createAction<number>('@revenu/CHANGE_REVENU_MONTHLY_TOTAL');
export const actionChangeRevenuData = createAction<IEvent[]>('@revenu/CHANGE_REVENU_DATA');

// management of contact form
export const actionResetContactState = createAction('@event/RESET_CONTACT_STATE');
export const actionChangeContactName = createAction<string>('@contact/CHANGE_CONTACT_NAME');
export const actionChangeContactLastname = createAction<string>('@contact/CHANGE_CONTACT_LASTNAME');
export const actionChangeContactMail = createAction<string>('@contact/CHANGE_CONTACT_MAIL');
export const actionChangeContactObjet = createAction<string>('@contact/CHANGE_CONTACT_OBJET');
export const actionChangeContactMessage = createAction<string>('@contact/CHANGE_CONTACT_MESSAGE');

// management of list User
export const actionChangeUserListMailInvitations = createAction<[]>('@listUser/CHANGE_USER_LIST_MAIL_INVITATIONS');
export const actionChangeUserListMembers = createAction<IUserMember[]>('@listUser/CHANGE_USER_LIST_MEMBER');
export const actionChangeUserListVisitor = createAction<IUserMember[]>('@listUser/CHANGE_USER_LIST_VISITOR');

// management of list Document
export const actionChangeUserListCard = createAction<ICardUser[]>('@listUser/CHANGE_USER_LIST_CARD');
export const actionChangeUserListDocument = createAction<ICardUser[]>('@listUser/CHANGE_USER_LIST_DOCUMENT');

// management of parc
export const actionChangeGestionParcTitle = createAction<string>('@gestion_parc/CHANGE_GESTION_PARC_TITLE');
export const actionChangeGestionParcId = createAction<number>('@gestion_parc/CHANGE_GESTION_PARC_ID');
export const actionChangeGestionParcData = createAction<[]>('@gestion_parc/CHANGE_GESTION_PARC_DATA');
export const actionCleanGestionParc = createAction('@gestion_parc/CLEAN_GESTION_PARC');
