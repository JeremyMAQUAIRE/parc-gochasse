import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import AdminNav from './AdminNav';
import AdminAgendaEvenement from './AdminAgenda/AdminAgendaEvenement/AdminAgendaEvenement';
import AdminSocietePhoto from './AdminSociete/AdminSocietePhoto/AdminSocietePhoto';
import AdminSocieteDescription from './AdminSociete/AdminSocietedescriptif/AdminSocieteDescription';
import AdminSocieteNotification from './AdminSociete/AdminSocieteNotificationRDV/AdminSocieteNotification';
import AdminSocieteHoraireDelai from './AdminSociete/AdminSocieteHoraireDelai/AdminSocieteHoraireDelai';
import AdminSocieteConsigne from './AdminSociete/AdminSocieteConsigne/AdminSocieteConsigne';
import AdminStatMessageRevenu from './AdminStatMessage/AdminStatMessageRevenu/AdminStatMessageRevenu';
import AdminStatMessageMail from './AdminStatMessage/AdminStatMessageMail/AdminStatMessageMail';
import AdminAgendaPrestation from './AdminAgenda/AdminAgendaPrestation/AdminAgendaPrestation';

const Admin = () => {
  const navigate = useNavigate();
  const link = useParams();

  useEffect(() => {
    if (link.menuAdmin === undefined) {
      navigate('/administration/prestations');
    }
  });

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-1">
        {link.menuAdmin === 'prestations' && <AdminAgendaPrestation />}
        {link.menuAdmin === 'evenements' && <AdminAgendaEvenement />}
        {link.menuAdmin === 'photos' && <AdminSocietePhoto />}
        {link.menuAdmin === 'description' && <AdminSocieteDescription />}
        {link.menuAdmin === 'notification' && <AdminSocieteNotification />}
        {link.menuAdmin === 'horaires-délais' && <AdminSocieteHoraireDelai />}
        {link.menuAdmin === 'consigne' && <AdminSocieteConsigne />}
        {link.menuAdmin === 'chiffre-affaire' && <AdminStatMessageRevenu />}
        {link.menuAdmin === 'email' && <AdminStatMessageMail />}
      </div>
    </div>
  );
};

export default Admin;
