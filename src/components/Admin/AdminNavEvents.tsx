import dog from '../../../public/dog.webp';
import hunter from '../../../public/hunter.webp';
import logo from '../../../public/logo.webp';

const AdminNavEvents = () => {
  const currentDate = new Date();

  // Format the date to "Lundi 16 Décembre 2024"
  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    weekday: 'long', // Full name of the day (e.g., Lundi)
    day: 'numeric', // Day of the month
    month: 'long', // Full name of the month (e.g., Décembre)
    year: 'numeric', // Full year (e.g., 2024)
  });

  // Capitalize the first letter of the weekday and month
  const capitalizedDate = formattedDate
    .replace(/^(\w)(\w+)/, (match, p1, p2) => p1.toUpperCase() + p2)
    .replace(/(\s)(\w)(\w+)/, (match, p1, p2, p3) => p1 + p2.toUpperCase() + p3);

  return (
    <div className=" w-5/6 m-auto">
      <section className="flex items-center justify-center bg-brown text-white font-semibold border-2 border-black rounded-lg mt-4 h-10">
        {capitalizedDate}
      </section>
      <section className="flex flex-col items-center justify-center mt-4 border-2 border-black rounded-lg">
        <div className="flex justify-center items-center h-16 gap-6 pt-1 pb-3 border-b-2 border-zinc-300 w-5/6">
          <span className="text-lg font-semibold">Bien distinguer</span>
          <img src={logo} alt="Logo" className="h-10 w-10" />
        </div>
        <div className="flex flex-col justify-center items-center gap-3 pt-1 pb-3 border-b-2 border-zinc-300 w-5/6">
          <div className="flex justify-center gap-2 w-11/12 bg-zinc-400 py-2 rounded-lg mt-2 opacity-50">
            <div className="flex items-center h-10 gap-3 border-4 border-black rounded-md px-2 bg-brown text-white font-semibold">
              <img src={hunter} alt="Chasseur" className="h-6 w-6" />
              <p>
                <span className="text-lg">10</span>/100
              </p>
            </div>
            <div className="flex items-center h-10 gap-3 border-4 border-black rounded-md px-2 bg-brown text-white font-semibold">
              <img src={dog} alt="Chien" className="h-6 w-6" />
              <p>
                <span className="text-lg">10</span>/100
              </p>
            </div>
          </div>
          <div className="text-center text-xs font-semibold w-4/5">
            Evénement <span className="text-red-600">clos</span> avec résultat des participants et chiens.
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 pt-1 pb-3 border-b-2 border-zinc-300 w-5/6">
          <div className="flex justify-center gap-2 w-11/12 py-2 rounded-lg mt-2">
            <div className="flex items-center h-10 gap-3 border-4 border-black rounded-md px-2 text-brown font-semibold">
              <img src={hunter} alt="Chasseur" className="h-6 w-6" />
              <p>
                <span className="text-lg">10</span>/100
              </p>
            </div>
            <div className="flex items-center h-10 gap-3 border-4 border-black rounded-md px-2 text-brown font-semibold">
              <img src={dog} alt="Chien" className="h-6 w-6" />
              <p>
                <span className="text-lg">10</span>/100
              </p>
            </div>
          </div>
          <div className="text-center text-xs font-semibold w-5/6">
            Evénement <span className="text-brown">ouvert</span> avec le nombre de places encore disponible.
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminNavEvents;
