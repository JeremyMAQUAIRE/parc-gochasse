import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../public/logo.webp';
import { AppDispatch, RootState } from '../store/store';
import {
  actionChangeContactLastname,
  actionChangeContactMail,
  actionChangeContactMessage,
  actionChangeContactName,
  actionChangeContactObjet,
  actionResetContactState,
} from '../store/actionCreator';
import sendContactMessage from '../../api/brevo/sendContactMessage';

interface SendSuccessProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendSuccess = ({ show, setShow }: SendSuccessProps) => {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end mt-12">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={show}>
            <div className="pointer-events-auto w-full border-2 border-brown max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <CheckCircleIcon aria-hidden="true" className="size-6 text-brown" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">La demande a été envoyé avec succés</p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setShow(false);
                      }}
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

const SettingContact = () => {
  const dispatch: AppDispatch = useDispatch();
  const contactForm = useSelector((state: RootState) => state.contactReducer);
  const userErrorMail = useSelector((state: RootState) => state.userReducer.errorEmail);
  const [show, setShow] = useState(false);

  const buttonDisabled = !(
    contactForm.name !== '' &&
    contactForm.lastname !== '' &&
    contactForm.mail !== '' &&
    contactForm.objet !== '' &&
    contactForm.message !== '' &&
    !userErrorMail
  );

  return (
    <div className="fixed w-[calc(100%-373px)] mt-20 overflow-scroll flex justify-center items-center">
      <div className="relative isolate">
        <div className="mx-auto max-w-xl lg:max-w-4xl">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-brown sm:text-5xl">Contactez-nous</h2>
          <p className="mt-2 text-lg/8 text-gray-600">L&apos;équipe GoChasse répondra à vos demandes au plus vite.</p>
          <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
            <form className="lg:flex-auto">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                    Prénom
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      value={contactForm.lastname}
                      onChange={(e) => dispatch(actionChangeContactLastname(e.target.value))}
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                    Nom
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => dispatch(actionChangeContactName(e.target.value))}
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mail" className="block text-sm/6 font-semibold text-gray-900">
                    Mail
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="mail"
                      name="mail"
                      type="text"
                      value={contactForm.mail}
                      onChange={(e) => dispatch(actionChangeContactMail(e.target.value))}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="budget" className="block text-sm/6 font-semibold text-gray-900">
                    Sujet
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="budget"
                      name="budget"
                      type="text"
                      value={contactForm.objet}
                      onChange={(e) => dispatch(actionChangeContactObjet(e.target.value))}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => dispatch(actionChangeContactMessage(e.target.value))}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  disabled={buttonDisabled}
                  onClick={() => {
                    dispatch(sendContactMessage());
                    setShow(true);
                    dispatch(actionResetContactState());
                  }}
                  className="block w-full rounded-md bg-brown px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                >
                  Envoyer votre demande
                </button>
              </div>
            </form>
            <div className="lg:mt-6 lg:w-96 lg:flex-none">
              <figure className="mt-14">
                <blockquote className="text-lg/8 font-semibold text-gray-900">
                  <p>
                    &quot;En créant GoChasse j&apos;ai souhaité créer un lien direct avec les parcs et les sociétés de chasse répertoriées en un seul
                    et même endroit&quot;
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex gap-x-6">
                  <img alt="" src={logo} className="size-12 flex-none rounded-full" />
                  <div>
                    <div className="text-base font-semibold text-gray-900">François MEYNARD</div>
                    <div className="text-sm/6 text-gray-600">Fondateur de GoChasse</div>
                  </div>
                </figcaption>
                <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>1 rue de la Grole 63350 Joze</dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <a href="tel:07 43 28 08 28" className="hover:text-gray-900">
                        07 43 28 08 28
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                    </dt>
                    <dd>
                      <a href="mailto:contact@gochasse.com" className="hover:text-gray-900">
                        contact@gochasse.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <SendSuccess show={show} setShow={setShow} />
    </div>
  );
};

export default SettingContact;
