import { Facebook, Instagram, Link as LinkIcon, Plus } from 'react-feather';
import { useState } from 'react';

import logo from '../../../../public/logo.webp';

const SettingPageGoChasseIdentity = () => {
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
  const [favori, setFavori] = useState(false);

  const photoProfil = userData.status_photo_profil === 'validée' ? `https://api.gochasse.com/assets/${userData.id_photo_profil}` : logo;

  return (
    <section className="w-5/12 h-72 flex flex-col justify-center items-center bg-zinc-300 rounded-lg">
      <div className="flex gap-20 justify-around items-center">
        <img src={photoProfil} alt="Profil" className="h-28 w-28 rounded-full" />
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-xl font-bold">{userData.business_name}</p>
          <p className="italic">
            {userData.number_adresse} {userData.street_adresse}
          </p>
          <p className="underline">
            {userData.zip_adresse} {userData.city_adresse}
          </p>
        </div>
      </div>
      <div className="flex justify-evenly gap-2 w-full mt-5">
        {userData.link_web !== '' ? (
          <a href={userData.link_web} target="_blank" className="text-white bg-brown p-2 rounded-lg hover:scale-125" rel="noreferrer">
            <LinkIcon />
          </a>
        ) : (
          <div className="text-white bg-zinc-500 p-2 rounded-lg">
            <LinkIcon />
          </div>
        )}
        {userData.link_facebook !== '' ? (
          <a href={userData.link_facebook} target="_blank" className="text-white bg-brown p-2 rounded-lg hover:scale-125" rel="noreferrer">
            <Facebook />
          </a>
        ) : (
          <div className="text-white bg-zinc-500 p-2 rounded-lg">
            <Facebook />
          </div>
        )}
        {userData.link_instagram !== '' ? (
          <a href={userData.link_instagram} target="_blank" className="text-white bg-brown p-2 rounded-lg hover:scale-125" rel="noreferrer">
            <Instagram />
          </a>
        ) : (
          <div className="text-white bg-zinc-500 p-2 rounded-lg">
            <Instagram />
          </div>
        )}
        {favori ? (
          <button
            type="button"
            onClick={() => setFavori(!favori)}
            className="flex gap-3 items-center justify-center text-white bg-zinc-500 py-2 w-48 rounded-lg hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>
            <span>Ajouter aux favoris</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setFavori(!favori)}
            className="flex gap-3 items-center justify-center text-brown font-bold bg-zinc-400/50 py-2 w-48 rounded-lg hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span>Favoris</span>
          </button>
        )}
      </div>
      <div className="mt-5">
        <button
          type="button"
          className="flex gap-4 items-center justify-center rounded-lg bg-zinc-500 text-white py-1.5 px-28 border-2 border-black hover:scale-105"
        >
          <Plus className="bg-brown w-8 h-8 p-1 rounded-2xl" /> <span>Participer à un évènement</span>
        </button>
      </div>
    </section>
  );
};

export default SettingPageGoChasseIdentity;
