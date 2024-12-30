import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Plus, XCircle } from 'react-feather';
import { ChangeEvent, useState } from 'react';

import { AppDispatch, RootState } from '../store/store';
import { actionClickDialogNewUserInTheTeam } from '../store/actionCreator';

import readUserSocietyMemberByUserProMAilNoNull from '../../api/directus/userSocietyMember/readUserSocietyMemberByUserProMAilNoNull';
import sendSocietyInvitation from '../../api/brevo/sendSocietyInvitation';

const DialogNewUserInTheTeam = () => {
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.dialogReducer.dialogNewUserInTheTeam);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isValidEmail, setIsValidEmail] = useState(false);

  // Function to validate the email format
  const validateEmail = (emailInput: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailInput);
  };

  // Update email input and check validity
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value.toLocaleLowerCase());
    setIsValidEmail(validateEmail(value));
  };

  // Handle adding the email to the list
  const handleAddEmail = () => {
    if (isValidEmail) {
      setEmails((prevEmails) => [...prevEmails, email]);
      setEmail(''); // Clear the input field after adding
    }
  };

  // Function to remove email
  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails((prevEmails) => prevEmails.filter((existingEmail) => existingEmail !== emailToRemove));
  };

  const handleSendInvitations = async (emailsList: string[]) => {
    await dispatch(sendSocietyInvitation(emailsList));
    await dispatch(readUserSocietyMemberByUserProMAilNoNull());
    dispatch(actionClickDialogNewUserInTheTeam(false));
  };

  return (
    <Dialog open={open} onClose={() => dispatch(actionClickDialogNewUserInTheTeam(false))} aria-labelledby="form-dialog-title">
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
            <div>{/* Content goes here */}</div>
            <DialogTitle as="h3" className="text-xl font-semibold text-brown bg-zinc-200 pl-6 py-4">
              Donner la meilleure organisation pour votre équipe
              {/* Crois de fermeture */}
              <button
                type="button"
                onClick={() => {
                  dispatch(actionClickDialogNewUserInTheTeam(false));
                }}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </DialogTitle>
            <div className="my-4 w-10/12 m-auto">
              <p className="text-brown font-semibold text-lg">
                Messages groupés, envoi de documents numériques (carte de chasse, autorisation, attestation, ect..)
              </p>
              <div className="flex flex-col w-full gap-2 mt-4">
                <label htmlFor="query" className="block text-base underline font-semibold text-gray-900">
                  Ajouter de nouveaux membres à votre société de chasse
                </label>
                <div className="mt-2 flex">
                  <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
                    <input
                      id="query"
                      name="query"
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      className="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown sm:pl-9 sm:text-sm"
                    />
                    <Mail aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-brown sm:size-4" />
                  </div>
                  <button
                    type="button"
                    aria-disabled={email === '' || !isValidEmail}
                    onClick={handleAddEmail}
                    disabled={!isValidEmail}
                    className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-brown px-3 py-2 text-sm font-semibold text-white outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-white hover:outline-brown hover:text-brown disabled:opacity-50 disabled:bg-brown disabled:text-white"
                  >
                    <Plus aria-hidden="true" className="-ml-0.5 size-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 w-10/12 m-auto">
              <h3 className="text-gray-900 font-semibold mb-2">Liste des mails:</h3>
              <ul className="flex gap-2">
                {emails.map((emailItem) => (
                  <li key={emailItem} className="text-gray-700 bg-green-200 py-1 px-2 rounded-md flex items-center gap-1">
                    {emailItem}
                    <button type="button" onClick={() => handleRemoveEmail(emailItem)}>
                      <XCircle aria-hidden="true" className="size-5 text-red-600" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="my-5 flex w-10/12 m-auto justify-center">
              <button
                type="button"
                disabled={emails.length === 0}
                onClick={() => handleSendInvitations(emails)}
                className="flex justify-center rounded-md bg-brown px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-white hover:text-brown hover:ring-2 hover:ring-brown disabled:bg-brown disabled:text-white disabled:ring-0 disabled:opacity-50"
              >
                Envoyer des invitations aux futurs membres
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogNewUserInTheTeam;
