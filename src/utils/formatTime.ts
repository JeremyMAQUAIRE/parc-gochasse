export default function formatTime(timeString: string): string {
  const formattedTime = new Date(`2000-01-01T${timeString}`);
  const hours = formattedTime.getHours();
  const minutes = formattedTime.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${formattedHours}h${formattedMinutes}`;
}
