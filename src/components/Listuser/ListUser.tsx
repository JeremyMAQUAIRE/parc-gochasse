import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserListSearch from './UserListSearch';
import { AppDispatch, RootState } from '../store/store';
import IUserMember from '../../@types/userMember';
import ListeUserVisitorItem from './ListeUserVisitorItem';
import readUserConnection from '../../api/directus/userConnection/readUserConnection';
import DialogInfoMember from './DialogInfoMember';
import DialogDeleteVisitor from './DialogDeleteVisitor';

const ListUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const dialogOpen = useSelector((state: RootState) => state.dialogReducer);
  const usersVisitors = useSelector((state: RootState) => state.ListUserReducer.listVisitors);
  const [userListVisitor, setUserListVisitor] = useState<IUserMember[]>(usersVisitors);
  const [filterSelected] = useState('all');
  const [mailList, setMailList] = useState<string[]>([]);
  const [search, setSearch] = useState('');

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
    // Update mail list based on the userList
    const emails = userListVisitor.map((user: IUserMember) => user.id_user.email);
    setMailList(emails);
  }, [userListVisitor]);

  return (
    <section className="w-11/12 mx-auto">
      <nav className="flex flex-1 py-2 mt-4 text-2xl justify-center text-white bg-brown rounded-lg">Liste client(s)</nav>
      <UserListSearch mailList={mailList} setSearch={setSearch} />
      <div className="flex-1 flex flex-col justify-start items-end mt-2">
        {userListVisitor && userListVisitor.map((user: IUserMember) => <ListeUserVisitorItem key={user.id} member={user} />)}
      </div>
      {dialogOpen.dialogInfoMember && <DialogInfoMember />}
      {dialogOpen.dialogDeleteVisitor && <DialogDeleteVisitor />}
    </section>
  );
};

export default ListUser;
