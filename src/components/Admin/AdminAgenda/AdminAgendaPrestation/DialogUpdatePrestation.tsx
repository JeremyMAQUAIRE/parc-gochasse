import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { useEffect } from 'react';

import {
  actionChangePrestationApplicableOn,
  actionChangePrestationDescription,
  actionChangePrestationNumberDog,
  actionChangePrestationNumberHunter,
  actionChangePrestationPrice,
  actionChangePrestationTimeStart,
  actionChangePrestationTimeStop,
  actionChangePrestationTitle,
  actionClickDialogUpdatePrestation,
  actionResetPrestationState,
} from '../../../store/actionCreator';
import { AppDispatch, RootState } from '../../../store/store';
import dog from '../../../../../public/dog.webp';
import hunter from '../../../../../public/hunter.webp';
import './DialogCreatePrestation.scss';
import readPrestationById from '../../../../api/directus/prestation/readPrestationById';
import updatePrestation from '../../../../api/directus/prestation/updatePrestation';

const DialogUpdatePrestation = () => {
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.dialogReducer.dialogUpdatePrestation);
  const prestation = useSelector((state: RootState) => state.prestationReducer);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(readPrestationById(prestation.id));
    };
    fetchData();
  }, [dispatch, prestation.id]);

  const disabled =
    prestation.title === '' ||
    prestation.description === '' ||
    prestation.startTime === '' ||
    prestation.endTime === '' ||
    prestation.price === 0 ||
    (prestation.numberDog === 0 && prestation.numberHunter === 0);

  const handleUpdatePrestation = async () => {
    await dispatch(updatePrestation(prestation.id));
    await dispatch(readPrestationById(prestation.id));
    dispatch(actionClickDialogUpdatePrestation(false));
    dispatch(actionResetPrestationState());
    window.location.reload();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(actionClickDialogUpdatePrestation(false));
        dispatch(actionResetPrestationState());
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
                Modifier une prestation
                <button
                  type="button"
                  onClick={() => {
                    dispatch(actionClickDialogUpdatePrestation(false));
                    dispatch(actionResetPrestationState());
                  }}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </DialogTitle>
              <div className="my-4 w-9/12 m-auto">
                {/* Titre et Description */}
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="title" className="text-lg font-medium text-gray-900">
                    Titre <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={prestation.title === '' ? '' : prestation.title}
                    onChange={(e) => dispatch(actionChangePrestationTitle(e.target.value))}
                    placeholder="Ex: Entrainement"
                    className="block w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="description" className="text-lg font-medium text-gray-900">
                    Description <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    maxLength={254}
                    value={prestation.description === '' ? '' : prestation.description}
                    onChange={(e) => dispatch(actionChangePrestationDescription(e.target.value))}
                    placeholder="Ex: Battue au sein de forêt du Puy Bleue"
                    className="block w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                  />
                </div>

                {/* Horaires de début et de fin */}
                <div className="flex justify-between items-center mt-4 dialogCreatePrestation-input">
                  <label htmlFor="startTimePickerDialogCreatePrestation" className="text-lg font-medium text-gray-900">
                    Horaire de début <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <div>
                    <DatePicker
                      id="startTimePickerDialogCreatePrestation"
                      selected={prestation.startTime ? new Date(`1970-01-01T${prestation.startTime}:00`) : null}
                      onChange={(time) => {
                        if (time) {
                          const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          dispatch(actionChangePrestationTimeStart(timeString));
                        }
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Heure"
                      dateFormat="HH:mm"
                      className="block w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 dialogCreatePrestation-input">
                  <label htmlFor="endTimePickerDialogCreatePrestation" className="text-lg font-medium text-gray-900">
                    Horaire de fin <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <div>
                    <DatePicker
                      id="endTimePickerDialogCreatePrestation"
                      selected={prestation.endTime ? new Date(`1970-01-01T${prestation.endTime}:00`) : null}
                      onChange={(time) => {
                        if (time) {
                          const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          dispatch(actionChangePrestationTimeStop(timeString));
                        }
                      }}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Heure"
                      dateFormat="HH:mm"
                      className="block w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                    />
                  </div>
                </div>

                {/* Tarif et applicable sur */}
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="price" className="text-lg font-medium text-gray-900">
                    Tarif (en €)<span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <input
                    id="price"
                    type="number"
                    min={0}
                    value={prestation.price === 0 ? '' : prestation.price}
                    onChange={(e) => dispatch(actionChangePrestationPrice(parseInt(e.target.value, 10)))}
                    placeholder="Prix de la prestation"
                    className="block w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="applicable" className="text-lg font-medium text-gray-900">
                    Applicable sur<span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={prestation.applicableOn === 'hunter' ? 'hunter' : 'dog'}
                    onChange={(e) => {
                      dispatch(actionChangePrestationApplicableOn(e.target.value));
                      dispatch(actionChangePrestationNumberHunter(0));
                      dispatch(actionChangePrestationNumberDog(0));
                    }}
                    className="flex w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                  >
                    <option value="hunter">Participant(s)</option>
                    <option value="dog">Chien(s)</option>
                  </select>
                </div>

                {/* Limite */}
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="priceLimit" className="text-lg font-medium text-gray-900">
                    Limite <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex-1 flex items-center">
                      {/* Icône pour Participant */}
                      <span className="text-gray-500 mr-2">
                        {/* Icone de participant, remplacez si nécessaire */}
                        <img src={hunter} alt="Participant" className="h-5 w-5" />
                      </span>
                      <input
                        id="priceLimitHunter"
                        type="number"
                        min={0}
                        disabled={prestation.applicableOn !== 'hunter'}
                        value={(() => {
                          if (prestation.applicableOn === 'hunter') {
                            return prestation.numberHunter === 0 ? '' : prestation.numberHunter;
                          }
                          return '';
                        })()}
                        onChange={(e) => {
                          dispatch(actionChangePrestationNumberHunter(parseInt(e.target.value, 10)));
                        }}
                        placeholder="Nbre de Participant"
                        className="block w-[240px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown disabled:bg-gray-200"
                      />
                    </div>
                    <div className="flex-1 flex items-center">
                      {/* Icône pour Chien */}
                      <span className="text-gray-500 mr-2">
                        {/* Icone de chien, utilisez une autre icône si vous préférez */}
                        <img src={dog} alt="Chien" className="h-5 w-5" />
                      </span>
                      <input
                        id="priceLimitDog"
                        type="number"
                        min={0}
                        placeholder="Nbre de Chien"
                        disabled={prestation.applicableOn !== 'dog'}
                        value={(() => {
                          if (prestation.applicableOn === 'dog') {
                            return prestation.numberDog === 0 ? '' : prestation.numberDog;
                          }
                          return '';
                        })()}
                        onChange={(e) => {
                          dispatch(actionChangePrestationNumberDog(parseInt(e.target.value, 10)));
                        }}
                        className="block w-[240px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown disabled:bg-gray-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Bouton de validation */}
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={handleUpdatePrestation}
                    className="inline-flex w-52 justify-center rounded-md bg-brown px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-brown hover:ring-2 hover:ring-brown disabled:opacity-45 disabled:bg-brown disabled:text-white disabled:ring-0 sm:col-start-2"
                  >
                    Modifier la prestation
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogUpdatePrestation;
