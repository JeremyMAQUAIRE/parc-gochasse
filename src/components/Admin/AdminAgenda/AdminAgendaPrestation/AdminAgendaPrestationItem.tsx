import { Edit3, Trash2 } from 'react-feather';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../store/store';
import {
  actionChangePrestationId,
  actionChangePrestationTitle,
  actionClickDialogDeletePrestation,
  actionClickDialogUpdatePrestation,
} from '../../../store/actionCreator';
import IPrestation from '../../../../@types/prestation';
import formatTime from '../../../../utils/formatTime';

interface IAdminAgendaPrestationItem {
  prestation: IPrestation;
}

const AdminAgendaPrestationItem = ({ prestation }: IAdminAgendaPrestationItem) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="rounded-2xl w-10/12 min-h-14 m-auto mt-2 mb-2 flex flex-col justify-between bg-white">
      <section className="flex justify-between items-center h-14 mx-4">
        <div>
          <span className="text-base font-bold pr-2">{prestation.title}</span>
          <span className="text-base font-bold text-gray-400/75">
            {formatTime(prestation.start_time)}/{formatTime(prestation.end_time)} {' - '}
          </span>
          <span className="text-base font-bold text-gray-400/75">{prestation.price}€</span>
        </div>
        <div className="flex gap-3">
          <Edit3
            onClick={() => {
              dispatch(actionClickDialogUpdatePrestation(true));
              dispatch(actionChangePrestationId(prestation.id));
            }}
            className="bg-black rounded-full p-2 h-10 w-10 text-white hover:bg-white hover:text-black"
            style={{ border: '1px solid black' }}
          />
          <button type="button">
            <Trash2
              onClick={() => {
                dispatch(actionClickDialogDeletePrestation(true));
                dispatch(actionChangePrestationId(prestation.id));
                dispatch(actionChangePrestationTitle(prestation.title));
              }}
              className="bg-red-500 rounded-full p-2 h-10 w-10 text-white hover:bg-white hover:text-red-500"
              style={{ border: '1px solid black' }}
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminAgendaPrestationItem;
