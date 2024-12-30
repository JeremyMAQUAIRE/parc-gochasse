import { Mail, Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { actionClickDialogNewUserInTheTeam } from '../store/actionCreator';
import DialogNewUserInTheTeam from './DialogNewUserInTheTeam';

interface IUserListSearch {
  display: string;
  mailList: string[];
  setSearch: (arg: string) => void;
}

const UserListSearch = ({ display, mailList, setSearch }: IUserListSearch) => {
  const dispatch: AppDispatch = useDispatch();
  const proMail = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
  const dialogOpen = useSelector((state: RootState) => state.dialogReducer);

  const nbreResult = mailList.length;

  return (
    <section className="flex w-full justify-between my-4 px-20 mx-auto">
      <div className="w-8/12 m-auto flex flex-col gap-3 bg-zinc-300 py-3 rounded-lg">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-8/12 m-auto py-1 pl-2 rounded-lg text-lg outline-brown focus:outline"
          placeholder="Recherche d'un utilisateur par le nom"
        />
        <div className="w-8/12 text-center m-auto text-2xl text-brown font-semibold">Membre(s) enregistré(s) : {nbreResult}</div>
      </div>
      {display === 'membres' && (
        <div className="flex flex-1 flex-col gap-2 justify-end items-end">
          <a
            href={`mailto:${proMail && proMail.email}?bcc=${mailList.join(';')}`}
            className="flex items-center justify-center gap-4 w-80 py-2 rounded-lg text-white font-semibold bg-zinc-400 hover:scale-110"
          >
            <Mail className="text-green-800" /> Envoyer un mail groupe
          </a>

          <button
            type="button"
            onClick={() => dispatch(actionClickDialogNewUserInTheTeam(true))}
            className="flex items-center justify-center gap-4 w-80 py-2 bg-brown text-white text-xl font-semibold border-4 border-black rounded-xl hover:scale-110"
          >
            <Plus className="w-8 h-8 text-white" />
            Ajouter un membre
          </button>
        </div>
      )}
      {dialogOpen.dialogNewUserInTheTeam && <DialogNewUserInTheTeam />}
    </section>
  );
};

export default UserListSearch;
