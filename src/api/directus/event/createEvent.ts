import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RootState } from '../../../components/store/store';

export default createAsyncThunk('FETCH_CREATE_EVENT', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const event = state.eventReducer;
  const prestation = state.prestationReducer;

  // Ensure event.dateEvent is in YYYY-MM-DD format
  const dateParts = event.dateEvent.split('/');
  const formattedDateEvent = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  const dates = [];

  if (event.isRecurrent) {
    // Handling recurrence by day or week
    if (event.timeUnit === 'day') {
      for (let i = 0; i <= event.repetitionNumber; i += 1) {
        // Add i days to the original date
        const newDate = new Date(formattedDateEvent);
        newDate.setDate(formattedDateEvent.getDate() + i); // Add i days
        dates.push(newDate);
      }
    } else if (event.timeUnit === 'week') {
      for (let i = 0; i <= event.repetitionNumber; i += 1) {
        // Add i weeks to the original date
        const newDate = new Date(formattedDateEvent);
        newDate.setDate(formattedDateEvent.getDate() + i * 7); // Add i weeks (i * 7 days)
        dates.push(newDate);
      }
    }
  } else {
    // If the event is not recurrent, just add the original date
    dates.push(formattedDateEvent);
  }

  // Send the event for each occurrence
  await Promise.all(
    dates.map(async (occurrenceDate) => {
      // Format the occurrenceDate in YYYY-MM-DD format for API request
      const formattedOccurrenceDate = occurrenceDate.toISOString().split('T')[0];

      // Create the event for each date
      await axios.post(
        'https://api.gochasse.com/items/events',
        {
          date_event: formattedOccurrenceDate, // Use the current occurrence date
          start_time_event: prestation.startTime,
          end_time_event: prestation.endTime,
          price_event: prestation.price,
          number_max_hunter_event: prestation.numberHunter,
          number_max_dog_event: prestation.numberDog,
          id_user: Cookies.get('userId'),
          id_category: event.idCategory,
          id_prestation: event.idPrestation,
          id_parcs: event.idParc,
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${Cookies.get('tokenJWT')}`,
          },
        }
      );
    })
  );
});
