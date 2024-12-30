import { XCircle } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import readUserSocietyMemberByUserProMAilNoNull from '../../api/directus/userSocietyMember/readUserSocietyMemberByUserProMAilNoNull';
import { AppDispatch, RootState } from '../store/store';
import deleteUserSocietyMember from '../../api/directus/userSocietyMember/deleteUserSocietyMember';

const ListUserInvitation = () => {
  const dispatch: AppDispatch = useDispatch();
  const mails = useSelector((state: RootState) => state.ListUserReducer.listMailInvitations);

  useEffect(() => {
    dispatch(readUserSocietyMemberByUserProMAilNoNull());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteUserSocietyMember(id));
    dispatch(readUserSocietyMemberByUserProMAilNoNull());
  };

  return (
    <section className="w-80 max-h-96 border-2 overflow-scroll border-black rounded-xl p-2" style={{ scrollbarWidth: 'none' }}>
      <h2 className="text-center font-semibold mb-4">Invitation(s) en attente</h2>

      {mails &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mails.map((mail: any) => (
          <div key={mail.id} className="w-full flex justify-between items-center py-1 bg-zinc-300/50 rounded-md px-2 my-1">
            <p className="w-4/5 overflow-scroll text-sm" style={{ scrollbarWidth: 'none' }}>
              {mail.user_member_mail}
            </p>
            <button type="button" onClick={() => handleDelete(mail.id)}>
              <XCircle className="text-red-500" />
            </button>
          </div>
        ))}
      {mails.length === 0 && <p className="text-center">Aucune invitation en attente</p>}
    </section>
  );
};

export default ListUserInvitation;
