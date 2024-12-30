import AdminSocietePhotoItem from './AdminSocietePhotoItem';

const AdminSocietePhoto = () => {
  const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;

  return (
    <div className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Gérer vos photos de présentation</h1>
      </header>
      <div className="w-11/12 m-auto flex items-center justify-center h-full">
        <div className="w-2/5">
          <AdminSocietePhotoItem
            label="Photo de profil"
            idPhoto={user.id_photo_profil}
            status={user.status_photo_profil}
            namePhoto="_Photo de Profil"
            type="ParcPhotoProfil"
            nameStatus="status_photo_profil"
          />
        </div>
        <div className="flex flex-wrap gap-10 justify-center w-3/5">
          <div>
            <AdminSocietePhotoItem
              label=" Photo d'illustration - 1"
              idPhoto={user.id_photo_illustration_one}
              status={user.status_photo_illustrataion_one}
              namePhoto="_Photo d'illustration 1"
              type="ParcPhotoIllustration1"
              nameStatus="status_photo_illustrataion_one"
            />
          </div>
          <div>
            <AdminSocietePhotoItem
              label=" Photo d'illustration - 2"
              idPhoto={user.id_photo_illustration_two}
              status={user.status_photo_illustrataion_two}
              namePhoto="_Photo d'illustration 2"
              type="ParcPhotoIllustration2"
              nameStatus="status_photo_illustrataion_two"
            />
          </div>
          <div>
            <AdminSocietePhotoItem
              label=" Photo d'illustration - 3"
              idPhoto={user.id_photo_illustration_three}
              status={user.status_photo_illustrataion_three}
              namePhoto="_Photo d'illustration 3"
              type="ParcPhotoIllustration3"
              nameStatus="status_photo_illustrataion_three"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSocietePhoto;
