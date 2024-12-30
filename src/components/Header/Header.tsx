import { NavLink } from 'react-router-dom';
import { Settings } from 'react-feather';
import Cookies from 'js-cookie';

import logoFull from '../../../public/logo_full.webp';

const Header = () => {
  return (
    <header className="bg-[#191919] h-16 flex justify-between items-center border-b-brown border-b-4">
      <section className="flex items-center text-lg h-full">
        <img src={logoFull} alt="Logo GoChasse" className="h-12 w-68 px-10" />
        <NavLink
          to="/parametres"
          className={({ isActive }) =>
            isActive
              ? 'text-white font-semibold py-4 w-16 bg-brown h-full flex items-center justify-center border-l-4 border-r-2 border-brown hover:bg-brown'
              : 'text-white font-semibold py-4 w-16 h-full flex items-center justify-center border-l-4 border-r-2 border-brown hover:bg-brown'
          }
        >
          <Settings className="text-white" />
        </NavLink>
        <NavLink
          to="/agenda"
          className={({ isActive }) =>
            isActive
              ? 'text-white text-base font-semibold py-4 px-6 bg-brown h-full flex items-center justify-center border-x-2 border-brown hover:bg-brown'
              : 'text-white text-base font-semibold py-4 px-6 h-full flex items-center justify-center border-x-2 border-brown hover:bg-brown'
          }
        >
          Agenda
        </NavLink>
        <NavLink
          to="/liste-utlisateur"
          className={({ isActive }) =>
            isActive
              ? 'text-white text-base font-semibold py-4 px-6 bg-brown h-full flex items-center justify-center border-x-2 border-brown hover:bg-brown'
              : 'text-white text-base font-semibold py-4 px-6 h-full flex items-center justify-center border-x-2 border-brown hover:bg-brown'
          }
        >
          Liste des utilisateurs
        </NavLink>
        <NavLink
          to="/administration"
          className={({ isActive }) =>
            isActive
              ? 'text-white text-base font-semibold py-4 px-6 bg-brown h-full flex items-center justify-center border-r-4 border-l-2 border-brown hover:bg-brown'
              : 'text-white text-base font-semibold py-4 px-6 h-full flex items-center justify-center border-r-4 border-l-2 border-brown hover:bg-brown'
          }
        >
          Admin
        </NavLink>
      </section>
      <section className="pr-5">
        <p className="bg-[#808080] w-auto h-full text-xl text-white font-semibold py-2 px-10 flex justify-center items-center rounded-xl">
          {Cookies.get('businessName')}
        </p>
      </section>
    </header>
  );
};

export default Header;
