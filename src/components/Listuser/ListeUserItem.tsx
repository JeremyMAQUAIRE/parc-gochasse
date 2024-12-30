import { Eye, Trash2, Upload } from 'react-feather';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import logo from '../../../public/profil_defaut.png';
import { AppDispatch } from '../store/store';
import {
  actionChangeUserFirstname,
  actionChangeUserid,
  actionChangeUserName,
  actionClickDialogDeleteMember,
  actionClickDialogInfoMember,
} from '../store/actionCreator';
import IUserMember from '../../@types/userMember';
import readUsersCardDocumentByIdMember from '../../api/directus/usersCardDocument/readUsersCardDocumentByIdMember';
import ICardUser from '../../@types/userCard';

const ListeUserItem = ({ member }: { member: IUserMember }) => {
  const dispatch: AppDispatch = useDispatch();
  const avatarURL =
    member.user_member.id_avatar !== null
      ? `https://api.gochasse.com/assets/${member.user_member.id_avatar}?access_token=${Cookies.get('tokenJWT')}`
      : logo;

  const [memberDocument, setMemberDocument] = useState<ICardUser[] | null>(null);

  useEffect(() => {
    const fecthmemberDocument = async () => {
      const response = await dispatch(readUsersCardDocumentByIdMember(member.user_member.id));
      setMemberDocument(response.payload);
    };
    fecthmemberDocument();
  }, [dispatch, member.user_member.id]);

  return (
    <section className="w-full scale-95 h-14 flex items-center border-2 border-black rounded-lg mb-2 hover:scale-100 hover:bg-zinc-400">
      <img src={avatarURL} alt="Avatar" className="w-14 h-14 overflow-hidden rounded-l-lg border-y-2 border-black" />

      <div className="relative group">
        <button type="button" className="ml-4 hover:text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        </button>
        <div className="absolute w-auto left-3 bottom-full mb-1 hidden group-hover:block">
          <div className="relative w-auto bg-brown text-white text-base/3 rounded-md shadow-lg inline-block z-50">
            {memberDocument &&
              memberDocument.map((doc, index) => {
                let roundedClass = '';
                if (index === 0) {
                  roundedClass = 'rounded-t-md';
                } else if (index === memberDocument.length - 1) {
                  roundedClass = 'rounded-b-md';
                }

                return (
                  <a
                    key={doc.document.id}
                    href={`https://api.gochasse.com/assets/${doc.document.id}?download`}
                    download={doc.document.id}
                    rel="noopener noreferrer"
                    className={`relative flex gap-2 h-7 px-4 py-2 items-center hover:bg-green-800 ${roundedClass} hover:italic z-20`} // Définir relative et z-20
                  >
                    <Upload className="w-5 h-5" />
                    <p
                      className="whitespace-nowrap text-ellipsis"
                      title={doc.document.filename_download} // Affiche le nom complet au survol
                    >
                      {doc.document.filename_download}
                    </p>
                  </a>
                );
              })}
            <div className="absolute left-2 bottom-0 w-4 h-4 bg-brown transform rotate-45 translate-y-1/2 z-10" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 ml-4 font-semibold">
        {member.user_member.last_name.toUpperCase()} {member.user_member.first_name}
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(actionChangeUserid(member.user_member.id));
          dispatch(actionClickDialogInfoMember(true));
        }}
      >
        <Eye className="mx-4 hover:text-brown" />
      </button>

      <button
        type="button"
        onClick={() => {
          dispatch(actionClickDialogDeleteMember(true));
          dispatch(actionChangeUserid(member.id.toString()));
          dispatch(actionChangeUserName(member.user_member.last_name));
          dispatch(actionChangeUserFirstname(member.user_member.first_name));
        }}
      >
        <Trash2 className="mx-4 hover:text-red-500" />
      </button>
    </section>
  );
};

export default ListeUserItem;
