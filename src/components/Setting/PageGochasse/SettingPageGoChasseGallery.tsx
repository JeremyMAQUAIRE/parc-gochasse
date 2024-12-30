import logo from '../../../../public/logo.webp';

const SettingPageGoChasseGallery = () => {
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;

  const illustrationOne =
    userData.status_photo_illustrataion_one === 'validée' ? `https://api.gochasse.com/assets/${userData.id_photo_illustration_one}` : logo;
  const illustrationtwo =
    userData.status_photo_illustrataion_two === 'validée' ? `https://api.gochasse.com/assets/${userData.id_photo_illustration_two}` : logo;
  const illustrationthree =
    userData.status_photo_illustrataion_three === 'validée' ? `https://api.gochasse.com/assets/${userData.id_photo_illustration_three}` : logo;

  return (
    <section className="w-7/12 h-72 flex flex-col justify-center items-center gap-2">
      <div className="flex gap-2">
        <img src={illustrationOne} alt="Illustration 1" className="h-60 rounded-2xl max-w-1/3" />

        <img src={illustrationtwo} alt="Illustration 2" className="h-60 rounded-2xl max-w-1/3" />

        <img src={illustrationthree} alt="Illustration 3" className="h-60 rounded-2xl max-w-1/3" />
      </div>
    </section>
  );
};

export default SettingPageGoChasseGallery;
