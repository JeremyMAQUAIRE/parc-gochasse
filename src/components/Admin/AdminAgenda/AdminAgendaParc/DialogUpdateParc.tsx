import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';

import { actionChangeGestionParcId, actionChangeGestionParcTitle, actionClickDialogUpdateParc } from '../../../store/actionCreator';
import { AppDispatch, RootState } from '../../../store/store';
import updateGestionParc from '../../../../api/directus/parc/updateGestionParc';
import readAllGestionParcByUser from '../../../../api/directus/parc/readAllGestionParcByUser';

const DialogUpdateParc = () => {
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.dialogReducer.dialogUpdateParc);
  const parc = useSelector((state: RootState) => state.parcReducer);

  const disabled = parc.title === '';

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(actionClickDialogUpdateParc(false));
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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-screen-lg sm:max-h-72 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95" // Augmenté la taille et la hauteur
          >
            <div>
              {/* Titre avec bouton de fermeture */}
              <DialogTitle as="h3" className="text-xl font-semibold text-gray-900 bg-zinc-200 pl-6 py-4">
                Modifier un parc
                {/* Crois de fermeture */}
                <button
                  type="button"
                  value={parc.title}
                  onClick={() => {
                    dispatch(actionClickDialogUpdateParc(false));
                  }}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </DialogTitle>
              <div className="mt-2">
                <div className="flex mt-4">
                  <label htmlFor="title" className="block text-xl ml-36 w-40 font-medium text-gray-900 sm:pt-1.5">
                    Titre <span className="text-brown font-bold">*</span>
                  </label>
                  <div className="mt-2 ml-24 sm:col-span-2 sm:mt-0 w-[1400px]">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-brown sm:max-w-md">
                      <input
                        id="title"
                        type="text"
                        placeholder="Ex: Entrainement"
                        value={parc.title}
                        onChange={(e) => dispatch(actionChangeGestionParcTitle(e.target.value))}
                        className="block w-auto grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-5 mr-64 flex justify-end">
              <button
                type="button"
                disabled={disabled}
                onClick={async () => {
                  await dispatch(updateGestionParc(parc.id));
                  await dispatch(readAllGestionParcByUser());
                  dispatch(actionChangeGestionParcTitle(''));
                  dispatch(actionChangeGestionParcId(0));
                  dispatch(actionClickDialogUpdateParc(false));
                }}
                className="inline-flex w-52 justify-center rounded-md bg-brown px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-brown hover:ring-2 hover:ring-brown disabled:opacity-45 disabled:bg-brown disabled:text-white disabled:ring-0 sm:col-start-2"
              >
                Modifier la catégorie
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogUpdateParc;
