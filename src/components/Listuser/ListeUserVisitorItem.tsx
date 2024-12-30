import { Eye, Trash2 } from 'react-feather';
import { Switch } from '@headlessui/react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

import logo from '../../../public/profil_defaut.png';
import { AppDispatch } from '../store/store';
import {
  actionChangeUserFirstname,
  actionChangeUserid,
  actionChangeUserName,
  actionClickDialogDeleteVisitor,
  actionClickDialogInfoMember,
} from '../store/actionCreator';
import IUserMember from '../../@types/userMember';
import updateUserConnection from '../../api/directus/userConnection/updateUserConnection';

const ListeUserVisitorItem = ({ member }: { member: IUserMember }) => {
  const dispatch: AppDispatch = useDispatch();
  const avatarURL =
    member.id_user.id_avatar !== null ? `https://api.gochasse.com/assets/${member.id_user.id_avatar}?access_token=${Cookies.get('tokenJWT')}` : logo;

  return (
    <section className="w-full scale-95 h-14 flex items-center border-2 border-black rounded-lg mb-2 hover:scale-100 hover:bg-zinc-400">
      <img src={avatarURL} alt="Avatar" className="w-14 h-14 overflow-hidden rounded-l-lg" />
      <div className="flex flex-1 ml-4 font-semibold">
        {member.id_user.last_name} {member.id_user.first_name}
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(actionChangeUserid(member.id_user.id));
          dispatch(actionClickDialogInfoMember(true));
        }}
      >
        <Eye className="mx-4 hover:text-brown" />
      </button>

      <button
        type="button"
        onClick={() => {
          dispatch(actionClickDialogDeleteVisitor(true));
          dispatch(actionChangeUserid(member.id_user.id));
          dispatch(actionChangeUserName(member.id_user.last_name));
          dispatch(actionChangeUserFirstname(member.id_user.first_name));
        }}
      >
        <Trash2 className="mx-4 hover:text-red-500" />
      </button>

      <Switch
        className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full mx-4 bg-transparent"
        checked={member.banned}
        onChange={async () => {
          await dispatch(updateUserConnection({ idUser: member.id_user.id, banned: !member.banned }));
        }}
      >
        <span aria-hidden="true" className="pointer-events-none absolute size-full rounded-md" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-brown transition-colors duration-200 ease-in-out group-data-[checked]:bg-red-500"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 inline-block size-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      {member.banned ? (
        <p className="mr-4 text-lg w-52 text-start">Réservation bloquée</p>
      ) : (
        <p className="mr-4 text-lg w-52 text-start">Accès à la réservation</p>
      )}
    </section>
  );
};

export default ListeUserVisitorItem;
