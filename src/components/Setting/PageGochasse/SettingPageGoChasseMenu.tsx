import { useState } from 'react';
import SettingPageGoChassePresentation from './SettingPageGoChassePresentation';
import SettingPageGoChasseConsigne from './SettingPageGoChasseConsigne';
import SettingPageGoChasseHoraire from './SettingPageGoChasseHoraire';

const SettingPageGoChasseMenu = () => {
  const [page, setpage] = useState('presentation');

  return (
    <div>
      <nav className=" flex gap-4 py-2.5 px-4 justify-center mt-4 bg-zinc-300 rounded-lg">
        <button
          type="button"
          onClick={() => setpage('presentation')}
          className={
            page === 'presentation'
              ? 'flex flex-1 py-1 justify-center border-2 border-brown text-white bg-brown rounded-lg'
              : 'flex flex-1 py-1 justify-center border-2 border-brown rounded-lg'
          }
        >
          Présentation
        </button>
        <button
          type="button"
          onClick={() => setpage('consigne')}
          className={
            page === 'consigne'
              ? 'flex flex-1 py-1 justify-center border-2 border-brown text-white bg-brown rounded-lg'
              : 'flex flex-1 py-1 justify-center border-2 border-brown rounded-lg'
          }
        >
          Consigne
        </button>
        <button
          type="button"
          onClick={() => setpage('horaire')}
          className={
            page === 'horaire'
              ? 'flex flex-1 py-1 justify-center border-2 border-brown text-white bg-brown rounded-lg'
              : 'flex flex-1 py-1 justify-center border-2 border-brown rounded-lg'
          }
        >
          Horaires
        </button>
      </nav>
      {page === 'presentation' && <SettingPageGoChassePresentation />}
      {page === 'consigne' && <SettingPageGoChasseConsigne />}
      {page === 'horaire' && <SettingPageGoChasseHoraire />}
    </div>
  );
};

export default SettingPageGoChasseMenu;
