import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../store/store';
import readCategory from '../../../../api/directus/category/readCategory';
import ICategory from '../../../../@types/category';
import { actionChangeRevenuMonth, actionChangeRevenuYear } from '../../../store/actionCreator';
import AdminStatMessageRevenuItem from './AdminStatMessageRevenuItem';

const AdminStatMessageRevenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories: ICategory[] = useSelector((state: RootState) => state.categoryReducer.dataCategory);
  const [categoriesChoice, setCategoriesChoice] = useState<ICategory[]>(categories);
  const revenue = useSelector((state: RootState) => state.revenueReducer);

  useEffect(() => {
    dispatch(readCategory());
  }, [dispatch]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'all') {
      // Show all categories
      setCategoriesChoice(categories);
    } else {
      // Filter categories based on selected category title
      const filteredCategories = categories.filter((category) => category.title === selectedCategory);
      setCategoriesChoice(filteredCategories);
    }
  };

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Chiffre d&apos;affaires</h1>
      </header>
      <div className="overflow-y-auto h-screen flex-1 mt-16 mb-10">
        <section className="w-11/12 m-auto flex gap-3 mb-4">
          <div className="rounded-md w-2/4 px-3 pb-1.5 pt-2.5 mt-3 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-brown">
            <label htmlFor="categories" className="block text-xs font-bold italic text-brown">
              Catégories
            </label>
            <select
              id="location"
              name="location"
              onChange={handleCategoryChange}
              className="block w-full border-0 my-1 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-lg"
            >
              <option value="all" className="text-sm">
                Toutes les catégories
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.title} className="text-sm">
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-md w-1/4 px-3 pb-1.5 pt-2.5 mt-3 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-brown">
            <label htmlFor="month" className="block text-xs font-bold italic text-brown">
              Mois
            </label>
            <select
              id="location"
              name="location"
              defaultValue={revenue.month}
              onChange={(e) => {
                dispatch(actionChangeRevenuMonth(parseInt(e.target.value, 10)));
              }}
              className="block w-full border-0 my-1 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-lg"
            >
              <option value="1">Janvier</option>
              <option value="2">Février</option>
              <option value="3">Mars</option>
              <option value="4">Avril</option>
              <option value="5">Mai</option>
              <option value="6">Juin</option>
              <option value="7">Juillet</option>
              <option value="8">Août</option>
              <option value="9">Septembre</option>
              <option value="10">Octobre</option>
              <option value="11">Novembre</option>
              <option value="12">Décembre</option>
            </select>
          </div>
          <div className="rounded-md w-1/4 px-3 pb-1.5 pt-2.5 mt-3 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-brown">
            <label htmlFor="year" className="block text-xs font-bold italic text-brown">
              Année
            </label>
            <input
              type="number"
              id="year"
              value={revenue.year}
              min={2023}
              onChange={(e) => dispatch(actionChangeRevenuYear(parseInt(e.target.value, 10)))}
              className="block w-full border-0 my-1 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-base"
            />
          </div>
        </section>
        <section className="w-11/12 m-auto mb-4 flex flex-col">
          {categoriesChoice.map((category) => (
            <AdminStatMessageRevenuItem key={category.id} id={category.id} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminStatMessageRevenu;
