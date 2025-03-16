import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../store/store';
import updateUser from '../../../../api/directus/user/updateUser';
import { actionChangeUserTextConsigne } from '../../../store/actionCreator';

interface ITinyMCEInstance {
  getContent: () => string;
}

const AdminSocieteConsigne = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer);
  const editorRef = useRef<ITinyMCEInstance | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
    if (userData) {
      dispatch(actionChangeUserTextConsigne(userData.text_consigne));
    }
  }, [dispatch]);

  const handleChangeTextDesciption = () => {
    if (editorRef.current) {
      dispatch(actionChangeUserTextConsigne(editorRef.current.getContent()));
      dispatch(
        updateUser({
          name: 'text_consigne',
          value: editorRef.current.getContent(),
        })
      );
    }
  };

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Gérer les consignes</h1>
      </header>
      <section className="w-11/12 m-auto mt-20 mb-4">
        <p className="mb-4 ml-4">Ce message sera affiché sur votre page GoChasse et avant la confirmation d&apos;une prise de rendez-vous.</p>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={
            user.textConsigne ||
            '<h3><strong class="custom-strong">Règles et consignes de votre société</strong><br></h3> <p>Rédigez quelques lignes expliquant votre activité et les points forts de votre parc ou société.</p>'
          }
          onBlur={handleChangeTextDesciption}
          init={{
            language: 'fr_FR',
            height: 600,
            menubar: false,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:12px }',
            placeholder: 'Vos informations ici...',
            forced_root_block: 'div',
          }}
        />
      </section>
    </div>
  );
};

export default AdminSocieteConsigne;
