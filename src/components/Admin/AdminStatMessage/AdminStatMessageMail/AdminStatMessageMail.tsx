import { Switch } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch, RootState } from '../../../store/store';
import { actionChangeUserDelayRdv, actionChangeUserSendMailNEwRdvForAnnulation } from '../../../store/actionCreator';
import updateUser from '../../../../api/directus/user/updateUser';

const AdminStatMessageMail = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
    if (userData) {
      dispatch(actionChangeUserDelayRdv(userData.send_mail_if_annulation_for_new_rdv));
    }
  }, [dispatch]);

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Notification par email</h1>
      </header>
      <div className="overflow-y-auto h-screen flex-1 mt-16">
        <section className="w-11/12 m-auto mt-4 mb-4 flex items-center">
          <Switch
            checked={user.isSendForNewRdv}
            onChange={() => {
              dispatch(actionChangeUserSendMailNEwRdvForAnnulation(!user.isSendForNewRdv));
              dispatch(updateUser({ name: 'send_notification', value: !user.isSendForNewRdv }));
            }}
            className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full"
          >
            <span className="sr-only">Use setting</span>
            <span aria-hidden="true" className="pointer-events-none absolute size-full rounded-md bg-zinc-200" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-brown"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 inline-block size-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
            />
          </Switch>
          <label htmlFor="recurrence" className="text-gray-900 pl-2">
            Recevoir une alerte mail pour une inscription ou une annulation d&apos;un rdv en ligne
          </label>
        </section>
      </div>
    </div>
  );
};

export default AdminStatMessageMail;
