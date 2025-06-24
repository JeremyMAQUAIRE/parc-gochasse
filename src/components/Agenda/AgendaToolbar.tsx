import { List, Plus } from 'react-feather';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale/fr';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import StripeLogo from '../../../public/stripe-2.svg';

import AgendaTime from './AgendaTime';
import calendar from '../../../public/calendar.webp';
import DialogCreateEvent from '../Admin/AdminAgenda/AdminAgendaEvenement/DialogCreateEvent';
import { AppDispatch, RootState } from '../store/store';
import { actionClickDialogCreateEvent } from '../store/actionCreator';
import IParc from '../../@types/parc';
import readAllGestionParcByUser from '../../api/directus/parc/readAllGestionParcByUser';
import readDashboardStripe from '../../api/stripe/readDashboardStripe';

registerLocale('fr', fr);
setDefaultLocale('fr');

const AgendaToolbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const dialogOpen = useSelector((state: RootState) => state.dialogReducer);
  const parcs: IParc[] = useSelector((state: RootState) => state.parcReducer.data);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setdateSelected] = useState<Date>(new Date());

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      (e.currentTarget as HTMLButtonElement).click();
      setShowDatePicker(false);
    }
  };
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      localStorage.setItem('displayCurrentDate', formattedDate);
      setdateSelected(date);
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(readAllGestionParcByUser());
  }, [dispatch]);

  return (
    <section className="h-20 m-auto flex justify-between items-center">
      <div className="flex items-center gap-3 relative z-50">
        <button
          type="button"
          className="homeParcAgendaToolbar-content_calendar_button disabled:opacity-30"
          onClick={() => {
            if (!dialogOpen.dialogCreateEvent) setShowDatePicker(!showDatePicker);
          }}
          onKeyDown={(e) => {
            if (!dialogOpen.dialogCreateEvent) handleKeyDown(e);
          }}
          tabIndex={dialogOpen.dialogCreateEvent ? -1 : 0}
          disabled={dialogOpen.dialogCreateEvent}
        >
          <img src={calendar} alt="Icone de calendrier" className="w-12 h-12 opacity-100 disabled:opacity-30" />
        </button>
        {/* DatePicker à côté du bouton du calendrier */}
        {showDatePicker && (
          <DatePicker
            selected={dateSelected}
            onChange={handleDateChange}
            locale="fr"
            className="w-32 h-8 border border-gray-300 text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
            dateFormat="dd/MM/yyyy"
          />
        )}
      </div>

      <div className="flex flex-1 justify-center items-center">
        {parcs.length !== 0 &&
          parcs.map((parc: IParc, index: number) => (
            <NavLink
              key={parc.id}
              to={`/agenda/${parc.slug}`}
              className={({ isActive }) => {
                const baseClass = 'py-3 px-5 font-semibold';
                const activeClass = isActive ? 'bg-brown text-white' : 'bg-zinc-300';
                let roundedClass = '';
                if (index === 0) {
                  roundedClass = 'rounded-l-lg';
                } else if (index === parcs.length - 1) {
                  roundedClass = 'rounded-r-lg';
                }
                return `${baseClass} ${activeClass} ${roundedClass}`;
              }}
            >
              {parc.name}
            </NavLink>
          ))}
      </div>

      <div className="flex items-center gap-2">
        <AgendaTime />
        <button
          type="button"
          onClick={() => dispatch(actionClickDialogCreateEvent(true))}
          className="w-14 h-14 p-3 bg-brown flex justify-center items-center border-4 border-black rounded-xl hover:scale-110"
        >
          <Plus className="w-10 h-10 text-white" />
        </button>
        <button
          type="button"
          onClick={() => {
            navigate('/administration/evenements');
          }}
          className="w-14 h-14 p-3 bg-brown flex justify-center items-center border-4 border-black rounded-xl hover:scale-110"
        >
          <List className="w-10 h-10 text-white" />
        </button>
        <button type="button" onClick={() => dispatch(readDashboardStripe())}>
          <img
            src={StripeLogo}
            alt="Stripe"
            className="w-14 h-14 bg-[#8BB7F0] flex justify-center items-center border-4 border-black rounded-xl hover:scale-110"
          />
        </button>
      </div>
      {dialogOpen.dialogCreateEvent && <DialogCreateEvent />}
    </section>
  );
};

export default AgendaToolbar;
