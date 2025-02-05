import { Mail } from 'react-feather';

interface IUserListSearch {
  mailList: string[];
  setSearch: (arg: string) => void;
}

const UserListSearch = ({ mailList, setSearch }: IUserListSearch) => {
  const proMail = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;

  const nbreResult = mailList.length;

  return (
    <section className="flex w-11/12 justify-between my-4 mx-auto">
      <div className="w-8/12 m-auto flex flex-col gap-3 bg-zinc-300 py-3 rounded-lg">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-8/12 m-auto py-1 pl-2 rounded-lg text-lg outline-green-600 focus:outline"
          placeholder="Recherche d'un utilisateur par le nom"
        />
        <div className="w-8/12 text-center m-auto text-2xl text-brown font-semibold">Membre(s) enregistré(s) : {nbreResult}</div>
      </div>

      <div className="flex flex-1 flex-col gap-2 justify-center items-end">
        <a
          href={`mailto:${proMail && proMail.email}?bcc=${mailList.join(';')}`}
          className="flex items-center justify-center gap-4 w-80 py-2 rounded-lg text-white font-semibold bg-zinc-400 hover:scale-110"
        >
          <Mail className="text-brown" /> Envoyer un mail groupe
        </a>
      </div>
    </section>
  );
};

export default UserListSearch;
