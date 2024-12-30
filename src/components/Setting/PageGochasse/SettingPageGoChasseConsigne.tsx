import { Editor } from '@tinymce/tinymce-react';

const SettingPageGoChasseConsigne = () => {
  const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;

  return (
    <div className="mt-5">
      <Editor
        disabled
        apiKey={import.meta.env.VITE_TINYMCE}
        initialValue={user.text_consigne}
        init={{
          plugins: 'autoresize',
          language: 'fr_FR',
          menubar: false,
          toolbar: false,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:12px }',
        }}
      />
    </div>
  );
};

export default SettingPageGoChasseConsigne;
