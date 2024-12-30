import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import UserListSearch from './UserListSearch';
import ListUserSort from './ListUserSort';
import IUserMember from '../../@types/userMember';
import ListeUserItem from './ListeUserItem';
import ListUserInvitation from './ListUserInvitation';
import readUserSocietyMemberByUserId from '../../api/directus/userSocietyMember/readUserSocietyMemberByUserId';
import DialogInfoMember from './DialogInfoMember';
import DialogDeleteMember from './DialogDeleteMember';
import readUserConnection from '../../api/directus/userConnection/readUserConnection';
import ListeUserVisitorItem from './ListeUserVisitorItem';
import DialogDeleteVisitor from './DialogDeleteVisitor';

const ListUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const dialogOpen = useSelector((state: RootState) => state.dialogReducer);
  const usersMembers = useSelector((state: RootState) => state.ListUserReducer.listMembers);
  const usersVisitors = useSelector((state: RootState) => state.ListUserReducer.listVisitors);
  const [page, setpage] = useState('membres');
  const [search, setSearch] = useState('');
  const [filterSelected, setFilterSelected] = useState('all');
  const [userList, setUserList] = useState<IUserMember[]>(usersMembers);
  const [userListVisitor, setUserListVisitor] = useState<IUserMember[]>(usersVisitors);
  const [mailList, setMailList] = useState<string[]>([]);

  useEffect(() => {
    // Recuperation des membres de la societe usersMembers
    dispatch(readUserSocietyMemberByUserId());
  }, [dispatch]);
  useEffect(() => {
    // Recuperation des membres de la societe usersVisitors
    dispatch(readUserConnection());
  }, [dispatch]);

  useEffect(() => {
    // Filter the users based on the search input and filterSelected
    const filteredUsers = usersVisitors.filter((user: IUserMember) => {
      const userName = `${user.id_user.first_name.toLowerCase()} ${user.id_user.last_name.toLowerCase()}`;
      const isNameMatch = userName.includes(search.toLowerCase());

      const isTraqueur = filterSelected === 'traqueur' ? user.id_user.traqueur === true : true;
      const isPoste = filterSelected === 'poste' ? user.id_user.poste === true : true;
      const isPiegeur = filterSelected === 'piegeur' ? user.id_user.piegeur === true : true;
      const isGibier = filterSelected === 'gibier' ? user.id_user.petitGibier === true : true;

      // Return true if the user matches the search query and filterSelected conditions
      return isNameMatch && isTraqueur && isPoste && isPiegeur && isGibier;
    });

    // Set the filtered list
    setUserListVisitor(filteredUsers);
  }, [filterSelected, search, usersVisitors]);

  useEffect(() => {
    // Filter the users based on the search input and filterSelected
    const filteredUsers = usersMembers.filter((user: IUserMember) => {
      const userName = `${user.user_member.first_name.toLowerCase()} ${user.user_member.last_name.toLowerCase()}`;
      const isNameMatch = userName.includes(search.toLowerCase());

      const isTraqueur = filterSelected === 'traqueur' ? user.user_member.traqueur === true : true;
      const isPoste = filterSelected === 'poste' ? user.user_member.poste === true : true;
      const isPiegeur = filterSelected === 'piegeur' ? user.user_member.piegeur === true : true;
      const isGibier = filterSelected === 'gibier' ? user.user_member.petitGibier === true : true;

      // Return true if the user matches the search query and filterSelected conditions
      return isNameMatch && isTraqueur && isPoste && isPiegeur && isGibier;
    });

    // Set the filtered list
    setUserList(filteredUsers);
  }, [filterSelected, search, usersMembers]);

  useEffect(() => {
    // Update mail list based on the userList
    if (page === 'membres') {
      const emails = userList.map((user: IUserMember) => user.user_member.email);
      setMailList(emails);
    }
    if (page === 'visiteurs') {
      const emails = userListVisitor.map((user: IUserMember) => user.id_user.email);
      setMailList(emails);
    }
  }, [userList, page, userListVisitor]);

  return (
    <section className="w-11/12 mx-auto">
      <nav className=" flex gap-4 py-2.5 px-4 justify-center mt-4 bg-zinc-300 rounded-lg">
        <button
          type="button"
          onClick={() => setpage('membres')}
          className={
            page === 'membres'
              ? 'flex flex-1 py-2 text-2xl justify-center border-2 border-brown text-white bg-brown rounded-lg'
              : 'flex flex-1 py-2 text-2xl justify-center border-2 border-brown rounded-lg'
          }
        >
          Membres
        </button>
        <button
          type="button"
          onClick={() => setpage('visiteurs')}
          className={
            page === 'visiteurs'
              ? 'flex flex-1 py-2 text-2xl justify-center border-2 border-brown text-white bg-brown rounded-lg'
              : 'flex flex-1 py-2 text-2xl justify-center border-2 border-brown rounded-lg'
          }
        >
          Visiteurs
        </button>
      </nav>
      <UserListSearch display={page} mailList={mailList} setSearch={setSearch} />
      <div className="w-11/12 px-4 mx-auto flex gap-6">
        <div>
          <ListUserSort filterSelected={filterSelected} setFilterSelected={setFilterSelected} />
          {page === 'membres' && <ListUserInvitation />}
        </div>
        <div className="flex-1 mt-2">
          {page === 'membres' && userList && userList.map((user: IUserMember) => <ListeUserItem key={user.id} member={user} />)}
          {page === 'visiteurs' &&
            userListVisitor &&
            userListVisitor.map((user: IUserMember) => <ListeUserVisitorItem key={user.id} member={user} />)}
        </div>
      </div>
      {dialogOpen.dialogDeleteMember && <DialogDeleteMember />}
      {dialogOpen.dialogInfoMember && <DialogInfoMember />}
      {dialogOpen.dialogDeleteVisitor && <DialogDeleteVisitor />}
    </section>
  );
};

export default ListUser;
