import logo from '../../../public/logo_full.webp';

const BadResolution = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center bg-[#191919]">
      <img src={logo} alt="Logo" className="w-80 h-50" />
      <div className="text-brown text-xl font-semibold w-full text-center">Oups, résolution d&apos;écran non supportée.</div>
    </div>
  );
};

export default BadResolution;
