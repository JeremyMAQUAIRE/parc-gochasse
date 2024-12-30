import { Edit3, Plus, Trash } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import ICategory from '../../../../@types/category';
import { AppDispatch } from '../../../store/store';
import {
  actionChangeCategoryId,
  actionChangePrestationIdCategory,
  actionClickDialogCreatePrestation,
  actionClickDialogDeleteCategory,
  actionClickDialogUpdateCategory,
} from '../../../store/actionCreator';
import AdminAgendaPrestationItem from './AdminAgendaPrestationItem';
import readPrestationByIdCategory from '../../../../api/directus/prestation/readPrestationByIdCategory';
import IPrestation from '../../../../@types/prestation';

const AdminAgendaCategoryItem = ({ id, title, color }: ICategory) => {
  const dispatch: AppDispatch = useDispatch();
  const [prestations, setPrestations] = useState<IPrestation[]>([]);

  useEffect(() => {
    const fetchPrestations = async () => {
      const result = await dispatch(readPrestationByIdCategory(id));
      setPrestations(result.payload);
    };
    fetchPrestations();
  }, [dispatch, id]);

  return (
    <div className="rounded-2xl w-10/12 min-h-28 m-auto mt-4 flex flex-col justify-between" style={{ backgroundColor: color }}>
      <header className="flex justify-between items-center h-14 mx-4">
        <h2 className="text-white text-xl font-bold">{title}</h2>
        <div className="flex gap-3">
          <Edit3
            onClick={() => {
              dispatch(actionClickDialogUpdateCategory(true));
              dispatch(actionChangeCategoryId(id));
            }}
            className="bg-black rounded-full p-2 h-10 w-10 text-white hover:bg-white hover:text-black"
            style={{ border: '1px solid black' }}
          />
          <button type="button">
            <Trash
              onClick={() => {
                dispatch(actionClickDialogDeleteCategory(true));
                dispatch(actionChangeCategoryId(id));
              }}
              className="bg-red-500 rounded-full p-2 h-10 w-10 text-white hover:bg-white hover:text-red-500"
              style={{ border: '1px solid black' }}
            />
          </button>
        </div>
      </header>
      <div>
        {prestations.map((prestation: IPrestation) => (
          <AdminAgendaPrestationItem key={prestation.id} prestation={prestation} />
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(actionClickDialogCreatePrestation(true));
          dispatch(actionChangePrestationIdCategory(id));
        }}
        className="flex items-center justify-center gap-3 rounded-md py-1 mb-3 mx-72 font-semibold text-brown bg-white ring-2 ring-brown hover:text-white hover:bg-brown"
      >
        <Plus /> Ajouter une prestation
      </button>
    </div>
  );
};

export default AdminAgendaCategoryItem;
