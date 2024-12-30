import logo from '../../../public/logo.webp';

const AdminNavPhotos = () => {
  return (
    <div className=" w-5/6 m-auto">
      <section className="flex flex-col items-center justify-center mt-4 border-2 border-black rounded-lg">
        <div className="flex justify-center items-center h-16 gap-6 pt-1 pb-3 w-5/6">
          <span className="text-lg font-semibold">Bien distinguer</span>
          <img src={logo} alt="Logo" className="h-10 w-10" />
        </div>

        <div className="flex justify-start py-4 w-4/5 items-center h-16 border-t-2 border-zinc-300">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-xl ml-4 border-4 border-brown p-0.5" />
          <div className="w-4/5 ml-8">Photo validée</div>
        </div>
        <div className="flex justify-start py-4 w-4/5 items-center h-16 border-t-2 border-zinc-300">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-xl ml-4 border-4 border-orange-500 p-0.5" />
          <div className="w-4/5 ml-8">Photo en cours</div>
        </div>
        <div className="flex justify-start py-4 w-4/5 items-center h-16 border-t-2 border-zinc-300">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-xl ml-4 border-4 border-red-500 p-0.5" />
          <div className="w-4/5 ml-8">Photo refusée</div>
        </div>
      </section>
    </div>
  );
};

export default AdminNavPhotos;
