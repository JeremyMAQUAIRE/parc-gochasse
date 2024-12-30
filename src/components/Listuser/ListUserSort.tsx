import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

interface IUserListSort {
  filterSelected: string;
  setFilterSelected: (arg: string) => void;
}

const ListUserSort = ({ filterSelected, setFilterSelected }: IUserListSort) => {
  const [displayMenuFilter, setDisplayMenuFilter] = useState(false);

  const toggleMenu = () => {
    setDisplayMenuFilter((prevState) => !prevState);
  };

  return (
    <section className="mb-4 w-80">
      <button
        type="button"
        className="flex w-full gap-4 items-center justify-center text-lg h-10 bg-zinc-300 font-semibold rounded-xl cursor-pointer"
        onClick={toggleMenu}
      >
        Trier par {displayMenuFilter ? <ChevronUp /> : <ChevronDown />}
      </button>
      <ul
        className={`bg-zinc-300 w-full rounded-lg mt-1 overflow-hidden transition-all duration-300 ease-in-out max-h-0 ${
          displayMenuFilter ? 'max-h-[200px]' : ''
        }`}
      >
        <li
          className={
            filterSelected === 'all'
              ? 'flex flex-1 items-center justify-start pl-8 h-8 bg-brown text-white font-bold hover:bg-brown hover:text-white'
              : 'flex flex-1 items-center justify-start pl-8 h-8 hover:bg-green-500 hover:text-white hover:font-semibold'
          }
        >
          <button type="button" onClick={() => setFilterSelected('all')} className="w-full flex justify-start">
            Tous
          </button>
        </li>
        <li
          className={
            filterSelected === 'gibier'
              ? 'flex flex-1 items-center justify-start pl-8 h-8 bg-brown text-white font-bold hover:bg-brown hover:text-white'
              : 'flex flex-1 items-center justify-start pl-8 h-8 hover:bg-green-500 hover:text-white hover:font-semibold'
          }
        >
          <button type="button" onClick={() => setFilterSelected('gibier')} className="w-full flex justify-start">
            Petit gibier
          </button>
        </li>
        <li
          className={
            filterSelected === 'piegeur'
              ? 'flex flex-1 items-center justify-start pl-8 h-8 bg-brown text-white font-bold hover:bg-brown hover:text-white'
              : 'flex flex-1 items-center justify-start pl-8 h-8 hover:bg-green-500 hover:text-white hover:font-semibold'
          }
        >
          <button type="button" onClick={() => setFilterSelected('piegeur')} className="w-full flex justify-start">
            Piégeur
          </button>
        </li>
        <li
          className={
            filterSelected === 'poste'
              ? 'flex flex-1 items-center justify-start pl-8 h-8 bg-brown text-white font-bold hover:bg-brown hover:text-white'
              : 'flex flex-1 items-center justify-start pl-8 h-8 hover:bg-green-500 hover:text-white hover:font-semibold'
          }
        >
          <button type="button" onClick={() => setFilterSelected('poste')} className="w-full flex justify-start">
            Posté
          </button>
        </li>
        <li
          className={
            filterSelected === 'traqueur'
              ? 'flex flex-1 items-center justify-start pl-8 h-8 bg-brown text-white font-bold hover:bg-brown hover:text-white'
              : 'flex flex-1 items-center justify-start pl-8 h-8 hover:bg-green-500 hover:text-white hover:font-semibold'
          }
        >
          <button type="button" onClick={() => setFilterSelected('traqueur')} className="w-full flex justify-start">
            Traqueur
          </button>
        </li>
      </ul>
    </section>
  );
};

export default ListUserSort;
