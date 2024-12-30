import { Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import readCategory from '../../../../api/directus/category/readCategory';
import { AppDispatch, RootState } from '../../../store/store';
import DialogCreateCategory from './DialogCreateCategory';
import { actionClickDialogCreateCategory } from '../../../store/actionCreator';
import AdminAgendaCategoryItem from './AdminAgendaCategoryItem';
import ICategory from '../../../../@types/category';
import DialogDeleteCategory from './DialogDeleteCategory';
import DialogUpdateCategory from './DialogUpdateCategory';
import DialogCreatePrestation from './DialogCreatePrestation';
import DialogDeletePrestation from './DialogDeletePrestation';
import DialogUpdatePrestation from './DialogUpdatePrestation';

const AdminAgendaPrestation = () => {
  const dispatch: AppDispatch = useDispatch();
  const dialogOpen = useSelector((state: RootState) => state.dialogReducer);
  const category: ICategory[] = useSelector((state: RootState) => state.categoryReducer.dataCategory);

  useEffect(() => {
    dispatch(readCategory());
  }, [dispatch]);

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Répertoire de vos Catégories et Prestations</h1>
        <button
          type="button"
          onClick={() => dispatch(actionClickDialogCreateCategory(true))}
          className="flex items-center justify-center gap-3 px-10 rounded-md py-2 text-brown hover:text-white hover:bg-brown"
        >
          <Plus className="text-white bg-brown w-8 h-8" /> Ajouter une catégorie
        </button>
      </header>
      <section className="overflow-y-auto h-screen flex-1 mt-16">
        {/* Adjusted margin-top */}
        {category.map((cat) => (
          <AdminAgendaCategoryItem key={cat.id} id={cat.id} title={cat.title} color={cat.color} />
        ))}
      </section>
      {dialogOpen.dialogCreateCategory && <DialogCreateCategory />}
      {dialogOpen.dialogUpdateCategory && <DialogUpdateCategory />}
      {dialogOpen.dialogDeleteCategory && <DialogDeleteCategory />}
      {dialogOpen.dialogCreatePrestation && <DialogCreatePrestation />}
      {dialogOpen.dialogUpdatePrestation && <DialogUpdatePrestation />}
      {dialogOpen.dialogDeletePrestation && <DialogDeletePrestation />}
    </div>
  );
};

export default AdminAgendaPrestation;
