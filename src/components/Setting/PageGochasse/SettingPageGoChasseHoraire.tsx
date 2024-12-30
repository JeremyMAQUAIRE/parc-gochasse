const SettingPageGoChasseHoraire = () => {
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;

  if (!userData || !userData.open_day || !userData.close_day) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-4">
        <p className="text-red-500">Les données de période sont manquantes ou invalides.</p>
      </div>
    );
  }

  // Créer des objets Date à partir des chaînes de date ISO
  const openDate = new Date(userData.open_day);
  const closeDate = new Date(userData.close_day);

  const options: { day: '2-digit'; month: 'long'; year: 'numeric' } = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-4">
      <div>
        <p>
          <span className="text-xl underline font-semibold mr-2">Période:</span>
          {openDate.toLocaleDateString('fr-FR', options)} - {closeDate.toLocaleDateString('fr-FR', options)}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-5">
        <p className="text-lg font-semibold mr-2">Jour d&apos;ouverture:</p>
        {userData.monday_day && <p className="font-semibold px-6 py-1 mr-2 border-2 rounded-lg border-zinc-500 bg-brown text-white">Lundi</p>}
        {userData.tuesday_day && <p className="font-semibold px-6 py-1 mr-2 border-2 rounded-lg border-zinc-500 bg-brown text-white">Mardi</p>}
        {userData.wednesday_day && <p className="font-semibold px-6 py-1 mr-2 border-2 rounded-lg border-zinc-500 bg-brown text-white">Mercredi</p>}
        {userData.thursday_day && <p className="font-semibold px-6 py-1 mr-2 border-2 rounded-lg border-zinc-500 bg-brown text-white">Jeudi</p>}
        {userData.friday_day && <p className="font-semibold px-6 py-1 mr-2 border-2 rounded-lg border-zinc-500 bg-brown text-white">Vendredi</p>}
        {userData.saturday_day && <p className="font-semibold px-6 py-1 mr-2 border-2 rounded-lg border-zinc-500 bg-brown text-white">Samedi</p>}
        {userData.sunday_day && <p className="font-semibold px-6 py-1 mr-2 border-2 rounded-lg border-zinc-500 bg-brown text-white">Dimanche</p>}
      </div>
      <div className="mt-5">
        {userData.monday_day && (
          <p className="flex items-center">
            <span className="text-lg font-semibold mr-2 w-28 block">Lundi</span>
            {userData.mondayHour_open} - {userData.mondayHour_close}
          </p>
        )}
        {userData.tuesday_day && (
          <p className="flex items-center">
            <span className="text-lg font-semibold mr-2 w-28 block">Mardi</span>
            {userData.tuesdayHour_open} - {userData.tuesdayHour_close}
          </p>
        )}
        {userData.wednesday_day && (
          <p className="flex items-center">
            <span className="text-lg font-semibold mr-2 w-28 block">Mercredi</span>
            {userData.wednesdayHour_open} - {userData.wednesdayHour_close}
          </p>
        )}
        {userData.thursday_day && (
          <p className="flex items-center">
            <span className="text-lg font-semibold mr-2 w-28 block">Jeudi</span>
            {userData.thursdayHour_open} - {userData.thursdayHour_close}
          </p>
        )}
        {userData.friday_day && (
          <p className="flex items-center">
            <span className="text-lg font-semibold mr-2 w-28 block">Vendredi</span>
            {userData.fridayHour_open} - {userData.fridayHour_close}
          </p>
        )}
        {userData.saturday_day && (
          <p className="flex items-center">
            <span className="text-lg font-semibold mr-2 w-28 block">Samedi</span>
            {userData.saturdayHour_open} - {userData.saturdayHour_close}
          </p>
        )}
        {userData.sunday_day && (
          <p className="flex items-center">
            <span className="text-lg font-semibold mr-2 w-28 block">Dimanche</span>
            {userData.sundayHour_open} - {userData.sundayHour_close}
          </p>
        )}
      </div>
    </div>
  );
};

export default SettingPageGoChasseHoraire;
