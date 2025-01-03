import { Edit3, Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../store/store';
import IParc from '../../../../@types/parc';
import {
  actionChangeGestionParcId,
  actionChangeGestionParcTitle,
  actionClickDialogDeleteParc,
  actionClickDialogUpdateParc,
} from '../../../store/actionCreator';

const AdminAgendaParcItem = ({ parc }: { parc: IParc }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="rounded-2xl m-auto mt-4 py-1 flex flex-col justify-between bg-brown border-4 border-black hover:opacity-90">
      <header className="flex justify-between items-center h-14 mx-4">
        <h2 className="text-white text-xl font-bold">{parc.name}</h2>
        <div className="flex gap-3">
          <Edit3
            className="bg-black rounded-full p-2 h-10 w-10 text-white hover:bg-white hover:text-black"
            style={{ border: '1px solid black' }}
            onClick={() => {
              dispatch(actionChangeGestionParcTitle(parc.name));
              dispatch(actionChangeGestionParcId(parc.id));
              dispatch(actionClickDialogUpdateParc(true));
            }}
          />
          <button type="button">
            <Trash2
              onClick={() => {
                dispatch(actionChangeGestionParcTitle(parc.name));
                dispatch(actionChangeGestionParcId(parc.id));
                dispatch(actionClickDialogDeleteParc(true));
              }}
              className="bg-red-500 rounded-full p-2 h-10 w-10 text-white hover:bg-white hover:text-red-500"
              style={{ border: '1px solid black' }}
            />
          </button>
        </div>
      </header>
    </div>
  );
};

export default AdminAgendaParcItem;
