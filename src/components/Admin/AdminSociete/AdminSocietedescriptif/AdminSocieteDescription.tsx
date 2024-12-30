import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useRef } from 'react';
import { Facebook, Instagram, Link as LinkIcone } from 'react-feather';

import { AppDispatch, RootState } from '../../../store/store';
import updateUser from '../../../../api/directus/user/updateUser';
import {
  actionChangeUserLinkFacebook,
  actionChangeUserLinkInstagram,
  actionChangeUserLinkWeb,
  actionChangeUserTextDescription,
} from '../../../store/actionCreator';

interface ITinyMCEInstance {
  getContent: () => string;
}

const AdminSocieteDescription = () => {
  const dispatch: AppDispatch = useDispatch();
  const editorRef = useRef<ITinyMCEInstance | null>(null);
  const user = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
    if (userData) {
      dispatch(actionChangeUserLinkWeb(userData.link_web));
      dispatch(actionChangeUserLinkFacebook(userData.link_facebook));
      dispatch(actionChangeUserLinkInstagram(userData.link_instagram));
      dispatch(actionChangeUserTextDescription(userData.text_description));
    }
  }, [dispatch]);

  const handleChangeTextDesciption = () => {
    if (editorRef.current) {
      dispatch(actionChangeUserTextDescription(editorRef.current.getContent()));
      dispatch(
        updateUser({
          name: 'text_description',
          value: editorRef.current.getContent(),
        })
      );
    }
  };
  const handleClickSendDescription = () => {
    dispatch(updateUser({ name: 'link_web', value: user.linkWeb }));
    dispatch(updateUser({ name: 'link_facebook', value: user.linkFacebook }));
    dispatch(updateUser({ name: 'link_instagram', value: user.linkInstagram }));
    dispatch(updateUser({ name: 'text_description', value: user.textDescription }));
  };
  // Gestion de l'input dynamique pour chaque lien
  const handleChangeLink = (event: ChangeEvent<HTMLInputElement>, linkType: string) => {
    const { value } = event.target;
    if (linkType === 'web') {
      dispatch(actionChangeUserLinkWeb(value));
    } else if (linkType === 'facebook') {
      dispatch(actionChangeUserLinkFacebook(value));
    } else if (linkType === 'instagram') {
      dispatch(actionChangeUserLinkInstagram(value));
    }
  };

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Présentation de votre société</h1>
      </header>
      <section className="w-11/12 m-auto mt-20 mb-4">
        <p className="mb-4 ml-4">Rédigez quelques lignes expliquant votre activité et les points forts de votre société.</p>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={
            user.textDescription ||
            '<h3><strong class="custom-strong">Présentation de votre société</strong><br></h3> <p>Rédigez quelques lignes expliquant votre activité et les points forts de votre société.</p>'
          }
          onBlur={handleChangeTextDesciption}
          init={{
            language: 'fr_FR',
            height: 400,
            menubar: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:12px }',
            placeholder: 'Vos informations ici...',
            forced_root_block: 'div',
          }}
        />
      </section>
      <section className="w-10/12 m-auto mt-10 mb-4">
        <div className="mt-2 flex">
          <div className="flex shrink-0 items-center gap-x-1.5 rounded-l-md bg-brown text-white px-6 py-2 text-sm font-semibold">
            <LinkIcone className="w-6 h-6 text-white" />
          </div>
          <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
            <input
              type="text"
              onChange={(e) => handleChangeLink(e, 'web')}
              onBlur={handleClickSendDescription}
              value={user.linkWeb}
              placeholder="Lien de votre site internet : https://www.votresite.com"
              className="col-start-1 row-start-1 block w-full rounded-r-md bg-white py-1.5 pl-5 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown sm:pl-9 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="flex shrink-0 items-center gap-x-1.5 rounded-l-md bg-brown text-white px-6 py-2 text-sm font-semibold">
            <Facebook className="w-6 h-6 text-white" />
          </div>
          <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
            <input
              type="text"
              onChange={(e) => handleChangeLink(e, 'facebook')}
              onBlur={handleClickSendDescription}
              value={user.linkFacebook}
              placeholder="Lien de votre facebook : https://www.facebook.com/groups/..."
              className="col-start-1 row-start-1 block w-full rounded-r-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown sm:pl-9 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="flex shrink-0 items-center gap-x-1.5 rounded-l-md bg-brown text-white px-6 py-2 text-sm font-semibold">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
            <input
              type="text"
              onChange={(e) => handleChangeLink(e, 'instagram')}
              onBlur={handleClickSendDescription}
              value={user.linkInstagram}
              placeholder="Lien de votre instagram : https://www.instagram.com/..."
              className="col-start-1 row-start-1 block w-full rounded-r-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown sm:pl-9 sm:text-sm/6"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminSocieteDescription;
