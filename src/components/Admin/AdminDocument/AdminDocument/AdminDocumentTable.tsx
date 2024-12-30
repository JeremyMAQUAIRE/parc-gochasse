import { Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { AppDispatch, RootState } from '../../../store/store';
import readUsersCardDocumentByIdPro from '../../../../api/directus/usersCardDocument/readUsersCardDocumentByIdPro';
import { actionClickDialogDeleteDocument } from '../../../store/actionCreator';
import ICardUser from '../../../../@types/userCard';
import DialogDeleteDocument from './DialogDeleteDocument';

const AdminDocumentTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const dialog = useSelector((state: RootState) => state.dialogReducer.dialogDeleteDocument);
  const cards = useSelector((state: RootState) => state.ListDocument.listCard);
  const [docDelete, setDocDelete] = useState<ICardUser | null>(null);

  useEffect(() => {
    dispatch(readUsersCardDocumentByIdPro(false));
  }, [dispatch]);

  return (
    <div className="mt-4 overflow-x-auto bg-white rounded-lg shadow-lg max-h-[15.5rem] overflow-y-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Nom et Prénom</th>
            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Nom du fichier</th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700">Lien de téléchargement</th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700">Date de création</th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((item) => (
            <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-sm text-gray-700">
                {item.user_id.last_name.toUpperCase()}{' '}
                {item.user_id.first_name.charAt(0).toUpperCase() + item.user_id.first_name.slice(1).toLowerCase()}
              </td>
              <td className="py-3 px-6 text-sm text-gray-700">{item.document.filename_download}</td>
              <td className="py-3 text-center px-6 text-sm text-gray-700">
                <a
                  href={`https://api.gochasse.com/assets/${item.document.id}?download`}
                  download={item.document.filename_download}
                  className="text-black hover:text-brown hover:underline hover:font-semibold"
                  rel="noopener noreferrer"
                >
                  Télécharger
                </a>
              </td>
              <td className="py-3 px-6 text-center text-sm text-gray-700">
                {new Date(item.date_created).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </td>
              <td className="py-3 px-6 flex items-center justify-center text-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(actionClickDialogDeleteDocument(true));
                    setDocDelete(item);
                  }}
                >
                  <Trash2 className="hover:text-red-600 hover:cursor-pointer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {dialog && <DialogDeleteDocument docDelete={docDelete} />}
    </div>
  );
};

export default AdminDocumentTable;
