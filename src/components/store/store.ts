/* eslint-disable object-shorthand */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './reducer/userReducer';
import dialogReducer from './reducer/dialogReducer';
import categoryReducer from './reducer/categoryReducer';
import prestationReducer from './reducer/prestationReducer';
import eventReducer from './reducer/eventReducer';
import notificationMailForRdv from './reducer/notificationMailForRdv';
import revenueReducer from './reducer/revenueReducer';
import contactReducer from './reducer/contactReducer';
import ListUserReducer from './reducer/ListUserReducer';
import ListDocument from './reducer/ListDocument';
import parcReducer from './reducer/parcReducer';
// eslint-disable-next-line import/no-cycle

// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  userReducer: userReducer,
  dialogReducer: dialogReducer,
  categoryReducer: categoryReducer,
  prestationReducer: prestationReducer,
  eventReducer: eventReducer,
  notificationMailForRdv: notificationMailForRdv,
  revenueReducer: revenueReducer,
  contactReducer: contactReducer,
  ListUserReducer: ListUserReducer,
  ListDocument: ListDocument,
  parcReducer: parcReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
