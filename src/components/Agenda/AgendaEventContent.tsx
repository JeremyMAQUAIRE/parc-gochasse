import dog from '../../../public/dog.webp';
import hunter from '../../../public/hunter.webp';
import AgendaEventParticipant from './AgendaEventParticipant';

const formatTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(date).toLocaleTimeString([], options);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AgendaEventContent = ({ event }: any) => {
  const { start, end, title, extendedProps } = event;
  const { eventItem } = extendedProps;

  const startTime = formatTime(start);
  const endTime = formatTime(end);

  return (
    <div
      style={{ backgroundColor: extendedProps.style, scrollbarWidth: 'none' }}
      className="text-white w-full h-full overflow-auto pl-2 rounded-xl transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-xl group-hover:h-auto"
    >
      <p className="text-white font-bold pt-1">{`${startTime} - ${endTime}`}</p>
      <p className="text-black font-bold">{title}</p>
      <div className="flex items-center pt-1 relative group">
        {eventItem.id_prestation.aplicable_on === 'dog' && (
          <>
            <img src={dog} alt="Chien" className="h-4 w-5 pr-1" />
            <p className="font-bold">
              : {eventItem.number_dog_event}/{eventItem.number_max_dog_event}
            </p>
          </>
        )}
        {eventItem.id_prestation.aplicable_on === 'hunter' && (
          <>
            <img src={hunter} alt="Participant" className="h-5 w-5 pr-1" />
            <p className="font-bold">
              : {eventItem.number_hunter_event}/{eventItem.number_max_hunter_event}
            </p>
          </>
        )}

        <AgendaEventParticipant idEvent={eventItem.id} />
      </div>
    </div>
  );
};

export default AgendaEventContent;
