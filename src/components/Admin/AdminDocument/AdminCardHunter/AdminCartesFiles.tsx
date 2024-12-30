import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRef, ChangeEvent, DragEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../store/store';
import sendFile from '../../../../api/directus/file/sendFile';
import readUserSocietyMemberByUserId from '../../../../api/directus/userSocietyMember/readUserSocietyMemberByUserId';
import checkIfFileExists from '../../../../api/directus/file/checkIfFileExists';
import AdminCartesSendSuccess from '../AdminCartesSendSuccess';
import readUsersCardDocumentByIdPro from '../../../../api/directus/usersCardDocument/readUsersCardDocumentByIdPro';

interface IdataImage {
  files: (File | null)[];
  type: string;
  idUser?: string;
}

const AdminCartesFiles = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
  const usersMembers = useSelector((state: RootState) => state.ListUserReducer.listMembers);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [fileValue, setFileValue] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const [idUser, setIdUser] = useState<string | undefined>('');
  const [fileExtensionValid, setFileExtensionValid] = useState(true);
  const [isFileValid, setIsFileValid] = useState(false);
  const [isFileNameExist, setIsFileNameExist] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    setSelectedYear(currentMonth < 5 ? `${currentYear - 1}_${currentYear}` : `${currentYear}-${currentYear + 1}`);
  }, []);
  useEffect(() => {
    dispatch(readUserSocietyMemberByUserId());
  }, [dispatch]);
  useEffect(() => {
    const checkIfFileExist = async () => {
      const response = await dispatch(
        checkIfFileExists(`${fileValue}_carte_de_chasse_${selectedYear}_${userData?.business_name.replace(/\s+/g, '_')}`)
      );
      setIsFileNameExist(response.payload.data.length > 0);
    };
    checkIfFileExist();
  }, [fileValue, selectedYear, fileExtension, userData?.business_name, dispatch, isFileNameExist]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const extension = file.name.split('.').pop();
    const isValid = ['pdf', 'png', 'jpg'].includes(extension?.toLowerCase() || '');
    setFileName(file.name);
    setFileExtension(extension?.toLowerCase() || '');
    setFileExtensionValid(isValid);
    setIsFileValid(isValid);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    const extension = file.name.split('.').pop();
    const isValid = ['pdf', 'png', 'jpg'].includes(extension?.toLowerCase() || '');
    setFileName(file.name);
    setFileExtension(extension?.toLowerCase() || '');
    setFileExtensionValid(isValid);
    setIsFileValid(isValid);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleClick = () => fileInputRef.current?.click();

  const resetForm = () => {
    setFileName('');
    setSelectedYear('');
    setFileValue('');
    setFileExtension('');
    setFileExtensionValid(true);
    setIsFileNameExist(false);
    setIsFileValid(false);
    setIdUser('');
  };

  const handleSubmit = async () => {
    if (!fileInputRef.current?.files || !fileInputRef.current.files[0]) return;

    const originalFile = fileInputRef.current.files[0];
    const newFileName = `${fileValue}_carte_de_chasse_${selectedYear}_${userData?.business_name.replace(/\s+/g, '_')}.${fileExtension}`;
    const renamedFile = new File([originalFile], newFileName, {
      type: originalFile.type,
    });
    const data: IdataImage = {
      files: [renamedFile],
      type: 'CarteChasse',
      idUser,
    };

    await dispatch(sendFile(data));
    await dispatch(readUserSocietyMemberByUserId());
    await dispatch(readUsersCardDocumentByIdPro(true));
    setShow(true);
    resetForm();
  };

  const disabled = !isFileValid || !fileValue || !selectedYear || !fileExtensionValid || isFileNameExist;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFormattedName = (user: any) => {
    const formattedFirstName = user.user_member.first_name
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    return `${user.user_member.last_name.toUpperCase()}_${formattedFirstName}`;
  };

  return (
    <div>
      <div className="mt-6">
        <label htmlFor="teamMember" className="block font-medium text-gray-900">
          Choisir un membre de votre équipe
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="teamMember"
            name="teamMember"
            value={fileValue}
            onChange={(e) => {
              const selectedValue = e.target.value;
              const selectedUserId = usersMembers.find((user) => getFormattedName(user) === selectedValue)?.user_member.id;
              setFileValue(selectedValue);
              setIdUser(selectedUserId);
            }}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown sm:text-sm/6"
          >
            <option value="">Choisir un membre</option>
            {usersMembers?.map((user) => (
              <option key={user.user_member.id} value={getFormattedName(user)}>
                {`${user.user_member.last_name.toUpperCase()} ${user.user_member.first_name}`}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="year" className="block font-medium text-gray-900">
          Choisir l&apos;année d&apos;édition de la carte de chasse
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="year"
            name="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value.replace(/\s+/g, '_'))}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brown sm:text-sm/6"
          >
            <option value="">Choisir une année</option>
            <option value={`${new Date().getFullYear()}_${new Date().getFullYear() + 1}`}>{`${new Date().getFullYear()}-${
              new Date().getFullYear() + 1
            }`}</option>
            <option value={`${new Date().getFullYear() + 1}_${new Date().getFullYear() + 2}`}>{`${new Date().getFullYear() + 1}-${
              new Date().getFullYear() + 2
            }`}</option>
          </select>
          <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="file-upload" className="block font-medium text-gray-900">
          Télécharger une carte de chasse
        </label>
        <div
          role="button"
          tabIndex={0}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
          onKeyUp={(e) => (e.key === 'Enter' || e.key === ' ' ? handleClick() : null)}
          className="mt-2 p-6 border-2 border-dashed border-brown rounded-md bg-gray-50 text-center cursor-pointer"
        >
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          <p className="text-gray-600">Glissez et déposez un fichier ou cliquez pour sélectionner (formats acceptés: pdf, png, jpg)</p>
          {fileName && <p className="mt-2 text-sm text-gray-500">Nom du fichier : {fileName}</p>}
          {!fileExtensionValid && <p className="text-red-500 mt-2 font-semibold">Le format du fichier n&apos;est pas valide !</p>}
        </div>
        {isFileValid && (
          <p className="my-2 italic">
            Nom du fichier après validation : {fileValue}_carte_de_chasse_{selectedYear}_{userData?.business_name.replace(/\s+/g, '_')}.
            {fileExtension}
          </p>
        )}
        {isFileNameExist && (
          <p className="my-2 italic text-orange-600 font-bold">Ce fichier existe déjà. Merci de le supprimer avant de le renvoyer.</p>
        )}
      </div>

      <div className="mt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled}
          className="px-2 py-2 w-full rounded-md text-white font-semibold bg-brown hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Valider
        </button>
      </div>
      <AdminCartesSendSuccess show={show} setShow={setShow} />
    </div>
  );
};

export default AdminCartesFiles;
