import SettingPageGoChasseGallery from './SettingPageGoChasseGallery';
import SettingPageGoChasseIdentity from './SettingPageGoChasseIdentity';
import SettingPageGoChasseMenu from './SettingPageGoChasseMenu';

const SettingPageGoChasse = () => {
  return (
    <section className="fixed w-[calc(100%-373px)] mt-4 overflow-scroll">
      <div className="flex flex-col w-11/12 mx-auto">
        <div className="flex gap-2">
          <SettingPageGoChasseIdentity />
          <SettingPageGoChasseGallery />
        </div>
        <SettingPageGoChasseMenu />
      </div>
    </section>
  );
};

export default SettingPageGoChasse;
