import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../store/store';
import {
  actionChangeNotificationMailMail,
  actionClickDialogCreateNotificationMail,
  actionResetNotificationMailState,
} from '../../../store/actionCreator';
import createNotificationMailRdv from '../../../../api/directus/notificationMailRdv/createNotificationMailRdv';
import readNotificationMailRdv from '../../../../api/directus/notificationMailRdv/readNotificationMailRdv';

const DialogCreateNotificationMail = () => {
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.dialogReducer.dialogCreateNotificationMail);
  const mail = useSelector((state: RootState) => state.notificationMailForRdv);

  // Email validation function
  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleClickeCreateEmail = async () => {
    await dispatch(createNotificationMailRdv(mail.mail));
    dispatch(actionClickDialogCreateNotificationMail(false));
    dispatch(actionResetNotificationMailState());
    dispatch(readNotificationMailRdv());
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(actionClickDialogCreateNotificationMail(false));
        dispatch(actionResetNotificationMailState());
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-screen-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <DialogTitle as="h3" className="text-xl font-semibold text-gray-900 bg-zinc-200 pl-6 py-4">
                Ajouter une adresse email :
                <button
                  type="button"
                  onClick={() => {
                    dispatch(actionClickDialogCreateNotificationMail(false));
                    dispatch(actionResetNotificationMailState());
                  }}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </DialogTitle>
            </div>
            <div className="my-8 w-9/12 m-auto">
              <div className="flex justify-between items-center mt-4">
                <label htmlFor="mail" className="text-lg font-medium text-gray-900">
                  Email <span className="text-brown font-bold pl-1">*</span>
                </label>
                <input
                  id="mail"
                  type="email"
                  value={mail.mail}
                  onChange={(e) => dispatch(actionChangeNotificationMailMail(e.target.value))}
                  placeholder=""
                  className="block w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  disabled={!isValidEmail(mail.mail)}
                  onClick={handleClickeCreateEmail}
                  className="inline-flex w-52 justify-center rounded-md bg-brown px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-brown hover:ring-2 hover:ring-brown disabled:opacity-45 disabled:bg-brown disabled:text-white disabled:ring-0 sm:col-start-2"
                >
                  Ajouter l&apos;email
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogCreateNotificationMail;
