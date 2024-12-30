import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../store/store';
import login from '../../api/directus/user/login';
import bgLogin from '../../../public/bg-login.png';
import logo from '../../../public/logo_full.webp';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    const log = await dispatch(login({ email, password }));
    if (login.fulfilled.match(log)) {
      const user = await axios.get('https://api.gochasse.com/users/me', {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${log.payload.data.access_token}`,
        },
      });
      localStorage.setItem('userData', JSON.stringify(user.data.data));
      if (user.data.data.role === import.meta.env.VITE_DIRECTUS_ROLE_ID) {
        navigate('/agenda');
      } else {
        setError("Vous n'avez pas les droits pour accéder à cette page, connectez-vous sur Parc ou GoChasse");
      }
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="w-full h-full bg-cover flex items-center" style={{ backgroundImage: `url(${bgLogin})` }}>
      <form className="ml-[65%] flex w-1/4 flex-col items-center justify-between rounded-3xl bg-yellow-100/35 p-6 shadow-[25px_25px_25px_0px_rgba(0,0,0)] backdrop-blur-sm animate-slide-in">
        <div className="flex flex-col w-full items-center">
          <img src={logo} alt="logo du site" className="rounded-lg mb-3" />
          <h2 className="mb-6 text-3xl font-bold italic text-brown">Société de chasse</h2>
          <p className="text-red-600 italic text-xl text-center">{error}</p>
          <div className="rounded-md w-3/4 px-3 pb-1.5 pt-2.5 mt-6 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-brown">
            <label htmlFor="email" className="block text-xs font-bold italic text-brown">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border-0 p-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-sm/6"
              placeholder="Votre email"
            />
          </div>
          <div className="rounded-md w-3/4 px-3 pb-1.5 pt-2.5 mt-3 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-brown">
            <label htmlFor="password" className="block text-xs font-bold italic text-brown">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-0 p-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-sm/6"
              placeholder="Votre mot de passe"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-x-2 w-3/4 mt-5 rounded-md bg-brown border border-brown px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-white hover:text-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            Se connecter
            <svg className="-mr-0.5 size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-between w-full mt-12 gap-4 h-10">
          <a
            href="https://demo.gochasse.com"
            className="w-1/2 bg-brown text-white text-center flex justify-center items-center rounded-lg font-semibold transition-transform transform duration-300 ease-in-out hover:bg-green-800 hover:translate-y-[-4px]"
          >
            GoChasse
          </a>
          <a
            href="https://demo.gochasse.com"
            className="w-1/2 bg-brown text-white text-center flex justify-center items-center rounded-lg font-semibold transition-transform transform duration-300 ease-in-out hover:bg-[#4b240f] hover:translate-y-[-4px]"
          >
            Parc
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
