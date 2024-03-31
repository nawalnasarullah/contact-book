import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { contactSlice } from './contactReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    contactReducer: contactSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
});
export const persistedStore = persistStore(store);