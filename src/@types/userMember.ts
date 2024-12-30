export default interface IUserMember {
  id: number | string;
  is_member: boolean;
  banned: boolean;
  user_member: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    id_avatar: string;
    petitGibier: boolean;
    piegeur: boolean;
    poste: boolean;
    traqueur: boolean;
  };
  id_user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    id_avatar: string;
    petitGibier: boolean;
    piegeur: boolean;
    poste: boolean;
    traqueur: boolean;
  };
}
