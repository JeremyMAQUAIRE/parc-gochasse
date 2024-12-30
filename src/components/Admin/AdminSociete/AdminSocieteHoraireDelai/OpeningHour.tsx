import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import '../../AdminAgenda/AdminAgendaEvenement/DialogCreateEvent.scss';
import 'react-datepicker/dist/react-datepicker.css';
import updateUser from '../../../../api/directus/user/updateUser';
import { AppDispatch } from '../../../store/store';

// Types pour les props
interface DayButtonProps {
  day: string;
  onClick: (day: string) => void;
  isSelected: boolean;
}

interface TimePickerProps {
  day: string;
  startTime: Date | null;
  endTime: Date | null;
  onStartChange: (date: Date | null) => void;
  onEndChange: (date: Date | null) => void;
  onBlur: (day: string, type: 'open' | 'close', value: string | null) => void;
}

const DayButton: React.FC<DayButtonProps> = ({ day, onClick, isSelected }) => (
  <button
    type="button"
    className={`font-semibold px-6 py-1 mr-2 border-2 rounded-lg border-zinc-500 hover:scale-105 ${
      isSelected ? 'bg-brown text-white' : 'bg-gray-400 text-gray-700'
    }`}
    onClick={() => onClick(day)}
  >
    {day}
  </button>
);

const TimePicker: React.FC<TimePickerProps> = ({ day, startTime, endTime, onStartChange, onEndChange, onBlur }) => {
  return (
    <div className="flex items-center gap-2 dialogCreatePrestation-input mt-2">
      <p className="w-40">{day} : </p>
      <div className="w-[220px]">
        <DatePicker
          selected={startTime}
          onChange={onStartChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Heure"
          dateFormat="HH:mm"
          className="block w-[200px] py-1.5 pl-3 pr-3 text-base text-center text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
          onBlur={() => onBlur(day, 'open', startTime ? startTime.toISOString() : null)} // Mettre à jour à la perte de focus
        />
      </div>
      <span> - </span>
      <div className="w-[220px] ml-5">
        <DatePicker
          selected={endTime}
          onChange={onEndChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Heure"
          dateFormat="HH:mm"
          className="block w-[200px] py-1.5 pl-3 pr-3 text-base text-center text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
          onBlur={() => onBlur(day, 'close', endTime ? endTime.toISOString() : null)} // Mettre à jour à la perte de focus
        />
      </div>
    </div>
  );
};

// Mapping des jours en français vers l'anglais
const dayMapping: Record<string, string> = {
  Lundi: 'monday',
  Mardi: 'tuesday',
  Mercredi: 'wednesday',
  Jeudi: 'thursday',
  Vendredi: 'friday',
  Samedi: 'saturday',
  Dimanche: 'sunday',
};
const mappingDaysItem: Record<string, string> = {
  lundi: 'monday',
  mardi: 'tuesday',
  mercredi: 'wednesday',
  jeudi: 'thursday',
  vendredi: 'friday',
  samedi: 'saturday',
  dimanche: 'sunday',
};

const convertToFranceTime = (date: string | null): string | null => {
  if (!date) return null;

  const dateObj = new Date(date);

  // Utilisation de Intl.DateTimeFormat pour obtenir l'heure en format 'HH:mm' en heure locale (France)
  const options = { hour: '2-digit' as const, minute: '2-digit' as const, timeZone: 'Europe/Paris' };
  const formattedTime = new Intl.DateTimeFormat('fr-FR', options).format(dateObj);

  return formattedTime;
};

const parseTimeStringToDate = (timeString: string | null): Date | null => {
  if (!timeString) return null;

  const [hours, minutes] = timeString.split(':').map(Number);
  const now = new Date();

  // Set the parsed hours and minutes to today's date
  now.setHours(hours, minutes, 0, 0);

  return now;
};

const OpeningHour: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Déclaration de l'état avec les heures pour chaque jour
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  type Hours = {
    mondayHour_open: Date | null;
    mondayHour_close: Date | null;
    tuesdayHour_open: Date | null;
    tuesdayHour_close: Date | null;
    wednesdayHour_open: Date | null;
    wednesdayHour_close: Date | null;
    thursdayHour_open: Date | null;
    thursdayHour_close: Date | null;
    fridayHour_open: Date | null;
    fridayHour_close: Date | null;
    saturdayHour_open: Date | null;
    saturdayHour_close: Date | null;
    sundayHour_open: Date | null;
    sundayHour_close: Date | null;
  };
  const [hours, setHours] = useState<Hours>({
    mondayHour_open: null,
    mondayHour_close: null,
    tuesdayHour_open: null,
    tuesdayHour_close: null,
    wednesdayHour_open: null,
    wednesdayHour_close: null,
    thursdayHour_open: null,
    thursdayHour_close: null,
    fridayHour_open: null,
    fridayHour_close: null,
    saturdayHour_open: null,
    saturdayHour_close: null,
    sundayHour_open: null,
    sundayHour_close: null,
  });

  // Gestion des changements d'heure
  const handleStartTimeChange = (day: string, date: Date | null) => {
    const englishDay = mappingDaysItem[day] || day;
    setHours((prevHours) => ({
      ...prevHours,
      [`${englishDay}Hour_open`]: date,
    }));
  };

  const handleEndTimeChange = (day: string, date: Date | null) => {
    const englishDay = mappingDaysItem[day] || day;
    setHours((prevHours) => ({
      ...prevHours,
      [`${englishDay}Hour_close`]: date,
    }));
  };

  // Fonction pour gérer le clic sur un jour
  const handleDayClick = (day: string) => {
    // Met à jour les jours sélectionnés
    setSelectedDays((prev) => {
      const newSelection = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day];

      // Mapping du jour en anglais
      const englishDay = dayMapping[day];

      // Formattage de l'heure en fonction de la sélection
      let formattedTime: string | null;

      if (newSelection.includes(day)) {
        // Si le jour est sélectionné, on attribue l'heure actuelle
        formattedTime = new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Paris',
        });
      } else {
        // Si le jour n'est pas sélectionné, on le laisse vide ou null
        formattedTime = null;
      }

      // Nom du champ à mettre à jour
      const name = `${englishDay}_day`;

      // On prépare l'update à envoyer
      const itemUpdate = { name, value: formattedTime !== null };
      // Dispatch pour mettre à jour le champ
      dispatch(updateUser(itemUpdate));
      handleStartTimeChange(englishDay, null);
      handleEndTimeChange(englishDay, null);
      dispatch(updateUser({ name: `${englishDay}Hour_open`, value: null }));
      dispatch(updateUser({ name: `${englishDay}Hour_close`, value: null }));

      return newSelection;
    });
  };

  // Fonction qui sera appelée lors de la perte de focus pour mettre à jour l'heure
  const handleBlur = (day: string, type: 'open' | 'close', value: string | null) => {
    const englishDay = dayMapping[day];
    const formattedTime = convertToFranceTime(value); // Convertir l'heure en heure locale France

    const name = `${englishDay}Hour_${type}`;
    const itemUpdate = { name, value: formattedTime };

    dispatch(updateUser(itemUpdate));
  };

  // Liste des jours de la semaine (en ordre correct)
  const daysOfWeek: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const daysOfWeekData = [
        { day: 'monday_day', name: 'Lundi' },
        { day: 'tuesday_day', name: 'Mardi' },
        { day: 'wednesday_day', name: 'Mercredi' },
        { day: 'thursday_day', name: 'Jeudi' },
        { day: 'friday_day', name: 'Vendredi' },
        { day: 'saturday_day', name: 'Samedi' },
        { day: 'sunday_day', name: 'Dimanche' },
      ];

      const selectedDaysItem = daysOfWeekData
        .filter((day) => parsedUserData[day.day]) // Filtre les jours sélectionnés
        .map((day) => day.name); // Extrait les noms des jours

      // Set the selected days based on the stored data
      setSelectedDays(selectedDaysItem || []);

      // Initialisation de l'état avec les données du localStorage
      setSelectedDays(selectedDaysItem || []);
      setHours({
        mondayHour_open: parseTimeStringToDate(parsedUserData.mondayHour_open) || null,
        mondayHour_close: parseTimeStringToDate(parsedUserData.mondayHour_close) || null,
        tuesdayHour_open: parseTimeStringToDate(parsedUserData.tuesdayHour_open) || null,
        tuesdayHour_close: parseTimeStringToDate(parsedUserData.tuesdayHour_close) || null,
        wednesdayHour_open: parseTimeStringToDate(parsedUserData.wednesdayHour_open) || null,
        wednesdayHour_close: parseTimeStringToDate(parsedUserData.wednesdayHour_close) || null,
        thursdayHour_open: parseTimeStringToDate(parsedUserData.thursdayHour_open) || null,
        thursdayHour_close: parseTimeStringToDate(parsedUserData.thursdayHour_close) || null,
        fridayHour_open: parseTimeStringToDate(parsedUserData.fridayHour_open) || null,
        fridayHour_close: parseTimeStringToDate(parsedUserData.fridayHour_close) || null,
        saturdayHour_open: parseTimeStringToDate(parsedUserData.saturdayHour_open) || null,
        saturdayHour_close: parseTimeStringToDate(parsedUserData.saturdayHour_close) || null,
        sundayHour_open: parseTimeStringToDate(parsedUserData.sundayHour_open) || null,
        sundayHour_close: parseTimeStringToDate(parsedUserData.sundayHour_close) || null,
      });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center gap-2 mt-4">
      <section className="flex items-center">
        <p className="mr-8">Sélectionnez les jours d&apos;ouverture : </p>
        {daysOfWeek.map((day) => (
          <DayButton
            key={day}
            day={day}
            onClick={handleDayClick}
            isSelected={selectedDays.includes(day)} // Vérifie si le jour est sélectionné
          />
        ))}
      </section>

      {/* Affichage des heures pour les jours sélectionnés */}
      {daysOfWeek
        .filter((day) => selectedDays.includes(day)) // Filtrer les jours sélectionnés
        .map((day) => {
          const englishDay = dayMapping[day];
          return (
            <section key={day}>
              <TimePicker
                day={day}
                startTime={hours[`${englishDay.toLowerCase()}Hour_open` as keyof typeof hours]}
                endTime={hours[`${englishDay.toLowerCase()}Hour_close` as keyof typeof hours]}
                onStartChange={(date) => handleStartTimeChange(day.toLowerCase(), date)}
                onEndChange={(date) => handleEndTimeChange(day.toLowerCase(), date)}
                onBlur={handleBlur} // Appeler handleBlur à la perte de focus
              />
            </section>
          );
        })}
    </div>
  );
};

export default OpeningHour;
