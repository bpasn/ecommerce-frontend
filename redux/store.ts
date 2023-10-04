import {
    configureStore,
    ThunkAction,
    compose,
    Action,
    Store,
    combineReducers,
} from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PURGE,
    REGISTER,
    PersistConfig,
    PERSIST
} from 'redux-persist';




import storage from 'redux-persist/lib/storage';
import combinedReducers from './combindeReducer';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
};





export const store = configureStore({
    reducer: combinedReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getdefaultMiddleware) => getdefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});


export const persistor = persistStore(store);

const makeStore = (): Store => store;

export type AppState = ReturnType<typeof store['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);