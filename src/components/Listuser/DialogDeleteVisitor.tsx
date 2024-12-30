import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { actionClickDialogDeleteMember, actionClickDialogDeleteVisitor } from '../store/actionCreator';
import readUserConnection from '../../api/directus/userConnection/readUserConnection';
import deleteUserConnectionByIdUserIdPro from '../../api/directus/userConnection/deleteUserConnectionByIdUserIdPro';

const DialogDeleteVisitor = () => {
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.dialogReducer.dialogDeleteVisitor);
  const user = useSelector((state: RootState) => state.userReducer);

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(actionClickDialogDeleteVisitor(false));
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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-screen-lg sm:max-h-72 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 h-[27vh]" // Augmenté la taille et la hauteur
          >
            <div>
              {/* Titre avec bouton de fermeture */}
              <DialogTitle as="h3" className="text-xl font-semibold text-gray-900 bg-zinc-200 pl-6 py-4">
                Etes-vous sûr de vouloir supprimer ce membre de vos visiteurs?
                {/* Crois de fermeture */}
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                  onClick={() => {
                    dispatch(actionClickDialogDeleteVisitor(false));
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </DialogTitle>
              <div className="my-12">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <p className="text-2xl font-bold">
                    {user.name} {user.firstname}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 mr-16 flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  dispatch(actionClickDialogDeleteMember(false));
                }}
                className="inline-flex w-24 justify-center rounded-md bg-zinc-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-zinc-400 hover:ring-2 hover:ring-zinc-400 sm:col-start-2"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={async () => {
                  await dispatch(deleteUserConnectionByIdUserIdPro(user.id));
                  await dispatch(readUserConnection());
                  dispatch(actionClickDialogDeleteVisitor(false));
                }}
                className="inline-flex w-32 justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500 sm:col-start-2"
              >
                Oui, je confirme
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogDeleteVisitor;
