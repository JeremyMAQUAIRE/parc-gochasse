import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch, RootState } from '../../../store/store';
import { actionChangeUserDelayRdv } from '../../../store/actionCreator';
import updateUser from '../../../../api/directus/user/updateUser';

const BookingDelay = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
    if (userData) {
      dispatch(actionChangeUserDelayRdv(userData.delay_rdv));
    }
  }, [dispatch]);

  return (
    <div className="ml-4">
      <div className="pt-2">L&apos;utilisateur peut prendre un RDV en ligne :</div>
      <div className="booking-delay__content">
        <div className="flex items-center py-2">
          <input
            id="alwaysBookingDelay"
            name="bookingDelay"
            type="radio"
            checked={user.delayRdv === null}
            onClick={() => {
              dispatch(actionChangeUserDelayRdv(null));
              dispatch(updateUser({ name: 'delay_rdv', value: null }));
            }}
            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-grenn_600 checked:bg-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
          />
          <label htmlFor="alwaysBookingDelay" className="ml-3 block text-base font-medium text-gray-900">
            Jusqu’au dernier moment avant le rendez-vous
          </label>
        </div>
        <div className="flex items-center py-2">
          <input
            id="timeBookingDelay"
            name="bookingDelay"
            type="radio"
            checked={user.delayRdv !== null}
            onClick={() => {
              dispatch(actionChangeUserDelayRdv(2));
              dispatch(updateUser({ name: 'delay_rdv', value: 2 }));
            }}
            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-grenn_600 checked:bg-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
          />
          <label htmlFor="timeBookingDelay" className="ml-3 flex items-center gap-2 text-base font-medium text-gray-900">
            <p>Jusqu&apos;à</p>
            <input
              type="number"
              min={1}
              value={user.delayRdv ?? ''}
              onChange={(e) => {
                dispatch(actionChangeUserDelayRdv(parseInt(e.currentTarget.value, 10)));
                dispatch(updateUser({ name: 'delay_rdv', value: e.currentTarget.value }));
              }}
              className="block w-40 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown sm:text-sm/6"
            />
            <p>Heure(s) avant le rendez-vous</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BookingDelay;
