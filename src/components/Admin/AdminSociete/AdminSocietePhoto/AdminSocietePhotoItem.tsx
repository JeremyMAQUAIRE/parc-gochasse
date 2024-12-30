import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { AppDispatch, RootState } from '../../../store/store';
import logo from '../../../../../public/logo.webp';
import sendFile from '../../../../api/directus/file/sendFile';
import deleteFile from '../../../../api/directus/file/deleteFile';
import updateUser from '../../../../api/directus/user/updateUser';
import readCurrentUser from '../../../../api/directus/user/readCurrentUser';

interface IDataPhoto {
  idPhoto: string;
  namePhoto: string;
  type: string;
  nameStatus: string;
  status: string;
  label: string;
}

const AdminSocietePhotoItem = ({ idPhoto, namePhoto, type, nameStatus, status, label }: IDataPhoto) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer);
  const [isFormatPhoto, setIsFormatPhoto] = useState<boolean>(false);
  const [color, setColor] = useState<string>('false');
  const [imageUrl, setImageUrl] = useState<string>(() => {
    if (idPhoto !== '') {
      return `https://api.gochasse.com/assets/${idPhoto}?access_token=${Cookies.get('tokenJWT')}`;
    }
    return logo;
  });

  useEffect(() => {
    if (status === 'en cours') {
      setColor('border-orange-500');
    } else if (status === 'validée') {
      setColor('border-brown');
    } else if (status === 'refusée') {
      setColor('border-red-500');
    } else {
      setColor('false');
    }
  }, [status]);

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const modifiedTitle = `${user.name}_${user.firstname}${namePhoto}`;

    if (file) {
      const generatedFile = new File([file], modifiedTitle, {
        type: file.type,
      });
      const fileExtension = file.name ? file.name.split('.').pop() : null;

      if (
        // extension verification
        fileExtension !== 'png' &&
        fileExtension !== 'jpg' &&
        fileExtension !== 'jpeg'
      ) {
        setIsFormatPhoto(true);
      } else {
        // prevusalition management
        setIsFormatPhoto(false);
        const reader = new FileReader();
        reader.onloadend = () => {
          const url = reader.result as string;
          setImageUrl(url);
        };
        reader.readAsDataURL(file);
        if (idPhoto === '') {
          // create picture in db
          await dispatch(sendFile({ files: [generatedFile], type }));
          setColor('border-orange-500');
        } else {
          // update picture in db
          await dispatch(deleteFile({ id: idPhoto, type }));
          await dispatch(sendFile({ files: [generatedFile], type }));
          await dispatch(updateUser({ name: nameStatus, value: 'en cours' }));
          setColor('border-orange-500');
        }
      }
    }
    await dispatch(readCurrentUser());
  };

  return (
    <section className="flex flex-col items-center gap-2">
      <label className="text-lg font-semibold">{label}</label>
      <div>
        <img alt="preview de profil" src={imageUrl} className={`max-w-80 h-52 rounded-xl border-4 ${color}`} />
      </div>
      {isFormatPhoto && <p className="text-red-600 text-sm italic">Format invalide ! (jpg, jpeg ou png)</p>}
      <input
        type="file"
        onChange={handlePhotoChange}
        className="w-80 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-brown focus:border-brown"
      />
    </section>
  );
};

export default AdminSocietePhotoItem;
