export default interface ICardUser {
  id: number;
  document: {
    id: string;
    filename_download: string;
  };
  date_created: string;
  user_id: {
    last_name: string;
    first_name: string;
  };
}
