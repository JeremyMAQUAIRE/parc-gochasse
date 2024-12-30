import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Mail } from 'react-feather';

import { AppDispatch, RootState } from '../store/store';
import { actionClickDialogInfoMember } from '../store/actionCreator';

import logo from '../../../public/logo.webp';
import readUser from '../../api/directus/user/readUser';

interface Member {
  id_avatar: string;
  id_assurrance: string;
  id_validation: string;
  id_permis: string;
  last_name: string;
  first_name: string;
  phone: string;
  email: string;
}

const DialogInfoMember = () => {
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.dialogReducer.dialogInfoMember);
  const userId = useSelector((state: RootState) => state.userReducer.id);
  const [member, setMember] = useState<Member | null>(null);
  const [dateText, setDateText] = useState<string>('');

  useEffect(() => {
    const fetchMember = async () => {
      const response = await dispatch(readUser(userId));
      setMember(response.payload);
    };
    fetchMember();

    // Get the current date and compare with June 1st
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const juneFirst = new Date(currentYear, 5, 1); // June 1st of current year

    if (currentDate < juneFirst) {
      // Before June 1st, display the insurance for the previous year
      setDateText(`${currentYear - 1}-${currentYear}`);
    } else {
      // After June 1st, display the insurance for the current year
      setDateText(`${currentYear}-${currentYear + 1}`);
    }
  }, [dispatch, userId]);

  const avatarURL =
    member && member.id_avatar !== null ? `https://api.gochasse.com/assets/${member.id_avatar}?access_token=${Cookies.get('tokenJWT')}` : logo;
  const permisURL =
    member && member.id_permis !== null ? `https://api.gochasse.com/assets/${member.id_permis}?access_token=${Cookies.get('tokenJWT')}` : logo;
  const assurranceURL =
    member && member.id_assurrance !== null
      ? `https://api.gochasse.com/assets/${member.id_assurrance}?access_token=${Cookies.get('tokenJWT')}`
      : logo;
  const validationURL =
    member && member.id_validation !== null
      ? `https://api.gochasse.com/assets/${member.id_validation}?access_token=${Cookies.get('tokenJWT')}`
      : logo;

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(actionClickDialogInfoMember(false));
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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-screen-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 h-auto" // Augmenté la taille et la hauteur
          >
            <div>
              {/* Titre avec bouton de fermeture */}
              <DialogTitle as="h3" className="text-xl font-semibold bg-brown text-white pl-6 py-4">
                Information du membre
                {/* Crois de fermeture */}
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                  onClick={() => {
                    dispatch(actionClickDialogInfoMember(false));
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </DialogTitle>
              <div className="my-6">
                <div className="flex gap-4 w-6/12 mx-auto">
                  <div className="w-4/5 flex flex-col gap-2">
                    <p className="flex">
                      <span className="italic font-semibold w-24 block">Nom :</span>
                      {member && member.last_name}
                    </p>
                    <p className="flex">
                      <span className="italic font-semibold w-24 block">Prénom :</span>
                      {member && member.first_name}
                    </p>
                    <p className="flex">
                      <span className="italic font-semibold w-24 block">Mail :</span>
                      {member && member.email}
                    </p>
                    <p className="flex">
                      <span className="italic font-semibold w-24 block">Téléphone :</span>
                      {member && member.phone}
                    </p>
                  </div>
                  <img src={avatarURL} alt="Logo" className="w-32 h-32 flex items-center justify-center" />
                </div>
                <div className="flex gap-4 w-10/12 mx-auto mt-4">
                  <div className="flex flex-col flex-1 gap-2">
                    <img src={permisURL} alt="Logo" className="h-60 border-2 border-brown rounded-2xl flex items-center justify-center" />
                    <p className="text-center font-semibold">Permis</p>
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <img src={assurranceURL} alt="Logo" className="h-60 border-2 border-brown rounded-2xl flex items-center justify-center" />
                    <p className="text-center font-semibold">Assurance {dateText}</p>
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <img src={validationURL} alt="Logo" className="h-60 border-2 border-brown rounded-2xl flex items-center justify-center" />
                    <p className="text-center font-semibold">Validation {dateText}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 mb-5 mr-16 flex gap-4 justify-end">
              <a
                href={`mailto:${member && member.email}`}
                className="inline-flex gap-4 w-48 justify-center items-center rounded-md bg-zinc-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-zinc-400 hover:ring-2 hover:ring-zinc-400 sm:col-start-2"
              >
                <Mail className="size-4" /> Envoyer un mail
              </a>
              <button
                type="button"
                onClick={() => {
                  dispatch(actionClickDialogInfoMember(false));
                }}
                className="inline-flex w-24 justify-center rounded-md bg-zinc-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-zinc-400 hover:ring-2 hover:ring-zinc-400 sm:col-start-2"
              >
                Fermer
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogInfoMember;
