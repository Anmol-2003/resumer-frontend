// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from '../store-slices/user-details/user-details' // default export 
// // Can import multiple reducers of different slices and add them to the configuration


// // We'll need to persist redux-store to enable persistence of user state 
// export const store = configureStore({
//     reducer : userReducer
// })

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store-slices/user-details/user-details'; // Default export
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // persisting in sessionStorage

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Wrap your reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store); // Used for persisting the store
