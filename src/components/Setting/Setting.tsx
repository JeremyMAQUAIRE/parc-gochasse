import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import SettingNav from './SettingNav';
import SettingContact from './SettingContact';
import SettingCgu from './SettingCgu';
import SettingPageGoChasse from './PageGochasse/SettingPageGoChasse';

const Setting = () => {
  const navigate = useNavigate();
  const link = useParams();

  useEffect(() => {
    if (link.menuSetting === undefined) {
      navigate('/parametres/ma-page');
    }
  });

  return (
    <div className="flex">
      <SettingNav />
      <div>
        {!link.menuSetting && <SettingPageGoChasse />}
        {link.menuSetting === 'ma-page' && <SettingPageGoChasse />}
        {link.menuSetting === 'contact' && <SettingContact />}
        {link.menuSetting === 'condition-general-utilisation' && <SettingCgu />}
      </div>
    </div>
  );
};

export default Setting;
