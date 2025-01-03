import { Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { actionClickDialogCreateParc } from '../../../store/actionCreator';
import { AppDispatch, RootState } from '../../../store/store';
import DialogCreateParc from './DialogCreateParc';
import readAllGestionParcByUser from '../../../../api/directus/parc/readAllGestionParcByUser';
import IParc from '../../../../@types/parc';
import AdminAgendaParcItem from './AdminAgendaParcItem';
import DialogDeleteParc from './DialogDeleteParc';
import DialogUpdateParc from './DialogUpdateParc';

const AdminAgendaParc = () => {
  const dispatch: AppDispatch = useDispatch();
  const dialogOpen = useSelector((state: RootState) => state.dialogReducer);
  const parcs = useSelector((state: RootState) => state.parcReducer.data);

  useEffect(() => {
    dispatch(readAllGestionParcByUser());
  }, [dispatch]);

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Liste des Parcs et Enclos</h1>
        <div className="flex items-center">
          {parcs.length < 5 ? (
            <button
              type="button"
              onClick={() => dispatch(actionClickDialogCreateParc(true))}
              className="flex items-center justify-center gap-3 px-10 rounded-md py-2 text-brown hover:text-white hover:bg-brown"
            >
              <Plus className="text-white bg-brown w-8 h-8" /> Ajouter un parc
            </button>
          ) : (
            <button type="button" disabled className="flex items-center justify-center gap-3 px-10 rounded-md py-2 text-brown disabled:opacity-80">
              <Plus className="text-white bg-brown w-8 h-8" /> Nombre max atteint
            </button>
          )}
        </div>
      </header>
      <div className="mt-20 mb-20 w-10/12 m-auto">
        {parcs.length !== 0 && parcs.map((parc: IParc) => <AdminAgendaParcItem key={parc.id} parc={parc} />)}
      </div>

      {dialogOpen.dialogCreateParc && <DialogCreateParc />}
      {dialogOpen.dialogDeleteParc && <DialogDeleteParc />}
      {dialogOpen.dialogUpdateParc && <DialogUpdateParc />}
    </div>
  );
};

export default AdminAgendaParc;
