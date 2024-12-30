export default interface IEvent {
  id: number;
  date_event: string;
  end_time_event: string;
  start_time_event: string;
  price_event: number;
  number_dog_event: number;
  number_hunter_event: number;
  number_max_dog_event: number;
  number_max_hunter_event: number;
  id_parcs: {
    name: string;
  };
  id_prestation: {
    title: string;
    aplicable_on: string;
    description: string;
  };
  id_category: {
    color: string;
  };
  id_user: {
    id: string;
    delay_rdv: number;
    delay_annulation_rdv: number;
  };
  number_of_the_week: string;
  isArchived: boolean;
  isRecurrent: boolean;
  timeUnit: string;
  repetitionNumber: number;
}
