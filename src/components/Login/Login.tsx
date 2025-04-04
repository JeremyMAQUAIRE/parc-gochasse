import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import bgLogin from '../../../public/bg-login.jpg';
import logo from '../../../public/logo_full.webp';
import { AppDispatch } from '../store/store';
import login from '../../api/directus/user/login';
import sendMailPasswordLost from '../../api/brevo/sendMailPasswordLost';
import NotificationSuccesSend from './NotificationSuccesSend';

const Login = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isResetting, setIsResetting] = useState(false);
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    const log = await dispatch(login({ email, password }));
    if (login.fulfilled.match(log)) {
      const user = await axios.get(`${import.meta.env.VITE_GOCHASSE_API}users/me`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${log.payload.data.access_token}`,
        },
      });
      localStorage.setItem('userData', JSON.stringify(user.data.data));
      if (user.data.data.role === import.meta.env.VITE_DIRECTUS_ROLE_ID) {
        if (localStorage.getItem('cguCgvAccepted') !== 'true') {
          navigate('/cgu_cgv');
        } else {
          navigate('/agenda');
        }
      } else {
        setError("Vous n'avez pas les droits pour accéder à cette page, connectez-vous sur Société ou GoChasse");
      }
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleResetPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
    if (isEmailValid) {
      setShow(true);
      setIsResetting(false);
      dispatch(sendMailPasswordLost(email));
    }
  };

  return (
    <div className="w-full h-full bg-cover bg-bottom flex items-center" style={{ backgroundImage: `url(${bgLogin})` }}>
      <form className="ml-[10%] flex w-1/4 flex-col items-center justify-between rounded-3xl bg-yellow-100/35 p-6 shadow-[25px_25px_25px_0px_rgba(0,0,0)] backdrop-blur-sm animate-slide-in">
        <div className="flex flex-col w-full items-center">
          <img src={logo} alt="logo du site" className="rounded-lg mb-3" />
          <h2 className="mb-6 text-3xl font-bold italic text-brown">Parc et enclos</h2>
          <p className="text-red-600 italic text-xl text-center">{error}</p>

          {/* Formulaire principal */}
          {!isResetting ? (
            <>
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
                onClick={handleLogin}
                className="inline-flex items-center justify-center gap-x-2 w-3/4 mt-5 rounded-md bg-brown border border-brown px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-white hover:text-brown"
              >
                Se connecter
              </button>
              <button type="button" onClick={() => setIsResetting(true)} className="italic underline text-brown self-end mt-2 hover:text-white">
                Mot de passe oublié ?
              </button>
            </>
          ) : (
            <>
              {!isEmailValid && <div className="text-red-600 italic text-xl text-center">Format de l&apos;email incorrect</div>}
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
              <button
                type="button"
                onClick={handleResetPassword}
                className="inline-flex items-center justify-center gap-x-2 w-3/4 mt-5 rounded-md bg-brown border border-brown px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-white hover:text-brown"
              >
                Réinitialiser le mot de passe
              </button>
              <button type="button" onClick={() => setIsResetting(false)} className="italic underline text-brown self-end mt-2 hover:text-white">
                Retour
              </button>
            </>
          )}
        </div>
        <div className="flex justify-between w-full mt-12 gap-4 h-10">
          <a
            href="https://gochasse.com"
            className="w-1/2 bg-green-600 text-white text-center flex justify-center items-center rounded-lg font-semibold transition-transform transform duration-300 ease-in-out hover:bg-green-800 hover:translate-y-[-4px]"
          >
            GoChasse
          </a>
          <a
            href="https://societe.gochasse.com"
            className="w-1/2 bg-green-600 text-white text-center flex justify-center items-center rounded-lg font-semibold transition-transform transform duration-300 ease-in-out hover:bg-green-800 hover:translate-y-[-4px]"
          >
            Société de chasse
          </a>
        </div>
      </form>
      <NotificationSuccesSend show={show} setShow={setShow} />
    </div>
  );
};

export default Login;
