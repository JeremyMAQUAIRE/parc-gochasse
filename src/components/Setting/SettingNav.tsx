import { Eye, Info, LogOut, PhoneCall } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import logoutUser from '../../api/directus/user/logoutUser';

const SettingNav = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="w-[373px] border-r-[1px] border-black/80 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col justify-between h-full">
        <div>
          <NavLink
            to="ma-page"
            className={({ isActive }) =>
              isActive
                ? 'flex h-16 items-center gap-2 pl-4 text-brown font-semibold border-b-[1px] border-black'
                : 'flex h-16 items-center gap-2 pl-4 border-b-[1px] border-black'
            }
          >
            <Eye /> Voir ma page Gochasse
          </NavLink>
          <NavLink
            to="contact"
            className={({ isActive }) =>
              isActive
                ? 'flex h-16 items-center gap-2 pl-4 text-brown font-semibold border-b-[1px] border-black'
                : 'flex h-16 items-center gap-2 pl-4 border-b-[1px] border-black'
            }
          >
            <PhoneCall /> Nous contacter
          </NavLink>
          <a
            href={`https://api.gochasse.com/assets/${import.meta.env.VITE_DIRECTUS_ID_CGU}?download`}
            className="flex h-16 items-center gap-2 pl-4 border-b-[1px] border-black hover:text-brown"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Info /> Télécharger les CGU
          </a>
          <a
            href={`https://api.gochasse.com/assets/${import.meta.env.VITE_DIRECTUS_ID_CGV}?download`}
            className="flex h-16 items-center gap-2 pl-4 border-b-[1px] border-black hover:text-brown"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Info /> Télécharger les CGV
          </a>
        </div>
        <div>
          <div className="settingNav-content_item settingNav-content_item_logout">
            <button type="button" className="flex h-16 items-center gap-2 pl-4 border-t-[1px] border-black w-full" onClick={handleClickLogout}>
              <LogOut /> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SettingNav;
