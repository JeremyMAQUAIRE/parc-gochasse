import { Plus, Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { AppDispatch, RootState } from '../../../store/store';
import {
  actionChangeNotificationMailId,
  actionChangeNotificationMailMail,
  actionChangeUserTextMailDescription,
  actionClickDialogCreateNotificationMail,
  actionClickDialogDeleteNotificationMail,
} from '../../../store/actionCreator';
import updateUser from '../../../../api/directus/user/updateUser';
import DialogCreateNotificationMail from './DialogCreateNotificationMail';
import DialogDeleteNotificationMail from './DialogDeleteNotificationMail';
import readNotificationMailRdv from '../../../../api/directus/notificationMailRdv/readNotificationMailRdv';

interface ITinyMCEInstance {
  getContent: () => string;
}

const AdminSocieteNotification = () => {
  const dispatch: AppDispatch = useDispatch();
  const editorRef = useRef<ITinyMCEInstance | null>(null);
  const user = useSelector((state: RootState) => state.userReducer);
  const mails = useSelector((state: RootState) => state.notificationMailForRdv.mailsData as { id: string; mail: string }[]);
  const dialogOpen = useSelector((state: RootState) => state.dialogReducer);
  const disabled = mails.length > 1;
  const message =
    "<div> <p><strong>Adresse du lieu :</strong></p> <p>[Insérer l'adresse complète de l'événement ici]</p> <p><strong>Contact en cas d'absence :</strong></p> <p>Nom : [Nom de la personne de contact] Téléphone : [Numéro de téléphone de la personne de contact] Email : [Email de la personne de contact]</p> <p><strong>Instructions en cas de besoin :</strong></p> Veuillez vous diriger vers le lieu de rendez-vous, le responsable vous accueillera et vous donnera la marche à suivre. En cas de besoin pendant l'événement, veuillez contacter la personne de contact mentionnée ci-dessus pour obtenir de l'aide ou des informations supplémentaires.</div>";

  useEffect(() => {
    dispatch(readNotificationMailRdv());
  }, [dispatch]);

  useEffect(() => {
    // Get user data from local storage
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
    if (userData) {
      dispatch(actionChangeUserTextMailDescription(userData.text_mail_description));
    }
  }, [dispatch]);

  const handleChangeTextMailDesciption = () => {
    if (editorRef.current) {
      dispatch(actionChangeUserTextMailDescription(editorRef.current.getContent()));
      dispatch(
        updateUser({
          name: 'text_mail_description',
          value: editorRef.current.getContent(),
        })
      );
    }
  };

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Gérer les notifications des rendez-vous</h1>
      </header>
      <section className="w-11/12 m-auto mt-20 mb-4">
        <h2 className="font-semibold underline text-lg">Adresse mail des notifications rdv</h2>
        <p className="mt-4">
          Veuillez saisir l&apos;adresse e-mail ou les adresses e-mail qui recevront une notification chaque fois qu&apos;un rendez-vous est pris ou
          annulé par l&apos;utilisateur.
        </p>
        <button
          type="button"
          disabled={disabled}
          onClick={() => dispatch(actionClickDialogCreateNotificationMail(true))}
          className="flex items-center justify-center gap-4 mt-4 text-lg w-90 m-auto bg-brown text-white px-60 py-2 rounded-md hover:ring-2 hover:ring-brown hover:bg-white hover:text-brown disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          <p className="font-semibold">Ajouter une adresse mail</p>
        </button>
        <div className="pt-4">
          {mails.map((mail) => (
            <div key={mail.id + mail.mail} className="flex justify-between items-center mt-4 bg-white px-4 py-2 rounded-md shadow-md">
              <p className="text-lg font-medium text-gray-900">{mail.mail}</p>
              <button type="button">
                <Trash2
                  onClick={() => {
                    dispatch(actionClickDialogDeleteNotificationMail(true));
                    dispatch(actionChangeNotificationMailId(parseInt(mail.id, 10)));
                    dispatch(actionChangeNotificationMailMail(mail.mail));
                  }}
                  className="bg-red-500 rounded-full p-2 h-10 w-10 text-white hover:bg-white hover:text-red-500"
                  style={{ border: '1px solid black' }}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="w-11/12 m-auto mt-20 mb-4">
        <h2 className="font-semibold underline text-lg">Adresse et coordonnée(s) de votre établissement</h2>
        <p className="mt-4">
          Votre message contiendra des détails tels que l&apos;adresse de l&apos;événement, un contact en cas d&apos;absence, ainsi que des
          instructions à suivre en cas de besoin.
        </p>
        <p className="mb-4">
          Ces informations seront incluses dans la partie réservée à la confirmation et au(x) rappel(s) envoyés aux participants inscrits aux
          événements.
        </p>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={user.textMailDescription || message}
          onBlur={handleChangeTextMailDesciption}
          init={{
            language: 'fr_FR',
            height: 250,
            menubar: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:12px }',
            forced_root_block: 'div',
          }}
        />
      </section>
      {dialogOpen.dialogCreateNotificationMail && <DialogCreateNotificationMail />}
      {dialogOpen.dialogDeleteNotificationMail && <DialogDeleteNotificationMail />}
    </div>
  );
};

export default AdminSocieteNotification;
