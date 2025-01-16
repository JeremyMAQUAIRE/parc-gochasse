import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import bgLogin from '../../../public/bg-login.jpg';
import logo from '../../../public/logo_full.webp';
import { AppDispatch } from '../store/store';
import updateUser from '../../api/directus/user/updateUser';

const CguCgvAccepted = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccepted = async () => {
    localStorage.setItem('cguCgvAccepted', JSON.stringify(true));
    await dispatch(updateUser({ name: 'cgu_cgv_accepted', value: true }));
    await dispatch(updateUser({ name: 'tim_cgv_cgu_accepted', value: new Date().toISOString() }));
    navigate('/agenda');
  };

  return (
    <div className="w-full h-full bg-cover bg-bottom flex items-center" style={{ backgroundImage: `url(${bgLogin})` }}>
      <form className="ml-[10%] flex w-1/4 flex-col items-center justify-between rounded-3xl bg-yellow-100/35 p-6 shadow-[25px_25px_25px_0px_rgba(0,0,0)] backdrop-blur-sm animate-slide-in">
        <div className="flex flex-col w-full items-center">
          <img src={logo} alt="logo du site" className="rounded-lg mb-3" />
          <h2 className="mb-6 text-3xl font-bold italic text-brown">Parc et enclos</h2>

          <div className="flex items-center w-11/12 mx-auto">
            <label htmlFor="accept-terms" className="ml-3 text-base text-gray-900">
              <input
                type="checkbox"
                id="accept-terms"
                className="h-4 w-4 mr-3 accent-brown"
                checked={isAccepted}
                onChange={() => setIsAccepted(!isAccepted)}
              />
              J&apos;ai pris connaissance et j&apos;accepte les Conditions Générales d&apos;Utilisation (CGU) et les Conditions Générales de Vente
              (CGV) du site GoChasse.
            </label>
          </div>

          <div className="flex flex-col items-center w-11/12 mx-auto">
            <a href={`https://api.gochasse.com/assets/${import.meta.env.VITE_DIRECTUS_ID_CGU}?download`} className="mt-3 font-bold hover:text-brown">
              Conditions Générales d&apos;Utilisation (CGU)
            </a>
            <a href={`https://api.gochasse.com/assets/${import.meta.env.VITE_DIRECTUS_ID_CGV}?download`} className="mt-3 font-bold hover:text-brown">
              Conditions Générales de Vente (CGV)
            </a>
          </div>

          <button
            type="button"
            disabled={!isAccepted}
            onClick={handleAccepted}
            className="inline-flex items-center justify-center gap-x-2 w-3/4 mt-5 rounded-md bg-brown border border-brown px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-white hover:text-brown disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-brown disabled:text-white"
          >
            Accéder au site GoChasse
          </button>
        </div>
      </form>
    </div>
  );
};

export default CguCgvAccepted;
