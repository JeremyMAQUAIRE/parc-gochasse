import BookingDelay from './BookingDelay ';
import CancelDeadline from './CancelDeadline';
import OpeningHour from './OpeningHour';
import OpeningPeriod from './OpeningPeriod';

const AdminSocieteHoraireDelai = () => {
  return (
    <div className="fixed w-[calc(100%-373px)] h-screen overflow-scroll">
      {/* Header */}
      <header className="fixed flex items-center justify-between top-16 left-[373px] w-[calc(100%-373px)] bg-zinc-200 h-16 px-12 border-b-[1px] border-gray-400 z-10">
        <h1 className="text-2xl">Gérer les horaires et délais</h1>
      </header>

      {/* Content */}
      <div className="overflow-y-auto max-h-full mt-4 mb-20 pt-16 pb-4">
        <section className="w-11/12 m-auto mt-4 mb-4">
          <div className="adminParcNotificationRdv-content_body_section">
            <h2 className="font-semibold underline text-lg">Période d&apos;ouverture</h2>
            <OpeningPeriod />
          </div>
        </section>
        <section className="w-11/12 m-auto mt-10 mb-4">
          <div className="adminParcNotificationRdv-content_body_section">
            <h2 className="font-semibold underline text-lg">Horaire(s) d&apos;ouverture</h2>
            <OpeningHour />
          </div>
        </section>
        <section className="w-11/12 m-auto mt-10 mb-4">
          <div className="adminParcNotificationRdv-content_body_section">
            <h2 className="font-semibold underline text-lg">Délai de prise de RDV en ligne</h2>
            <BookingDelay />
          </div>
        </section>
        <section className="w-11/12 m-auto mt-10 mb-4">
          <div className="adminParcNotificationRdv-content_body_section">
            <h2 className="font-semibold underline text-lg">Délai d&apos;annulation de RDV en ligne</h2>
            <CancelDeadline />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSocieteHoraireDelai;
