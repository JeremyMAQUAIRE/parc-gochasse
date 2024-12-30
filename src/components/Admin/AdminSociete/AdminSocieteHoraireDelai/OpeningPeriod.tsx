import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../../store/store';
import { actionChangeUserCloseDate, actionChangeUserOpenDate } from '../../../store/actionCreator';
import updateUser from '../../../../api/directus/user/updateUser';

const formatDate = (date: Date | null) => {
  if (!date || Number.isNaN(date.getTime())) {
    return ''; // return empty string if date is null or invalid
  }
  return format(date, 'dd MMMM yyyy', { locale: fr });
};

const OpeningPeriod = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer);

  const handleUpdateUser = (field: string) => () => {
    let value: string | number | boolean | null = null;
    if (field === 'open_day') {
      value = user.openDate ? new Date(user.openDate).toISOString() : null;
    } else if (field === 'close_day') {
      value = user.closeDate ? new Date(user.closeDate).toISOString() : null;
    }
    dispatch(
      updateUser({
        name: field,
        value,
      })
    );
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null;
    if (userData) {
      dispatch(actionChangeUserCloseDate(userData.open_day));
      dispatch(actionChangeUserOpenDate(userData.close_day));
    }
  }, [dispatch]);

  return (
    <div className="flex items-center gap-2 mt-4">
      <p className="mr-8">Date d&apos;ouverture : </p>
      <div className="w-[260px]">
        <DatePicker
          id="openDate"
          dateFormat="dd/MM/yyyy"
          placeholderText="Date de début"
          value={formatDate(new Date(user.openDate))}
          onChange={(date) => dispatch(actionChangeUserOpenDate(date ? date.toISOString() : ''))}
          onBlur={handleUpdateUser('open_day')}
          className="block w-[250px] py-1.5 pl-3 pr-3 text-base text-center text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
        />
      </div>

      <p>-</p>

      <div className="w-[260px] ml-3">
        <DatePicker
          id="closeDate"
          minDate={new Date(user.openDate)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Date de fin"
          value={formatDate(new Date(user.closeDate))}
          onChange={(date) => dispatch(actionChangeUserCloseDate(date ? date.toISOString() : ''))}
          onBlur={handleUpdateUser('close_day')}
          className="block w-[250px] py-1.5 pl-3 pr-3 text-base text-center text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300 rounded-md focus:border-brown"
        />
      </div>
    </div>
  );
};

export default OpeningPeriod;
