import AdminCartesFiles from './AdminCartesFiles';
import AdminCartesTable from './AdminCartesTable';

const AdminCartes = () => {
  return (
    <section className="fixed w-[calc(100%-373px)] h-full overflow-scroll">
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Gestion des cartes de chasse</h1>
      </header>
      <div className="w-11/12 m-auto mt-20 mb-20">
        <p>
          Assignez une carte de chasse à un membre de votre équipe. L&apos;utilisateur pourra ensuite la télécharger au format numérique depuis son
          profil GoChasse.
        </p>

        <AdminCartesFiles />

        {/* Tableau des cartes de chasse */}
        <h2 className="font-bold text-xl mt-4"> Liste des cartes envoyées</h2>
        <AdminCartesTable />
      </div>
    </section>
  );
};

export default AdminCartes;
