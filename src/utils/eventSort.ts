import { endOfWeek, format, getISOWeek, startOfWeek, getYear } from 'date-fns';
import IEvent from '../@types/event';

const getWeekInfo = (dateEvent: string) => {
  const date = new Date(dateEvent);
  const weekNumber = getISOWeek(date);
  const year = getYear(date); // Extraire l'année
  const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 }); // 1 signifie que la semaine commence le lundi
  const endOfWeekDate = endOfWeek(date, { weekStartsOn: 1 });

  return {
    year, // Ajouter l'année dans l'objet retourné
    weekNumber,
    startOfWeekDate: format(startOfWeekDate, 'yyyy-MM-dd'),
    endOfWeekDateFormatted: format(endOfWeekDate, 'yyyy-MM-dd'),
  };
};

export default function transformData(
  events: IEvent[],
  time: boolean
): {
  [key: number]: { weekNumber: number; year: number; startOfWeek: string; endOfWeek: string; events: IEvent[] };
} {
  const result: { weekNumber: number; year: number; startOfWeek: string; endOfWeek: string; events: IEvent[] }[] = [];
  const currentDate = new Date();

  // Organiser les événements par semaine
  events.forEach((event) => {
    const { weekNumber, startOfWeekDate, endOfWeekDateFormatted, year } = getWeekInfo(event.date_event);

    // Si 'time' est vrai, ignorer les événements après la date actuelle
    if (time && new Date(event.date_event) > currentDate) {
      return;
    }

    // Si 'time' est faux, ne prendre que les événements avant ou à la date actuelle
    if (!time && new Date(event.date_event) < currentDate) {
      return;
    }

    // Vérifier si la semaine existe déjà dans le tableau 'result'
    const weekIndex = result.findIndex((item) => item.startOfWeek === startOfWeekDate && item.endOfWeek === endOfWeekDateFormatted);

    if (weekIndex === -1) {
      // Si la semaine n'existe pas, créer une nouvelle entrée
      result.push({
        year,
        weekNumber,
        startOfWeek: startOfWeekDate,
        endOfWeek: endOfWeekDateFormatted,
        events: [],
      });
    }

    // Ajouter l'événement à la semaine correspondante
    const week = result.find((item) => item.startOfWeek === startOfWeekDate && item.endOfWeek === endOfWeekDateFormatted);
    if (week) {
      week.events.push(event);
    }
  });

  // Trier les semaines en fonction de l'indicateur 'time'
  if (time) {
    // Si 'time' est vrai, trier par année (décroissant) puis par numéro de semaine (décroissant)
    result.sort((a, b) => {
      return new Date(b.endOfWeek).getTime() - new Date(a.endOfWeek).getTime(); // Convertir en timestamp pour pouvoir soustraire
    });
  } else {
    // Si 'time' est faux, trier par année (croissant) puis par numéro de semaine (croissant)
    result.sort((a, b) => {
      return new Date(a.endOfWeek).getTime() - new Date(b.endOfWeek).getTime(); // Convertir en timestamp pour pouvoir soustraire
    });
  }

  // Trier les événements à l'intérieur de chaque semaine en fonction de l'indicateur 'time'
  result.forEach((week) => {
    if (time) {
      // Si 'time' est vrai, trier les événements par 'date_event' en ordre décroissant (les plus récents en premier)
      week.events.sort((a, b) => {
        return new Date(b.date_event).getTime() - new Date(a.date_event).getTime(); // Trier les événements par date décroissante
      });
    } else {
      // Si 'time' est faux, trier les événements par 'date_event' en ordre croissant (les plus anciens en premier)
      week.events.sort((a, b) => {
        return new Date(a.date_event).getTime() - new Date(b.date_event).getTime(); // Trier les événements par date croissante
      });
    }
  });

  return result;
}
