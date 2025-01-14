import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import bgLogin from '../../../public/bg-login.jpg';
import logo from '../../../public/logo_full.webp';
import { AppDispatch } from '../store/store';
import updatePassword from '../../api/directus/user/updatePassword';

const Password = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const tokenPassword = location.pathname.split('login/')[1];
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');

  // Gestion du changement de mot de passe
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);

    if (value.length < 8) {
      setErrorPassword('Le mot de passe doit contenir au moins 8 caractères.');
    } else {
      setErrorPassword('');
    }
  };

  // Gestion de la confirmation du mot de passe
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmedPassword(value);

    if (value !== password) {
      setErrorConfirmPassword('Les mots de passe ne correspondent pas.');
    } else {
      setErrorConfirmPassword('');
    }
  };

  // Soumission du formulaire
  const handleSubmit = async () => {
    if (password.length < 8) {
      setErrorPassword('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (password !== confirmedPassword) {
      setErrorConfirmPassword('Les mots de passe ne correspondent pas.');
      return;
    }

    // Si tout est valide
    const dataUser = { token: tokenPassword, password };
    await dispatch(updatePassword(dataUser));
    navigate('/login');
  };

  return (
    <div className="w-full h-full bg-cover bg-bottom flex items-center" style={{ backgroundImage: `url(${bgLogin})` }}>
      <form className="ml-[10%] flex w-1/4 flex-col items-center justify-between rounded-3xl bg-yellow-100/35 p-6 shadow-[25px_25px_25px_0px_rgba(0,0,0)] backdrop-blur-sm animate-slide-in">
        <div className="flex flex-col w-full items-center">
          <img src={logo} alt="logo du site" className="rounded-lg mb-3" />
          <h2 className="mb-3 text-3xl font-bold italic text-brown">Parc et enclos</h2>
          <p className="text-white text-xl">Modifier votre mot de passe</p>

          <div className="rounded-md w-3/4 px-3 pb-1.5 pt-2.5 mt-6 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-brown">
            <label htmlFor="password" className="block text-xs font-bold italic text-brown">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="block w-full border-0 p-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-sm/6"
              placeholder="Votre mot de passe"
            />
          </div>
          {errorPassword && <p className="text-red-600 italic text-sm text-center mt-2 bg-white rounded-md px-4">{errorPassword}</p>}

          <div className="rounded-md w-3/4 px-3 pb-1.5 pt-2.5 mt-3 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-brown">
            <label htmlFor="confirmPassword" className="block text-xs font-bold italic text-brown">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmedPassword}
              onChange={handleConfirmPasswordChange}
              className="block w-full border-0 p-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 sm:text-sm/6"
              placeholder="Confirmation mot de passe"
            />
          </div>
          {errorConfirmPassword && <p className="text-red-600 italic text-sm text-center mt-2 bg-white rounded-md px-4">{errorConfirmPassword}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-x-2 w-3/4 mt-5 rounded-md bg-brown border border-brown px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-white hover:text-brown"
          >
            Valider votre mot de passe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
