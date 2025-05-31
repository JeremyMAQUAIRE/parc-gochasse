import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Switch } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { AppDispatch, RootState } from '../../../store/store';
import {
  actionChangeEventAcompte,
  actionChangeEventDate,
  actionChangeEventIdCategory,
  actionChangeEventIdParc,
  actionChangeEventIdPrestation,
  actionChangeEventPaiementOnLine,
  actionChangeEventRecurrence,
  actionChangeEventRepetition,
  actionChangeEventTimeUnit,
  actionChangePrestationApplicableOn,
  actionChangePrestationNumberDog,
  actionChangePrestationNumberHunter,
  actionChangePrestationPrice,
  actionChangePrestationTimeStart,
  actionChangePrestationTimeStop,
  actionClickDialogCreateEvent,
  actionResetEventState,
  actionResetPrestationState,
} from '../../../store/actionCreator';
import dog from '../../../../../public/dog.webp';
import hunter from '../../../../../public/hunter.webp';
import readCategory from '../../../../api/directus/category/readCategory';
import ICategory from '../../../../@types/category';
import readPrestationByIdCategory from '../../../../api/directus/prestation/readPrestationByIdCategory';
import IPrestation from '../../../../@types/prestation';
import readPrestationById from '../../../../api/directus/prestation/readPrestationById';
import './DialogCreateEvent.scss';
import createEvent from '../../../../api/directus/event/createEvent';
import readAllEventsByUser from '../../../../api/directus/event/readAllEventsByUser';
import readAllGestionParcByUser from '../../../../api/directus/parc/readAllGestionParcByUser';
import IParc from '../../../../@types/parc';
import ValidationDashboardStripeIsValid from '../../../../api/stripe/ValidationDashboardStripeIsValid';
import DialogCreateEventPaiement from './DialogCreateEventPaiement';

const DialogCreateEvent = () => {
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector((state: RootState) => state.dialogReducer.dialogCreateEvent);
  const event = useSelector((state: RootState) => state.eventReducer);
  const parcs = useSelector((state: RootState) => state.parcReducer.data);
  const categories: ICategory[] = useSelector((state: RootState) => state.categoryReducer.dataCategory);
  const prestationModel = useSelector((state: RootState) => state.prestationReducer);
  const userDataLocal = localStorage.getItem('userData');
  const userData = userDataLocal ? JSON.parse(userDataLocal) : null;
  const isStripeAccountConnected = userData?.stripe_account;
  const [prestations, setPrestations] = useState<IPrestation[]>([]);
  const [color, setColor] = useState('#000000');
  const [isValidStripe, setIsValidStripe] = useState(true);

  useEffect(() => {
    const checkStripeAccount = async () => {
      if (isStripeAccountConnected) {
        const result = await dispatch(ValidationDashboardStripeIsValid()).unwrap();
        setIsValidStripe(result);
      }
    };
    checkStripeAccount();
  }, [dispatch, isStripeAccountConnected]);

  useEffect(() => {
    dispatch(readCategory());
    dispatch(readAllGestionParcByUser());
  }, [dispatch]);

  useEffect(() => {
    const fetchPrestations = async () => {
      const result = await dispatch(readPrestationByIdCategory(event.idCategory));
      if (result.payload) {
        setPrestations(result.payload as IPrestation[]);
      }
    };
    fetchPrestations();
  }, [dispatch, event.idCategory]);

  useEffect(() => {
    const fetchPrestation = async () => {
      await dispatch(readPrestationById(event.idPrestation));
    };
    fetchPrestation();
  }, [dispatch, event.idPrestation]);

  useEffect(() => {
    const fetchPrestation = async () => {
      await dispatch(readPrestationById(event.idPrestation));
    };
    dispatch(actionChangeEventPaiementOnLine('enLigne'));
    fetchPrestation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, event.idPrestation]);

  const handleCreatePrestation = async () => {
    await dispatch(createEvent());
    dispatch(actionClickDialogCreateEvent(false));
    dispatch(actionResetEventState());
    await dispatch(readAllEventsByUser());
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch(actionClickDialogCreateEvent(false));
        dispatch(actionResetEventState());
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
                Créer un évènement
                <button
                  type="button"
                  onClick={() => {
                    dispatch(actionClickDialogCreateEvent(false));
                    dispatch(actionResetEventState());
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
                {/* Titre et Catégorie et Prestation */}
                <div className="flex justify-between items-center mt-4 dialogCreatePrestation-input">
                  <label htmlFor="dateEventDatePicker" className="text-lg font-medium text-gray-900">
                    Date de l&apos;événement <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <div>
                    <DatePicker
                      id="dateEventDatePicker"
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      value={event?.dateEvent ? new Date(event.dateEvent.split('/').reverse().join('-')).toLocaleDateString('fr-FR') : ''}
                      onChange={(date) => {
                        if (date) {
                          const dateString = date.toLocaleDateString('fr-FR');
                          dispatch(actionChangeEventDate(dateString));
                        }
                      }}
                      className="block w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="category" className="text-lg font-medium text-gray-900">
                    Catégorie <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input className="w-16 h-8" type="color" value={color} disabled />
                    <select
                      id="category"
                      name="category"
                      defaultValue=""
                      onChange={(e) => {
                        const selectedCategory = categories.find((cat) => cat.id === parseInt(e.target.value, 10));
                        setColor('#000000');
                        setPrestations([]);
                        if (selectedCategory) {
                          dispatch(actionChangeEventIdCategory(selectedCategory.id));
                          setColor(selectedCategory.color);
                        }
                      }}
                      className="flex w-[470px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                    >
                      <option value="">Choisir une catégorie</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="prestation" className="text-lg font-medium text-gray-900">
                    Prestation <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <select
                    id="prestation"
                    name="location"
                    defaultValue=""
                    disabled={prestations.length === 0}
                    onChange={(e) => dispatch(actionChangeEventIdPrestation(parseInt(e.target.value, 10)))}
                    className="flex w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none border border-gray-300 rounded-md focus:border-brown disabled:bg-gray-200"
                  >
                    <option value="">Choisir une prestation</option>
                    {prestations.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="prestation" className="text-lg font-medium text-gray-900">
                    Parc <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <select
                    id="prestation"
                    name="location"
                    defaultValue=""
                    onChange={(e) => dispatch(actionChangeEventIdParc(parseInt(e.target.value, 10)))}
                    className="flex w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none border border-gray-300 rounded-md focus:border-brown disabled:bg-gray-200"
                  >
                    <option value="">Choisir un parc</option>
                    {parcs.map((parc: IParc) => (
                      <option key={parc.id} value={parc.id}>
                        {parc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Horaires de début et de fin */}
                <div className="flex justify-between items-center mt-4 dialogCreatePrestation-input">
                  <label htmlFor="startTimePickerDialogCreatePrestation" className="text-lg font-medium text-gray-900">
                    Horaire de début <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <div>
                    <DatePicker
                      id="startTimePickerDialogCreatePrestation"
                      selected={prestationModel.startTime ? new Date(`1970-01-01T${prestationModel.startTime}:00`) : null}
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
                      selected={prestationModel.endTime ? new Date(`1970-01-01T${prestationModel.endTime}:00`) : null}
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
                    placeholder="Prix de la prestation"
                    value={prestationModel.price === 0 ? '' : prestationModel.price}
                    onChange={(e) => dispatch(actionChangePrestationPrice(parseInt(e.target.value, 10)))}
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
                    disabled
                    value={prestationModel.applicableOn === 'hunter' ? 'hunter' : 'dog'}
                    onChange={(e) => {
                      dispatch(actionChangePrestationApplicableOn(e.target.value));
                      dispatch(actionChangePrestationNumberHunter(0));
                      dispatch(actionChangePrestationNumberDog(0));
                    }}
                    className="flex w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none border border-gray-300 rounded-md focus:border-brown disabled:bg-gray-200"
                  >
                    <option value="hunter">Participant(s)</option>
                    <option value="dog">Chien(s)</option>
                  </select>
                </div>
                <DialogCreateEventPaiement isValidStripe={isValidStripe} />
                {isStripeAccountConnected && isValidStripe && (
                  <div className="flex justify-between items-center mt-4">
                    <label htmlFor="acompte" className="text-lg font-medium text-gray-900">
                      Montant de l&apos;acompte<span className="text-brown font-bold pl-1">*</span>
                    </label>
                    <input
                      id="acompte"
                      type="number"
                      min={0}
                      disabled={event.paiementOnLine === 'surPlace'}
                      max={prestationModel.price}
                      value={event.acompte}
                      onChange={(e) => {
                        let inputValue = parseInt(e.target.value, 10);

                        // Si NaN (valeur vide ou invalide), on ne fait rien
                        if (Number.isNaN(inputValue)) inputValue = 0;

                        // Clamp la valeur entre 0 et prestationModel.price
                        if (inputValue < 0) inputValue = 0;
                        if (inputValue > prestationModel.price) inputValue = prestationModel.price;

                        dispatch(actionChangeEventAcompte(inputValue));
                      }}
                      placeholder="Montant de l'acompte en €"
                      className="block w-[550px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-green-600 disabled:bg-gray-200"
                    />
                  </div>
                )}

                {/* Limite */}
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="priceLimit" className="text-lg font-medium text-gray-900">
                    Limite <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <div className="flex space-x-4">
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
                        disabled={prestationModel.applicableOn !== 'dog'}
                        value={(() => {
                          if (prestationModel.applicableOn === 'dog') {
                            return prestationModel.numberDog === 0 ? '' : prestationModel.numberDog;
                          }
                          return '';
                        })()}
                        onChange={(e) => {
                          dispatch(actionChangePrestationNumberDog(parseInt(e.target.value, 10)));
                        }}
                        className="block w-[240px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown disabled:bg-gray-200"
                      />
                    </div>
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
                        placeholder="Nbre de Participant"
                        disabled={prestationModel.applicableOn !== 'hunter'}
                        value={(() => {
                          if (prestationModel.applicableOn === 'hunter') {
                            return prestationModel.numberHunter === 0 ? '' : prestationModel.numberHunter;
                          }
                          return '';
                        })()}
                        onChange={(e) => {
                          dispatch(actionChangePrestationNumberHunter(parseInt(e.target.value, 10)));
                        }}
                        className="block w-[240px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown disabled:bg-gray-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="recurrence" className="text-lg font-medium text-gray-900">
                    Créer une récurrence <span className="text-brown font-bold pl-1">*</span>
                  </label>
                  <div className="flex w-[550px] h-10 items-center justify-center">
                    <Switch
                      checked={event.isRecurrent}
                      onChange={() => {
                        dispatch(actionChangeEventRecurrence(!event.isRecurrent));
                      }}
                      className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full"
                    >
                      <span className="sr-only">Use setting</span>
                      <span aria-hidden="true" className="pointer-events-none absolute size-full rounded-md bg-white" />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-brown"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 inline-block size-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
                      />
                    </Switch>
                    <label htmlFor="recurrence" className="text-gray-900 w-[250px] pl-2">
                      Répéter l&apos;évènement
                    </label>
                  </div>
                </div>
                {event.isRecurrent && (
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center justify-between mt-4 w-[550px]">
                      <label htmlFor="recurrenceNbre" className="text-lg font-medium text-gray-900">
                        Nombre
                      </label>
                      <input
                        id="recurrenceNbre"
                        type="number"
                        min={0}
                        value={event.repetitionNumber === 0 ? '' : event.repetitionNumber}
                        onChange={(e) => {
                          dispatch(actionChangeEventRepetition(parseInt(e.target.value, 10)));
                          const inputValue = parseInt(e.target.value, 10);
                          if (event.timeUnit === 'day' && inputValue < 0) {
                            dispatch(actionChangeEventRepetition(0));
                          } else if (event.timeUnit === 'day' && inputValue > 60) {
                            dispatch(actionChangeEventRepetition(60));
                          } else if (event.timeUnit === 'day') {
                            dispatch(actionChangeEventRepetition(inputValue));
                          }
                          if (event.timeUnit === 'week' && inputValue < 0) {
                            dispatch(actionChangeEventRepetition(0));
                          } else if (event.timeUnit === 'week' && inputValue > 8) {
                            dispatch(actionChangeEventRepetition(8));
                          } else if (event.timeUnit === 'week') {
                            dispatch(actionChangeEventRepetition(inputValue));
                          }
                        }}
                        className="block w-[150px] py-1 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                      />
                      <select
                        id="location"
                        name="location"
                        value={event.timeUnit === 'day' ? 'day' : 'week'}
                        onChange={(e) => {
                          dispatch(actionChangeEventTimeUnit(e.target.value));
                          if (e.target.value === 'day' && event.repetitionNumber < 0) {
                            dispatch(actionChangeEventRepetition(0));
                          } else if (e.target.value === 'day' && event.repetitionNumber > 60) {
                            dispatch(actionChangeEventRepetition(60));
                          }
                          if (e.target.value === 'week' && event.repetitionNumber < 0) {
                            dispatch(actionChangeEventRepetition(0));
                          } else if (e.target.value === 'week' && event.repetitionNumber > 8) {
                            dispatch(actionChangeEventRepetition(8));
                          }
                        }}
                        className="flex w-[250px] py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none border border-gray-300 rounded-md focus:border-brown"
                      >
                        <option value="day">Jour(s)</option>
                        <option value="week">Semaine(s)</option>
                      </select>
                    </div>
                    <div className="italic text-sm">La récurrence est limitée à 60 jours consécutifs ou 1 fois par semaine sur 8 semaines</div>
                  </div>
                )}

                {/* Bouton de validation */}
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={
                      !event.dateEvent ||
                      !event.idCategory ||
                      !event.idPrestation ||
                      !event.idParc ||
                      !prestationModel.startTime ||
                      !prestationModel.endTime ||
                      !prestationModel.price ||
                      (!prestationModel.numberDog && prestationModel.applicableOn === 'dog') ||
                      (!prestationModel.numberHunter && prestationModel.applicableOn === 'hunter')
                    }
                    onClick={handleCreatePrestation}
                    className="inline-flex w-52 justify-center rounded-md bg-brown px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-brown hover:ring-2 hover:ring-brown disabled:opacity-45 disabled:bg-brown disabled:text-white disabled:ring-0 sm:col-start-2"
                  >
                    Créer l&apos;évènement
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

export default DialogCreateEvent;
